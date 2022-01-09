import React, { ReactElement } from "react";
import "../styles/footer.css";
interface Props {}

export default function Footer({}: Props): ReactElement {
  return (
    <div className="footer">
      <div className="footer__contents">
        <h2>
          <i className="fa fa-home" aria-hidden="true" />
        </h2>
        <h2>
          <i className="far fa-search" aria-hidden="true" />
        </h2>
        <h2>
          <i className="far fa-bell" aria-hidden="true" />
        </h2>
        <h2>
          <i className="far fa-envelope" aria-hidden="true" />
        </h2>
      </div>
    </div>
  );
}
