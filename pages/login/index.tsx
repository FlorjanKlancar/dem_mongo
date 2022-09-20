import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push("/resources");
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export default LoginPage;
