import React, { useState } from "react";
import { userDetailsProps } from "../../types/userDetailsModel";
import {
  ArrowNarrowLeftIcon,
  AnnotationIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import Modal from "../Modal/Modal";
import ChangeDisplayNameModal from "./ChangeDisplayNameModal";
import axios from "axios";
import toast from "react-hot-toast";
import { useNextAuth } from "../../hooks/useNextAuth";

function UserDetailsPage({
  user,
  villageResponse,
  positionOnLadder,
}: userDetailsProps) {
  const { session }: any = useNextAuth();

  const [open, setOpen] = useState(false);
  const [displayName, setDisplayName] = useState(
    user.displayName ?? session.user.uid
  );

  const submitHandler = async () => {
    const response = await axios.put(`/api/user/${session.user.uid}`, {
      displayName,
    });

    if (response.status === 200) {
      toast.success("Successfully changed display name");
    } else {
      toast.error("Couldn't change display name");
    }
    setOpen(false);
  };

  return (
    <div className="mb-12 flex flex-col rounded-lg border-2 border-primary/80 bg-slate-800 px-6 py-4">
      <div className="flex items-center justify-between">
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
          <div className="relative h-96 w-1/3">
            <Image
              src={
                user.heroIcon
                  ? user.heroIcon
                  : "https://wallpaperaccess.com/full/167765.jpg"
              }
              objectFit="cover"
              alt="nft-img"
              className={`rounded-lg object-top shadow-2xl`}
              layout="fill"
            />
          </div>

          <div>
            <div className="flex items-center space-x-5">
              <div>
                <h1
                  className={`${
                    user.displayName ? "text-5xl" : "text-2xl"
                  } font-bold`}
                >
                  {displayName}
                </h1>
              </div>
              {session.user.uid === user._id && (
                <div>
                  <div
                    className="tooltip  cursor-pointer hover:text-primary"
                    data-tip="Change your display name"
                    onClick={() => setOpen(true)}
                  >
                    <PencilAltIcon className="mt-2 h-8 w-8 " />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Village population</div>
                  <div className="stat-value text-center">
                    {villageResponse.population}
                  </div>
                  <div className="stat-desc">
                    Position on ladderboard:{" "}
                    <span className="font-bold text-primary">
                      {positionOnLadder}
                    </span>
                  </div>
                </div>
              </div>
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Account creation date</div>
                  <div className="stat-value text-center">
                    {dayjs(villageResponse.createdAt).format("DD. MM. YYYY")}
                  </div>
                </div>
              </div>
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Offense score</div>
                  <div className="stat-value text-center">512</div>
                </div>
              </div>
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Defense score</div>
                  <div className="stat-value text-center">784</div>
                </div>
              </div>
            </div>

            <button className="secondary_button mt-5">
              <AnnotationIcon className="mt-0.5 mr-2 h-5 w-5" />
              Message
            </button>
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <ChangeDisplayNameModal
          setOpen={setOpen}
          displayName={displayName}
          setDisplayName={setDisplayName}
          submitHandler={submitHandler}
        />
      </Modal>
    </div>
  );
}

export default UserDetailsPage;
