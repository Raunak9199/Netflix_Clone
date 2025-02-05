import React from "react";

const Divider = ({
  height = "h-1",
  width = "w-full",
  backgroundColor = "#232323",
  ariaHidden = true,
}) => {
  return (
    <div
      className={`${height} ${width} bg-[${backgroundColor}]`}
      aria-hidden={ariaHidden}
    />
  );
};

export default Divider;
