import { useState } from "react";
import UserContext from "./UserContext";

const UserState = (props: any) => {
  const host = "http://10.0.2.2:5001";
  const [token, setToken] = useState<string>('');
  const [typ, setTyp] = useState<string>('');
  const [mem, setMem] = useState<any[]>([]);

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

  const getMem = async (det:any, token :any) => {
    det = JSON.stringify(det);
    const response = await fetch(`${host}/api/User/getMem?det=${det}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      }
    });
    const res = await response.json();
    setMem(res.mem);
  };
  
  return (
    <UserContext.Provider value={{token, typ, getUsr, getMem, mem, setMem}}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
