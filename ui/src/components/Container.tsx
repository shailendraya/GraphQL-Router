import React from "react";

type Props = { children?: React.ReactNode };

const Container = ({ children }: Props) => {
  return (
    <div className="flex justify-center items-center h-screen bg-background-default overflow-y-auto">
      {children ?? ""}
    </div>
  );
};

export default Container;
