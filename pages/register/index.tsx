import { useState } from "react";
import { useRouter } from "next/router";

import { registerWithEmailAndPassword } from "../../firebase/clientApp";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState<string>("");
  const [passwordTwo, setPasswordTwo] = useState<string>("");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (event: any) => {
    setError(null);
    //check if passwords match. If they do, create user in Firebase
    // and redirect to your logged in page.
    if (passwordOne === passwordTwo)
      registerWithEmailAndPassword(email, passwordOne)
        .then((authUser) => {
          console.log("Success. The user is created in Firebase");
          router.push("/resources");
        })
        .catch((error) => {
          // An error occurred. Set error message to be displayed to user
          setError(error.message);
        });
    else setError("Password do not match");
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {error && <div>{error}</div>}

        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          name="email"
          id="signUpEmail"
          placeholder="Email"
        />

        <input
          type="password"
          name="passwordOne"
          value={passwordOne}
          onChange={(event) => setPasswordOne(event.target.value)}
          id="signUpPassword"
          placeholder="Password"
        />

        <input
          type="password"
          name="password"
          value={passwordTwo}
          onChange={(event) => setPasswordTwo(event.target.value)}
          id="signUpPassword2"
          placeholder="Password"
        />

        <button>REGISTER</button>
      </form>
    </div>
  );
};

export default SignUp;
