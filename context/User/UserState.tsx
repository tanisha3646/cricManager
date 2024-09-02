import { useState } from "react";
import UserContext from "./UserContext";

const UserState = (props: any) => {
  const host = "http://10.0.2.2:5001";
  const [token, setToken] = useState<string>('');
  const [typ, setTyp] = useState<string>('');

  // Get all teams
  const getUsr = async (det:any) => {
    const response = await fetch(`${host}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(det)
    });
    const res = await response.json();
    setToken(res.token);
    setTyp(res.typ);
  };

  return (
    <UserContext.Provider value={{token, typ, getUsr}}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
