import { permissions } from './permissions'
import { APP_SECRET, getUserId } from './utils'
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { applyMiddleware } from 'graphql-middleware'
import {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  stringArg,
  inputObjectType,
  arg,
  asNexusMethod,
  enumType,
} from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'
import { prisma } from '@prisma/client'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const Query = objectType({
  name: 'Query',
  definition(t) {
    // t.nonNull.list.nonNull.field('allUsers', {
    //   type: 'User',
    //   resolve: (_parent, _args, context: Context) => {
    //     return context.prisma.user.findMany()
    //   },
    // })

    t.nullable.field('me', {
      type: 'User',
      resolve: (parent, args, context: Context) => {
        const userId = getUserId(context)
        return context.prisma.user.findUnique({
          where: {
            id: Number(userId),
          },
        })
      },
    })

    t.nullable.field('tweet', {
      type: 'Tweet',
      args: { id: intArg() },
      resolve: (parent, { id }, context: Context) => {
        return context.prisma.tweet.findUnique({
          where: {
            id: Number(id),
          },
        })
      },
    })

    // t.nullable.field('postById', {
    //   type: 'Post',
    //   args: {
    //     id: intArg(),
    //   },
    //   resolve: (_parent, args, context: Context) => {
    //     return context.prisma.post.findUnique({
    //       where: { id: args.id || undefined },
    //     })
    //   },
    // })

    t.nonNull.list.nonNull.field('feed', {
      type: 'Post',
      args: {
        searchString: stringArg(),
        skip: intArg(),
        take: intArg(),
        orderBy: arg({
          type: 'PostOrderByUpdatedAtInput',
        }),
      },
      resolve: (_parent, args, context: Context) => {
        const or = args.searchString
          ? {
              OR: [
                { title: { contains: args.searchString } },
                { content: { contains: args.searchString } },
              ],
            }
          : {}

        return context.prisma.post.findMany({
          where: {
            published: true,
            ...or,
          },
          take: args.take || undefined,
          skip: args.skip || undefined,
          orderBy: args.orderBy || undefined,
        })
      },
    })

    t.list.field('users', {
      type: 'User',
      resolve: (parent, args, ctx) => {
        return ctx.prisma.user.findMany()
      },
    })

    t.list.field('tweets', {
      type: 'Tweet',
      resolve: async (parent, args, ctx) => {
        const tweet = await ctx.prisma.tweet.findMany()

        return ctx.prisma.tweet.findMany()
      },
    })

    t.list.field(
      'likesNumber',

      {
        type: 'LikedTweet',
        args: {
          id: intArg(),
        },
        resolve: (parent, { id }, ctx: Context) => {
          return ctx.prisma.likedTweet.findMany({
            where: {
              tweetId: Number(id),
            },
          })
        },
      },
    )

    // t.list.field('draftsByUser', {
    //   type: 'Post',
    //   args: {
    //     userUniqueInput: nonNull(
    //       arg({
    //         type: 'UserUniqueInput',
    //       }),
    //     ),
    //   },
    //   resolve: (_parent, args, context: Context) => {
    //     return context.prisma.user
    //       .findUnique({
    //         where: {
    //           id: args.userUniqueInput.id || undefined,
    //           email: args.userUniqueInput.email || undefined,
    //         },
    //       })
    //       .posts({
    //         where: {
    //           published: false,
    //         },
    //       })
    //   },
    // })
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: stringArg(),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, args, context: Context) => {
        const hashedPassword = await hash(args.password, 10)
        const user = await context.prisma.user.create({
          data: {
            name: args.name,
            email: args.email,
            password: hashedPassword,
          },
        })
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('createComment', {
      type: 'Comment',
      args: {
        content: stringArg(),
        id: intArg(),
      },
      resolve: (parent, { content, id }, ctx) => {
        const userId = getUserId(ctx)
        if (!userId) throw new Error('Could not authenticate user.')
        return ctx.prisma.comment.create({
          data: {
            content,
            User: { connect: { id: Number(userId) } },
            Tweet: { connect: { id: Number(id) } },
          },
        })
      },
    })

    t.field('createReply', {
      type: 'Comment',
      args: {
        content: stringArg(),
        id: intArg(),
        commentId: intArg(),
      },
      resolve: (parent, { content, id, commentId }, ctx) => {
        const userId = getUserId(ctx)
        if (!userId) throw new Error('Could not authenticate user.')
        return ctx.prisma.comment.create({
          data: {
            content,
            User: { connect: { id: Number(userId) } },
            Tweet: { connect: { id: Number(id) } },
            Comment: { connect: { id: Number(commentId) } },
          },
        })
      },
    })

    t.field('likeTweet', {
      type: 'LikedTweet',
      args: {
        id: intArg(),
      },
      resolve: (parent, { id }, ctx) => {
        const userId = getUserId(ctx)
        if (!userId) throw new Error('Could not authenticate user.')
        return ctx.prisma.likedTweet.create({
          data: {
            tweet: { connect: { id: Number(id) } },
            User: { connect: { id: Number(userId) } },
          },
        })
      },
    })

    t.field('deleteLike', {
      type: 'LikedTweet',
      args: {
        id: intArg(),
      },
      resolve: async (parent, { id }, ctx) => {
        const userId = getUserId(ctx)
        if (!userId) throw new Error('Could not authenticate user.')

        return ctx.prisma.likedTweet.delete({
          where: { id: id as any },
        })
      },
    })

    t.field('createProfile', {
      type: 'Profile',
      args: {
        bio: stringArg(),
        location: stringArg(),
        website: stringArg(),
        avatar: stringArg(),
      },
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx)
        if (!userId) throw new Error('Could not authenticate user')
        return ctx.prisma.profile.create({
          data: {
            ...args,
            User: { connect: { id: Number(userId) } },
          },
        })
      },
    })

    t.field('createTweet', {
      type: 'Tweet',
      args: {
        content: stringArg(),
      },
      resolve: (parent, { content }, ctx) => {
        const userId = getUserId(ctx)
        if (!userId) throw new Error('Could not authenticate user.')
        return ctx.prisma.tweet.create({
          data: {
            content,
            author: { connect: { id: Number(userId) } },
          },
        })
      },
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, { email, password }, context: Context) => {
        const user = await context.prisma.user.findUnique({
          where: {
            email,
          },
        })
        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('updateProfile', {
      type: 'Profile',
      args: {
        id: intArg(),
        bio: stringArg(),
        location: stringArg(),
        website: stringArg(),
        avatar: stringArg(),
      },
      resolve: (parent, { id, ...args }, ctx) => {
        const userId = getUserId(ctx)
        if (!userId) throw new Error('Could not authenticate user.')

        return ctx.prisma.profile.update({
          data: {
            ...args,
          },
          where: {
            id: Number(id),
          },
        })
      },
    })

    // t.field('createDraft', {
    //   type: 'Post',
    //   args: {
    //     data: nonNull(
    //       arg({
    //         type: 'PostCreateInput',
    //       }),
    //     ),
    //   },
    //   resolve: (_, args, context: Context) => {
    //     const userId = getUserId(context)
    //     return context.prisma.post.create({
    //       data: {
    //         title: args.data.title,
    //         content: args.data.content,
    //         authorId: userId,
    //       },
    //     })
    //   },
    // })

    // t.field('togglePublishPost', {
    //   type: 'Post',
    //   args: {
    //     id: nonNull(intArg()),
    //   },
    //   resolve: async (_, args, context: Context) => {
    //     try {
    //       const post = await context.prisma.post.findUnique({
    //         where: { id: args.id || undefined },
    //         select: {
    //           published: true,
    //         },
    //       })
    //       return context.prisma.post.update({
    //         where: { id: args.id || undefined },
    //         data: { published: !post?.published },
    //       })
    //     } catch (e) {
    //       throw new Error(
    //         `Post with ID ${args.id} does not exist in the database.`,
    //       )
    //     }
    //   },
    // })

    // t.field('incrementPostViewCount', {
    //   type: 'Post',
    //   args: {
    //     id: nonNull(intArg()),
    //   },
    //   resolve: (_, args, context: Context) => {
    //     return context.prisma.post.update({
    //       where: { id: args.id || undefined },
    //       data: {
    //         viewCount: {
    //           increment: 1,
    //         },
    //       },
    //     })
    //   },
    // })

    // t.field('deletePost', {
    //   type: 'Post',
    //   args: {
    //     id: nonNull(intArg()),
    //   },
    //   resolve: (_, args, context: Context) => {
    //     return context.prisma.post.delete({
    //       where: { id: args.id },
    //     })
    //   },
    // })
  },
})

const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.string('bio')
    t.string('website')
    t.string('avatar')
    t.string('location')
    t.field('user', {
      type: 'User',
      resolve: (parent, _, context) => {
        return context.prisma.profile
          .findUnique({
            where: {
              id: parent.id || undefined,
            },
          })
          .User()
      },
    })
  },
})

const LikedTweet = objectType({
  name: 'LikedTweet',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.field('likedAt', { type: 'DateTime' })
    t.field('user', {
      type: 'User',
      resolve: (parent, _, context) =>
        context.prisma.likedTweet
          .findUnique({
            where: {
              id: parent.id || undefined,
            },
          })
          .User(),
    })
    t.field('tweet', {
      type: 'Tweet',
      resolve: (parent, __, ctx: Context) =>
        ctx.prisma.likedTweet
          .findUnique({
            where: {
              id: parent.id || undefined,
            },
          })
          .tweet(),
    })
  },
})

const Tweet = objectType({
  name: 'Tweet',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.string('content')
    t.field('author', {
      type: 'User',
      resolve: (parent, _, context) => {
        return context.prisma.tweet
          .findUnique({
            where: {
              id: parent.id || undefined,
            },
          })
          .author()
      },
    })
    t.list.field(
      'comments', //should match 'tweets' field of user
      {
        type: 'Comment', //should match the schema you created in this file
        resolve: (parent, _, ctx: Context) => {
          return ctx.prisma.tweet
            .findUnique({
              where: {
                id: parent.id,
              },
            })
            .comments() //should match 'tweets' field of user
        },
      },
    )
    t.list.field('likes', {
      type: 'LikedTweet',
      resolve: async (parent, _, ctx: Context) => {
        return ctx.prisma.tweet
          .findUnique({
            where: { id: parent.id },
          })
          .likes()
      },
    })
  },
})

const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.string('content')
    t.field('User', {
      type: 'User',
      resolve: (parent, _, context) => {
        return context.prisma.comment
          .findUnique({
            where: {
              id: parent.id || undefined,
            },
          })
          .User()
      },
    })
    t.field('Tweet', {
      type: 'Tweet',
      resolve: async (parent, _, ctx: Context) => {
        return ctx.prisma.comment
          .findUnique({
            where: { id: parent.id },
          })
          .Tweet()
      },
    }),
      t.list.field('Comments', {
        type: 'Comment',
        resolve: async (parent, _, ctx: Context) => {
          return ctx.prisma.comment
            .findUnique({
              where: { id: parent.id },
            })
            .comments()
        },
      })
  },
})

const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.string('name')
    t.nonNull.string('email')
    t.nonNull.list.nonNull.field('posts', {
      type: 'Post',
      resolve: (parent, _, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .posts()
      },
    }),
      t.field('profile', {
        type: 'Profile',
        resolve: (parent, _, context) => {
          return context.prisma.user
            .findUnique({
              where: { id: parent.id },
            })
            .Profile()
        },
      }),
      t.list.field(
        'tweets', //should match 'tweets' field of user
        {
          type: 'Tweet', //should match the schema you created in this file
          resolve: (parent, _, ctx: Context) => {
            return ctx.prisma.user
              .findUnique({
                where: {
                  id: parent.id,
                },
              })
              .tweets() //should match 'tweets' field of user
          },
        },
      ),
      t.list.field(
        'comments', //should match 'tweets' field of user
        {
          type: 'Comment', //should match the schema you created in this file
          resolve: (parent, _, ctx: Context) => {
            return ctx.prisma.user
              .findUnique({
                where: {
                  id: parent.id,
                },
              })
              .comments() //should match 'tweets' field of user
          },
        },
      )
    t.list.field('likedTweets', {
      type: 'LikedTweet',
      resolve: (parent, _, ctx: Context) => {
        return ctx.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .likedTweets()
      },
    })
  },
})

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.nonNull.string('title')
    t.string('content')
    t.nonNull.boolean('published')
    t.nonNull.int('viewCount')
    t.field('author', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.post
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .author()
      },
    })
  },
})

const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc'],
})

const PostOrderByUpdatedAtInput = inputObjectType({
  name: 'PostOrderByUpdatedAtInput',
  definition(t) {
    t.nonNull.field('updatedAt', { type: 'SortOrder' })
  },
})

const UserUniqueInput = inputObjectType({
  name: 'UserUniqueInput',
  definition(t) {
    t.int('id')
    t.string('email')
  },
})

const PostCreateInput = inputObjectType({
  name: 'PostCreateInput',
  definition(t) {
    t.nonNull.string('title')
    t.string('content')
  },
})

const UserCreateInput = inputObjectType({
  name: 'UserCreateInput',
  definition(t) {
    t.nonNull.string('email')
    t.string('name')
    t.list.nonNull.field('posts', { type: 'PostCreateInput' })
  },
})

const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token')
    t.field('user', { type: 'User' })
  },
})

const schemaWithoutPermissions = makeSchema({
  types: [
    Query,
    Mutation,
    Profile,
    Post,
    Tweet,
    LikedTweet,
    User,
    Comment,
    AuthPayload,
    UserUniqueInput,
    UserCreateInput,
    PostCreateInput,
    SortOrder,
    PostOrderByUpdatedAtInput,
    DateTime,
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})

export const schema = applyMiddleware(schemaWithoutPermissions, permissions)
