import React from "react";
import NavbarMobile from "./NavbarMobile";
import Menu from "./Menu";
import {useDispatch} from "react-redux";
import {authActions} from "../../store/auth-slice";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase/clientApp";

function NavbarDem() {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    signOut(auth);
    dispatch(authActions.logOut());
  };

  return (
    <>
      <div className="md:hidden">
        <NavbarMobile />
      </div>

      <div className="flex flex-col">
        <div className="m-auto mt-5 hidden w-3/4 justify-around rounded-2xl border-2 border-primary/50 bg-slate-800/80 p-3 md:flex lg:w-2/3 2xl:w-2/5">
          <Menu />
        </div>

        <div className="mt-4 flex justify-center">
          <button className="btn" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default NavbarDem;
