import React from "react";

type Props = {
  backgroundImage?: string;
  children: React.ReactNode;
};

const FullHeightContainer = ({ children, backgroundImage }: Props) => {
  const backgroundStyle = {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    ...(backgroundImage && {
      backgroundImage: `url(${backgroundImage})`,
    }),
  };

  return (
    <div
      data-testid="background-container"
      className="h-screen w-screen flex flex-col "
      style={backgroundStyle}
    >
      {children}
    </div>
  );
};

export default FullHeightContainer;
