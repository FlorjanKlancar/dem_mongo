import React from "react";
import {userDetails} from "../../types/userDetailsModel";
import {ArrowNarrowLeftIcon, AnnotationIcon} from "@heroicons/react/outline";
import Link from "next/link";
import Image from "next/image";

type userDetailsProps = {
  user: userDetails;
};

function UserDetailsPage({user}: userDetailsProps) {
  return (
    <div className="mb-12 flex flex-col rounded-lg border-2 border-primary/80 bg-slate-800 px-6 py-4">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-primary">User info</h1>
        </div>
        <div>
          <Link href="/statistics">
            <button className="secondary_button">
              <ArrowNarrowLeftIcon className="mt-0.5 mr-2 h-5 w-5" />
              Back
            </button>
          </Link>
        </div>
      </div>

      <hr className="mt-4 border-primary/80" />

      <div>
        <div className="flex flex-col items-center justify-between px-12 py-4 md:flex-row lg:flex-row-reverse">
          <div className="relative h-96 w-1/2">
            <Image
              src={"https://wallpaperaccess.com/full/167765.jpg"}
              objectFit="cover"
              alt="nft-img"
              className={`rounded-lg object-top shadow-2xl`}
              layout="fill"
            />
          </div>

          <div>
            <h1
              className={`${
                user.displayName ? "text-5xl" : "text-2xl"
              } font-bold`}
            >
              {user.displayName ?? user._id}
            </h1>
            <p className="mt-5 py-2">Population</p>
            <p className="py-2">Population</p>
            <p className="py-2">Population</p>
            <button className="secondary_button mt-5">
              <AnnotationIcon className="mt-0.5 mr-2 h-5 w-5" />
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetailsPage;
