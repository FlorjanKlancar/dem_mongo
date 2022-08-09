import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const useNextAuth = () => {
  const router = useRouter();

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  return { session, status };
};
