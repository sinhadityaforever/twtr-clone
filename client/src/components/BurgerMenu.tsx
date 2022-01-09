import React, { ReactElement, useState } from "react";
import { slide as Menu } from "react-burger-menu";
interface Props {}

export default function BurgerMenu({}: Props): ReactElement {
  const [isOpen, setIsOpen] = useState();

  return (
    <div>
      <Menu isOpen={isOpen}>
        <p>Test 1</p>
        <p>Test 2</p>
      </Menu>
    </div>
  );
}
