import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import RegisterComponent from "./RegisterComponent";
import axios from "axios";
import { providerModel } from "../../types/providerModel";
import { signIn } from "next-auth/react";
import NewLogin from "./NewLogin";

type LoginComponentProps = {
  providers: providerModel[];
};

function LoginComponent({ providers }: LoginComponentProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [register, setRegister] = useState(false);

  /* useEffect(() => {
    router.push("/resources");
  }, [user, loading]); */

  const submitHandler = async (e: any) => {
    e.preventDefault();
  };

  const onSubmitRegister = (event: any) => {
    event.preventDefault();
  };

  return (
    <>
      <NewLogin providers={providers} />
    </>
  );
}
export default LoginComponent;
