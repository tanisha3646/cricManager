import React from "react";

interface UserContextType {
  token: string;
  typ: string;
  getUsr: (det:any) => Promise<void>;
  getMem: (det: any, token:any) => Promise<void>;
  mem: any;
  setMem: React.Dispatch<React.SetStateAction<any>>; 
}
const UserContext = React.createContext<UserContextType | undefined>(undefined);

export default UserContext;