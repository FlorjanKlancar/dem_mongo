import { XIcon } from "@heroicons/react/outline";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNextAuth } from "../../hooks/useNextAuth";
import socket from "../../lib/socket";

function UserInQueueButton({ queueData }: any) {
  const { session }: any = useNextAuth();
  const queryClient = useQueryClient();

  const getSecondsDifference = (timeInQueue: Date) => {
    return dayjs().diff(timeInQueue, "seconds");
  };

  const [timeInQueue, setTimeInQueue] = useState(
    queueData ? getSecondsDifference(queueData.createdAt) : null
  );

  const cancelQueueHandler = () => {
    const queueToast = toast.loading("Removing from queue...");

    socket.emit("cancelUserFromQueue", { userId: session.user.uid });

    socket.on("cancelResponse", async ({ response }) => {
      if (response.status === 200) {
        console.log("invalidating");

        await queryClient.invalidateQueries(["queue", "village"]);
        toast.success(response.msg, { id: queueToast });
      } else {
        toast.error(response.msg, { id: queueToast });
      }
    });
  };

  useEffect(() => {
    if (timeInQueue) {
      const id = setInterval(() => setTimeInQueue(timeInQueue + 1), 1000);

      return () => {
        clearInterval(id);
      };
    }
  }, [timeInQueue]);

  console.log({ timeInQueue, queueData });

  return (
    <div className="tooltip  tooltip-bottom" data-tip="Cancel queue">
      <button
        className="navbar_button flex w-full"
        onClick={cancelQueueHandler}
      >
        <span className="w-3/4 lowercase">{timeInQueue}s</span>
        <span>
          <XIcon className="h-4 w-4 text-red-600" />
        </span>
      </button>
    </div>
  );
}

export default UserInQueueButton;
