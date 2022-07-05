import React from "react";

type ChangeDisplayNameModalProps = {
  setOpen: (open: boolean) => void;
  displayName: string;
  setDisplayName: (displayName: string) => void;
  submitHandler: () => void;
};

function ChangeDisplayNameModal({
  setOpen,
  displayName,
  setDisplayName,
  submitHandler,
}: ChangeDisplayNameModalProps) {
  return (
    <div className="flex flex-col items-center justify-items-center space-y-4">
      <div className="text-center ">
        <h1 className="text-2xl font-semibold text-primary">
          Change your display name
        </h1>
      </div>

      <div className="flex w-full justify-center">
        <input
          type="text"
          placeholder="Type here"
          className="input w-full max-w-xs"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>

      <div className="grid w-full grid-cols-3 space-x-3">
        <div>
          <button
            onClick={() => setOpen(false)}
            className="mt-5 w-full rounded-lg bg-slate-500 py-2 text-center font-bold text-white hover:bg-slate-600 hover:text-slate-200 "
          >
            Close
          </button>
        </div>
        <div className="col-span-2">
          <button
            className="primary_button"
            type="submit"
            onClick={submitHandler}
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangeDisplayNameModal;
