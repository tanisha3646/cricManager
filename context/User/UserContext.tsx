import React from "react";

interface UserContextType {
  token: string;
  typ: string;
  getUsr: (det:any) => Promise<void>;
}
const UserContext = React.createContext<UserContextType | undefined>(undefined);

export default UserContext;