import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Comment = {
  __typename?: 'Comment';
  Comments?: Maybe<Array<Maybe<Comment>>>;
  Tweet?: Maybe<Tweet>;
  User?: Maybe<User>;
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
};

export type Following = {
  __typename?: 'Following';
  User?: Maybe<User>;
  avatar?: Maybe<Scalars['String']>;
  followId: Scalars['Int'];
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type LikedTweet = {
  __typename?: 'LikedTweet';
  id: Scalars['Int'];
  likedAt: Scalars['DateTime'];
  tweet?: Maybe<Tweet>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment?: Maybe<Comment>;
  createProfile?: Maybe<Profile>;
  createReply?: Maybe<Comment>;
  createTweet?: Maybe<Tweet>;
  deleteFollow?: Maybe<Following>;
  deleteLike?: Maybe<LikedTweet>;
  follow?: Maybe<Following>;
  likeTweet?: Maybe<LikedTweet>;
  login?: Maybe<AuthPayload>;
  signup?: Maybe<AuthPayload>;
  updateProfile?: Maybe<Profile>;
};


export type MutationCreateCommentArgs = {
  content?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
};


export type MutationCreateProfileArgs = {
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};


export type MutationCreateReplyArgs = {
  commentId?: InputMaybe<Scalars['Int']>;
  content?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
};


export type MutationCreateTweetArgs = {
  content?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteFollowArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type MutationDeleteLikeArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type MutationFollowArgs = {
  avatar?: InputMaybe<Scalars['String']>;
  followId?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationLikeTweetArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  location?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  published: Scalars['Boolean'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  viewCount: Scalars['Int'];
};

export type PostCreateInput = {
  content?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type PostOrderByUpdatedAtInput = {
  updatedAt: SortOrder;
};

export type Profile = {
  __typename?: 'Profile';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  location?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  website?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  feed: Array<Post>;
  likesNumber?: Maybe<Array<Maybe<LikedTweet>>>;
  me?: Maybe<User>;
  singleUser?: Maybe<User>;
  tweet?: Maybe<Tweet>;
  tweets?: Maybe<Array<Maybe<Tweet>>>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryFeedArgs = {
  orderBy?: InputMaybe<PostOrderByUpdatedAtInput>;
  searchString?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryLikesNumberArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QuerySingleUserArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryTweetArgs = {
  id?: InputMaybe<Scalars['Int']>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type Tweet = {
  __typename?: 'Tweet';
  author?: Maybe<User>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  likes?: Maybe<Array<Maybe<LikedTweet>>>;
};

export type User = {
  __typename?: 'User';
  Following?: Maybe<Array<Maybe<Following>>>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  email: Scalars['String'];
  id: Scalars['Int'];
  likedTweets?: Maybe<Array<Maybe<LikedTweet>>>;
  name?: Maybe<Scalars['String']>;
  posts: Array<Post>;
  profile?: Maybe<Profile>;
  tweets?: Maybe<Array<Maybe<Tweet>>>;
};

export type UserCreateInput = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  posts?: InputMaybe<Array<PostCreateInput>>;
};

export type UserUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
};

export type CreateCommentMutationVariables = Exact<{
  content?: InputMaybe<Scalars['String']>;
  createCommentId?: InputMaybe<Scalars['Int']>;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment?: { __typename?: 'Comment', id: number } | null | undefined };

export type CreateProfileMutationVariables = Exact<{
  bio?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
}>;


export type CreateProfileMutation = { __typename?: 'Mutation', createProfile?: { __typename?: 'Profile', id: number } | null | undefined };

export type CreateReplyMutationVariables = Exact<{
  content?: InputMaybe<Scalars['String']>;
  commentId?: InputMaybe<Scalars['Int']>;
  createReplyId?: InputMaybe<Scalars['Int']>;
}>;


export type CreateReplyMutation = { __typename?: 'Mutation', createReply?: { __typename?: 'Comment', id: number } | null | undefined };

export type CreateTweetMutationVariables = Exact<{
  content?: InputMaybe<Scalars['String']>;
}>;


export type CreateTweetMutation = { __typename?: 'Mutation', createTweet?: { __typename?: 'Tweet', id: number } | null | undefined };

export type DeleteLikeMutationVariables = Exact<{
  deleteLikeId?: InputMaybe<Scalars['Int']>;
}>;


export type DeleteLikeMutation = { __typename?: 'Mutation', deleteLike?: { __typename?: 'LikedTweet', id: number } | null | undefined };

export type FollowMutationVariables = Exact<{
  avatar?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  followId?: InputMaybe<Scalars['Int']>;
}>;


export type FollowMutation = { __typename?: 'Mutation', follow?: { __typename?: 'Following', id: number } | null | undefined };

export type LikeTweetMutationVariables = Exact<{
  likeTweetId?: InputMaybe<Scalars['Int']>;
}>;


export type LikeTweetMutation = { __typename?: 'Mutation', likeTweet?: { __typename?: 'LikedTweet', id: number } | null | undefined };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'AuthPayload', token?: string | null | undefined } | null | undefined };

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup?: { __typename?: 'AuthPayload', token?: string | null | undefined } | null | undefined };

export type UnfollowMutationVariables = Exact<{
  deleteFollowId?: InputMaybe<Scalars['Int']>;
}>;


export type UnfollowMutation = { __typename?: 'Mutation', deleteFollow?: { __typename?: 'Following', id: number } | null | undefined };

export type UpdateProfileMutationVariables = Exact<{
  bio?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
  updateProfileId?: InputMaybe<Scalars['Int']>;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile?: { __typename?: 'Profile', id: number } | null | undefined };

export type AllTweetsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTweetsQuery = { __typename?: 'Query', tweets?: Array<{ __typename?: 'Tweet', id: number, createdAt: any, content?: string | null | undefined, likes?: Array<{ __typename?: 'LikedTweet', id: number } | null | undefined> | null | undefined, comments?: Array<{ __typename?: 'Comment', content?: string | null | undefined, id: number } | null | undefined> | null | undefined, author?: { __typename?: 'User', id: number, name?: string | null | undefined, profile?: { __typename?: 'Profile', id: number, avatar?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined> | null | undefined };

export type LikesNumberQueryVariables = Exact<{
  likesNumberId?: InputMaybe<Scalars['Int']>;
}>;


export type LikesNumberQuery = { __typename?: 'Query', likesNumber?: Array<{ __typename?: 'LikedTweet', id: number } | null | undefined> | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number } | null | undefined };

export type MyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProfileQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, name?: string | null | undefined, Following?: Array<{ __typename?: 'Following', id: number, followId: number } | null | undefined> | null | undefined, likedTweets?: Array<{ __typename?: 'LikedTweet', id: number, tweet?: { __typename?: 'Tweet', id: number } | null | undefined } | null | undefined> | null | undefined, profile?: { __typename?: 'Profile', id: number, bio?: string | null | undefined, location?: string | null | undefined, website?: string | null | undefined, avatar?: string | null | undefined } | null | undefined } | null | undefined };

export type PopularTweetsQueryVariables = Exact<{ [key: string]: never; }>;


export type PopularTweetsQuery = { __typename?: 'Query', tweets?: Array<{ __typename?: 'Tweet', id: number, createdAt: any, content?: string | null | undefined, author?: { __typename?: 'User', id: number, profile?: { __typename?: 'Profile', id: number, avatar?: string | null | undefined } | null | undefined } | null | undefined, likes?: Array<{ __typename?: 'LikedTweet', id: number } | null | undefined> | null | undefined } | null | undefined> | null | undefined };

export type SingleTweetQueryVariables = Exact<{
  tweetId?: InputMaybe<Scalars['Int']>;
}>;


export type SingleTweetQuery = { __typename?: 'Query', tweet?: { __typename?: 'Tweet', id: number, content?: string | null | undefined, author?: { __typename?: 'User', id: number, name?: string | null | undefined, profile?: { __typename?: 'Profile', id: number, avatar?: string | null | undefined } | null | undefined } | null | undefined, comments?: Array<{ __typename?: 'Comment', id: number, content?: string | null | undefined, createdAt: any, User?: { __typename?: 'User', id: number, name?: string | null | undefined, profile?: { __typename?: 'Profile', id: number, avatar?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type SingleUserQueryVariables = Exact<{
  singleUserId?: InputMaybe<Scalars['Int']>;
}>;


export type SingleUserQuery = { __typename?: 'Query', singleUser?: { __typename?: 'User', id: number, name?: string | null | undefined, profile?: { __typename?: 'Profile', id: number, avatar?: string | null | undefined, website?: string | null | undefined } | null | undefined } | null | undefined };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', name?: string | null | undefined, email: string, id: number } | null | undefined> | null | undefined };


export const CreateCommentDocument = gql`
    mutation CreateComment($content: String, $createCommentId: Int) {
  createComment(content: $content, id: $createCommentId) {
    id
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      content: // value for 'content'
 *      createCommentId: // value for 'createCommentId'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateProfileDocument = gql`
    mutation createProfile($bio: String, $location: String, $avatar: String, $website: String) {
  createProfile(
    bio: $bio
    location: $location
    avatar: $avatar
    website: $website
  ) {
    id
  }
}
    `;
export type CreateProfileMutationFn = Apollo.MutationFunction<CreateProfileMutation, CreateProfileMutationVariables>;

/**
 * __useCreateProfileMutation__
 *
 * To run a mutation, you first call `useCreateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProfileMutation, { data, loading, error }] = useCreateProfileMutation({
 *   variables: {
 *      bio: // value for 'bio'
 *      location: // value for 'location'
 *      avatar: // value for 'avatar'
 *      website: // value for 'website'
 *   },
 * });
 */
export function useCreateProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreateProfileMutation, CreateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProfileMutation, CreateProfileMutationVariables>(CreateProfileDocument, options);
      }
export type CreateProfileMutationHookResult = ReturnType<typeof useCreateProfileMutation>;
export type CreateProfileMutationResult = Apollo.MutationResult<CreateProfileMutation>;
export type CreateProfileMutationOptions = Apollo.BaseMutationOptions<CreateProfileMutation, CreateProfileMutationVariables>;
export const CreateReplyDocument = gql`
    mutation CreateReply($content: String, $commentId: Int, $createReplyId: Int) {
  createReply(content: $content, commentId: $commentId, id: $createReplyId) {
    id
  }
}
    `;
export type CreateReplyMutationFn = Apollo.MutationFunction<CreateReplyMutation, CreateReplyMutationVariables>;

/**
 * __useCreateReplyMutation__
 *
 * To run a mutation, you first call `useCreateReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReplyMutation, { data, loading, error }] = useCreateReplyMutation({
 *   variables: {
 *      content: // value for 'content'
 *      commentId: // value for 'commentId'
 *      createReplyId: // value for 'createReplyId'
 *   },
 * });
 */
export function useCreateReplyMutation(baseOptions?: Apollo.MutationHookOptions<CreateReplyMutation, CreateReplyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReplyMutation, CreateReplyMutationVariables>(CreateReplyDocument, options);
      }
export type CreateReplyMutationHookResult = ReturnType<typeof useCreateReplyMutation>;
export type CreateReplyMutationResult = Apollo.MutationResult<CreateReplyMutation>;
export type CreateReplyMutationOptions = Apollo.BaseMutationOptions<CreateReplyMutation, CreateReplyMutationVariables>;
export const CreateTweetDocument = gql`
    mutation CreateTweet($content: String) {
  createTweet(content: $content) {
    id
  }
}
    `;
export type CreateTweetMutationFn = Apollo.MutationFunction<CreateTweetMutation, CreateTweetMutationVariables>;

/**
 * __useCreateTweetMutation__
 *
 * To run a mutation, you first call `useCreateTweetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTweetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTweetMutation, { data, loading, error }] = useCreateTweetMutation({
 *   variables: {
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateTweetMutation(baseOptions?: Apollo.MutationHookOptions<CreateTweetMutation, CreateTweetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTweetMutation, CreateTweetMutationVariables>(CreateTweetDocument, options);
      }
export type CreateTweetMutationHookResult = ReturnType<typeof useCreateTweetMutation>;
export type CreateTweetMutationResult = Apollo.MutationResult<CreateTweetMutation>;
export type CreateTweetMutationOptions = Apollo.BaseMutationOptions<CreateTweetMutation, CreateTweetMutationVariables>;
export const DeleteLikeDocument = gql`
    mutation DeleteLike($deleteLikeId: Int) {
  deleteLike(id: $deleteLikeId) {
    id
  }
}
    `;
export type DeleteLikeMutationFn = Apollo.MutationFunction<DeleteLikeMutation, DeleteLikeMutationVariables>;

/**
 * __useDeleteLikeMutation__
 *
 * To run a mutation, you first call `useDeleteLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLikeMutation, { data, loading, error }] = useDeleteLikeMutation({
 *   variables: {
 *      deleteLikeId: // value for 'deleteLikeId'
 *   },
 * });
 */
export function useDeleteLikeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLikeMutation, DeleteLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLikeMutation, DeleteLikeMutationVariables>(DeleteLikeDocument, options);
      }
export type DeleteLikeMutationHookResult = ReturnType<typeof useDeleteLikeMutation>;
export type DeleteLikeMutationResult = Apollo.MutationResult<DeleteLikeMutation>;
export type DeleteLikeMutationOptions = Apollo.BaseMutationOptions<DeleteLikeMutation, DeleteLikeMutationVariables>;
export const FollowDocument = gql`
    mutation Follow($avatar: String, $name: String, $followId: Int) {
  follow(avatar: $avatar, name: $name, followId: $followId) {
    id
  }
}
    `;
export type FollowMutationFn = Apollo.MutationFunction<FollowMutation, FollowMutationVariables>;

/**
 * __useFollowMutation__
 *
 * To run a mutation, you first call `useFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followMutation, { data, loading, error }] = useFollowMutation({
 *   variables: {
 *      avatar: // value for 'avatar'
 *      name: // value for 'name'
 *      followId: // value for 'followId'
 *   },
 * });
 */
export function useFollowMutation(baseOptions?: Apollo.MutationHookOptions<FollowMutation, FollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowMutation, FollowMutationVariables>(FollowDocument, options);
      }
export type FollowMutationHookResult = ReturnType<typeof useFollowMutation>;
export type FollowMutationResult = Apollo.MutationResult<FollowMutation>;
export type FollowMutationOptions = Apollo.BaseMutationOptions<FollowMutation, FollowMutationVariables>;
export const LikeTweetDocument = gql`
    mutation LikeTweet($likeTweetId: Int) {
  likeTweet(id: $likeTweetId) {
    id
  }
}
    `;
export type LikeTweetMutationFn = Apollo.MutationFunction<LikeTweetMutation, LikeTweetMutationVariables>;

/**
 * __useLikeTweetMutation__
 *
 * To run a mutation, you first call `useLikeTweetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeTweetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeTweetMutation, { data, loading, error }] = useLikeTweetMutation({
 *   variables: {
 *      likeTweetId: // value for 'likeTweetId'
 *   },
 * });
 */
export function useLikeTweetMutation(baseOptions?: Apollo.MutationHookOptions<LikeTweetMutation, LikeTweetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeTweetMutation, LikeTweetMutationVariables>(LikeTweetDocument, options);
      }
export type LikeTweetMutationHookResult = ReturnType<typeof useLikeTweetMutation>;
export type LikeTweetMutationResult = Apollo.MutationResult<LikeTweetMutation>;
export type LikeTweetMutationOptions = Apollo.BaseMutationOptions<LikeTweetMutation, LikeTweetMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($email: String!, $password: String!, $name: String) {
  signup(email: $email, password: $password, name: $name) {
    token
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const UnfollowDocument = gql`
    mutation Unfollow($deleteFollowId: Int) {
  deleteFollow(id: $deleteFollowId) {
    id
  }
}
    `;
export type UnfollowMutationFn = Apollo.MutationFunction<UnfollowMutation, UnfollowMutationVariables>;

/**
 * __useUnfollowMutation__
 *
 * To run a mutation, you first call `useUnfollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowMutation, { data, loading, error }] = useUnfollowMutation({
 *   variables: {
 *      deleteFollowId: // value for 'deleteFollowId'
 *   },
 * });
 */
export function useUnfollowMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowMutation, UnfollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowMutation, UnfollowMutationVariables>(UnfollowDocument, options);
      }
export type UnfollowMutationHookResult = ReturnType<typeof useUnfollowMutation>;
export type UnfollowMutationResult = Apollo.MutationResult<UnfollowMutation>;
export type UnfollowMutationOptions = Apollo.BaseMutationOptions<UnfollowMutation, UnfollowMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($bio: String, $avatar: String, $location: String, $website: String, $updateProfileId: Int) {
  updateProfile(
    bio: $bio
    avatar: $avatar
    location: $location
    website: $website
    id: $updateProfileId
  ) {
    id
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      bio: // value for 'bio'
 *      avatar: // value for 'avatar'
 *      location: // value for 'location'
 *      website: // value for 'website'
 *      updateProfileId: // value for 'updateProfileId'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const AllTweetsDocument = gql`
    query AllTweets {
  tweets {
    id
    createdAt
    content
    likes {
      id
    }
    comments {
      content
      id
    }
    author {
      id
      name
      profile {
        id
        avatar
      }
    }
  }
}
    `;

/**
 * __useAllTweetsQuery__
 *
 * To run a query within a React component, call `useAllTweetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllTweetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllTweetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllTweetsQuery(baseOptions?: Apollo.QueryHookOptions<AllTweetsQuery, AllTweetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllTweetsQuery, AllTweetsQueryVariables>(AllTweetsDocument, options);
      }
export function useAllTweetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllTweetsQuery, AllTweetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllTweetsQuery, AllTweetsQueryVariables>(AllTweetsDocument, options);
        }
export type AllTweetsQueryHookResult = ReturnType<typeof useAllTweetsQuery>;
export type AllTweetsLazyQueryHookResult = ReturnType<typeof useAllTweetsLazyQuery>;
export type AllTweetsQueryResult = Apollo.QueryResult<AllTweetsQuery, AllTweetsQueryVariables>;
export const LikesNumberDocument = gql`
    query likesNumber($likesNumberId: Int) {
  likesNumber(id: $likesNumberId) {
    id
  }
}
    `;

/**
 * __useLikesNumberQuery__
 *
 * To run a query within a React component, call `useLikesNumberQuery` and pass it any options that fit your needs.
 * When your component renders, `useLikesNumberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLikesNumberQuery({
 *   variables: {
 *      likesNumberId: // value for 'likesNumberId'
 *   },
 * });
 */
export function useLikesNumberQuery(baseOptions?: Apollo.QueryHookOptions<LikesNumberQuery, LikesNumberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LikesNumberQuery, LikesNumberQueryVariables>(LikesNumberDocument, options);
      }
export function useLikesNumberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LikesNumberQuery, LikesNumberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LikesNumberQuery, LikesNumberQueryVariables>(LikesNumberDocument, options);
        }
export type LikesNumberQueryHookResult = ReturnType<typeof useLikesNumberQuery>;
export type LikesNumberLazyQueryHookResult = ReturnType<typeof useLikesNumberLazyQuery>;
export type LikesNumberQueryResult = Apollo.QueryResult<LikesNumberQuery, LikesNumberQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MyProfileDocument = gql`
    query MyProfile {
  me {
    id
    name
    Following {
      id
      followId
    }
    likedTweets {
      id
      tweet {
        id
      }
    }
    profile {
      id
      bio
      location
      website
      avatar
    }
  }
}
    `;

/**
 * __useMyProfileQuery__
 *
 * To run a query within a React component, call `useMyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyProfileQuery(baseOptions?: Apollo.QueryHookOptions<MyProfileQuery, MyProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyProfileQuery, MyProfileQueryVariables>(MyProfileDocument, options);
      }
export function useMyProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyProfileQuery, MyProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyProfileQuery, MyProfileQueryVariables>(MyProfileDocument, options);
        }
export type MyProfileQueryHookResult = ReturnType<typeof useMyProfileQuery>;
export type MyProfileLazyQueryHookResult = ReturnType<typeof useMyProfileLazyQuery>;
export type MyProfileQueryResult = Apollo.QueryResult<MyProfileQuery, MyProfileQueryVariables>;
export const PopularTweetsDocument = gql`
    query PopularTweets {
  tweets {
    id
    createdAt
    content
    author {
      id
      profile {
        id
        avatar
      }
    }
    likes {
      id
    }
  }
}
    `;

/**
 * __usePopularTweetsQuery__
 *
 * To run a query within a React component, call `usePopularTweetsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePopularTweetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePopularTweetsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePopularTweetsQuery(baseOptions?: Apollo.QueryHookOptions<PopularTweetsQuery, PopularTweetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PopularTweetsQuery, PopularTweetsQueryVariables>(PopularTweetsDocument, options);
      }
export function usePopularTweetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PopularTweetsQuery, PopularTweetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PopularTweetsQuery, PopularTweetsQueryVariables>(PopularTweetsDocument, options);
        }
export type PopularTweetsQueryHookResult = ReturnType<typeof usePopularTweetsQuery>;
export type PopularTweetsLazyQueryHookResult = ReturnType<typeof usePopularTweetsLazyQuery>;
export type PopularTweetsQueryResult = Apollo.QueryResult<PopularTweetsQuery, PopularTweetsQueryVariables>;
export const SingleTweetDocument = gql`
    query SingleTweet($tweetId: Int) {
  tweet(id: $tweetId) {
    id
    content
    author {
      id
      name
      profile {
        id
        avatar
      }
    }
    comments {
      id
      content
      createdAt
      User {
        id
        name
        profile {
          id
          avatar
        }
      }
    }
  }
}
    `;

/**
 * __useSingleTweetQuery__
 *
 * To run a query within a React component, call `useSingleTweetQuery` and pass it any options that fit your needs.
 * When your component renders, `useSingleTweetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSingleTweetQuery({
 *   variables: {
 *      tweetId: // value for 'tweetId'
 *   },
 * });
 */
export function useSingleTweetQuery(baseOptions?: Apollo.QueryHookOptions<SingleTweetQuery, SingleTweetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SingleTweetQuery, SingleTweetQueryVariables>(SingleTweetDocument, options);
      }
export function useSingleTweetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SingleTweetQuery, SingleTweetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SingleTweetQuery, SingleTweetQueryVariables>(SingleTweetDocument, options);
        }
export type SingleTweetQueryHookResult = ReturnType<typeof useSingleTweetQuery>;
export type SingleTweetLazyQueryHookResult = ReturnType<typeof useSingleTweetLazyQuery>;
export type SingleTweetQueryResult = Apollo.QueryResult<SingleTweetQuery, SingleTweetQueryVariables>;
export const SingleUserDocument = gql`
    query SingleUser($singleUserId: Int) {
  singleUser(id: $singleUserId) {
    id
    name
    profile {
      id
      avatar
      website
    }
  }
}
    `;

/**
 * __useSingleUserQuery__
 *
 * To run a query within a React component, call `useSingleUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useSingleUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSingleUserQuery({
 *   variables: {
 *      singleUserId: // value for 'singleUserId'
 *   },
 * });
 */
export function useSingleUserQuery(baseOptions?: Apollo.QueryHookOptions<SingleUserQuery, SingleUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SingleUserQuery, SingleUserQueryVariables>(SingleUserDocument, options);
      }
export function useSingleUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SingleUserQuery, SingleUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SingleUserQuery, SingleUserQueryVariables>(SingleUserDocument, options);
        }
export type SingleUserQueryHookResult = ReturnType<typeof useSingleUserQuery>;
export type SingleUserLazyQueryHookResult = ReturnType<typeof useSingleUserLazyQuery>;
export type SingleUserQueryResult = Apollo.QueryResult<SingleUserQuery, SingleUserQueryVariables>;
export const UsersDocument = gql`
    query users {
  users {
    name
    email
    id
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const namedOperations = {
  Query: {
    AllTweets: 'AllTweets',
    likesNumber: 'likesNumber',
    Me: 'Me',
    MyProfile: 'MyProfile',
    PopularTweets: 'PopularTweets',
    SingleTweet: 'SingleTweet',
    SingleUser: 'SingleUser',
    users: 'users'
  },
  Mutation: {
    CreateComment: 'CreateComment',
    createProfile: 'createProfile',
    CreateReply: 'CreateReply',
    CreateTweet: 'CreateTweet',
    DeleteLike: 'DeleteLike',
    Follow: 'Follow',
    LikeTweet: 'LikeTweet',
    Login: 'Login',
    Signup: 'Signup',
    Unfollow: 'Unfollow',
    UpdateProfile: 'UpdateProfile'
  }
}