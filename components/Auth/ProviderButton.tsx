import Image from "next/image";
import React from "react";

function ProviderButton({ provider, onSubmitHandler, buttonImage }: any) {
  return (
    <div className="w-full">
      <button
        className="login_button"
        type={provider.name === "Credentials" ? "submit" : "button"}
        onClick={onSubmitHandler}
      >
        {buttonImage && <Image src={buttonImage} />}
        <span className="pl-2">Sign in with {provider.name}</span>
      </button>
    </div>
  );
}

export default ProviderButton;
