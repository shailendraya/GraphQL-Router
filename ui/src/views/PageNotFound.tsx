import React from "react";
import Rive, { useRive } from "@rive-app/react-canvas";

// Importing the local Rive file
import riveFile from "assets/animation/rive/404_v1.riv";

type Props = {};

// RiveDemo Component
export const RiveDemo = () => {
  return (
    <Rive
      src="https://cdn.rive.app/animations/vehicles.riv"
      stateMachines="bumpy"
    />
  );
};

// PageNotFound Component
const PageNotFound = (props: Props) => {
  const { rive, RiveComponent } = useRive({
    src: riveFile,
    stateMachines: "bumpy",
    autoplay: false,
  });

  return (
    <main className="grid min-h-full w-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {/* RiveDemo shows a local animation */}
        <RiveDemo />

        {/* RiveComponent using the remote animation */}
        {RiveComponent && (
          <RiveComponent
            onMouseEnter={() => rive?.play()}
            onMouseLeave={() => rive?.pause()}
          />
        )}

        {/* Navigation buttons */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/main"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </a>
          <a href="#" className="text-sm font-semibold text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
};

export default PageNotFound;
