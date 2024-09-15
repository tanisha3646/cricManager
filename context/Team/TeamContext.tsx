import React from "react";

interface TeamContextType {
  team: any;
  setTeam: React.Dispatch<React.SetStateAction<any>>; 
  addTeamMem: (det: any, token:any) => Promise<void>;
  getTeam: (det: any, token:any) => Promise<void>;
}
const TeamContext = React.createContext<TeamContextType | undefined>(undefined);

export default TeamContext;