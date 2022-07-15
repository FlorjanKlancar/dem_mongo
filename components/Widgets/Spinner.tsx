import { useState } from "react";
import { css } from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
`;

type SpinnerProps = {
  size?: number;
};

function Spinner({ size = 20 }: SpinnerProps) {
  return (
    <div className="sweet-loading">
      <SyncLoader color="#cda37c" css={override} size={size} />
    </div>
  );
}

export default Spinner;
