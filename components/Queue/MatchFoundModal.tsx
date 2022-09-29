import React, { useState, useEffect } from "react";
/* import { socket } from "../../lib/socket"; */
import { battleReportModel } from "../../types/battleReportModel";

type MatchFoundModalProps = {
  setOpen: (open: boolean) => void;
  battleInfo: battleReportModel | {};
  sessionId: string;
};

function MatchFoundModal({
  setOpen,
  battleInfo,
  sessionId,
}: MatchFoundModalProps) {
  const [countdown, setCountdown] = useState<number>(60);
  const [matchStatus, setMatchStatus] = useState<string>("");

  useEffect(() => {
    if (countdown < 0) {
      setOpen(false);
      return;
    }

    const id = setInterval(() => setCountdown(countdown - 1), 1000);

    return () => {
      clearInterval(id);
    };
  }, [countdown]);

  /*   useEffect(() => {
    socket.on("matchAcceptedByUser", ({ response }) => {
      console.log({ response });
      setMatchStatus(response);
    });
    socket.on("matchCreated", ({ response }) => {
      console.log({ response });
      setMatchStatus(response);
    });
  }, []);

  const acceptHandler = async () => {
    await socket.emit("matchAccepted", {
      sessionId,
      battleInfo,
    });
  }; */

  return (
    <div className="flex flex-col items-center space-y-2 sm:px-4">
      <div>
        <h3 className="text-center text-lg font-bold text-primary sm:text-left">
          Match found
        </h3>
      </div>

      <div className="">
        <span className="countdown font-mono text-6xl">
          <span style={{ "--value": countdown }}></span>
        </span>
      </div>

      {matchStatus.length ? (
        <div>
          <p>{matchStatus}</p>
        </div>
      ) : (
        <></>
      )}

      <div className="grid w-full grid-cols-3 space-x-3">
        <div>
          <button
            className="mt-5 w-full rounded-lg bg-slate-500 py-2 text-center font-bold text-white hover:bg-slate-600 hover:text-slate-200"
            onClick={() => setOpen(false)}
            disabled={matchStatus.length ? true : false}
          >
            Decline
          </button>
        </div>
        <div className="col-span-2">
          <button
            className="primary_button"
            type="button"
            /*  onClick={acceptHandler} */
            disabled={matchStatus.length ? true : false}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default MatchFoundModal;
