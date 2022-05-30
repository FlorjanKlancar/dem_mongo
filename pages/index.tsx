import axios from "axios";
import React, {useEffect} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase/clientApp";

function index() {
  const [user]: any = useAuthState(auth);

  console.log("user", user);

  const fetchData = async () => {
    const response = await axios.get("/api/village/" + user.uid, {
      headers: {Authorization: `Bearer ${user?.accessToken}`},
    });

    console.log("response", response);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return <div>hello world</div>;
}

export default index;
