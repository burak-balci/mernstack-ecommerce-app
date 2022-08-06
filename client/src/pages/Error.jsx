import React from "react";

const Error = ({ error }) => {
  return (
    <div className="mt-10 text-4xl font-rob flex items-center justify-center">
      <div>Error {error}</div>
    </div>
  );
};

export default Error;
