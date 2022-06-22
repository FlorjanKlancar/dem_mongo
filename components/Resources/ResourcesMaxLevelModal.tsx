import Image from "next/image";
import React from "react";

type ResourcesMaxLevelModalProps = {
  clickedResource: {
    id: string;
    level: number;
    name: string;
    image: string;
    description: string;
    levels: number;
    type: string;
  };
};

function ResourcesMaxLevelModal({
  clickedResource,
}: ResourcesMaxLevelModalProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-5 py-8 sm:space-y-2 sm:px-8">
      <div className="relative h-32 w-32">
        {clickedResource.image && (
          <Image
            src={clickedResource.image}
            alt={clickedResource.type}
            layout="fill"
          />
        )}
        <div className="text-bold absolute bottom-1 right-9 z-50 text-4xl text-white">
          {clickedResource.level}
        </div>
      </div>
      <div>Building is max level!</div>
    </div>
  );
}

export default ResourcesMaxLevelModal;
