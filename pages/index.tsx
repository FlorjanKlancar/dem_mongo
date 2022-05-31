import axios from "axios";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";

function MainPage() {
  const [user]: any = useAuthState(auth);

  const fetchData = async () => {
    const response = await axios.get("/api/village/" + user.uid, {
      headers: { Authorization: `Bearer ${user?.accessToken}` },
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return <div>hello world</div>;
}

export default MainPage;
