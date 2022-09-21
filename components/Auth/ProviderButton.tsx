import Image from "next/image";
import React from "react";
import { signIn } from "next-auth/react";

function ProviderButton({ provider }: any) {
  return (
    <div className="w-full">
      <button
        className="login_button"
        type="button"
        onClick={() => signIn(provider.id, { callbackUrl: "/resources" })}
      >
        <span className="pl-2">Sign in with {provider.name}</span>
      </button>
    </div>
  );
}

export default ProviderButton;
