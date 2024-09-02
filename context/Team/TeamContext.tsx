import React from "react";

interface TeamContextType {
  team: any;
  setTeam: React.Dispatch<React.SetStateAction<any>>; 
  addTeamMem: (nme: string, loc: string, logo: string | null, tag: string) => Promise<void>;
}
const TeamContext = React.createContext<TeamContextType | undefined>(undefined);

export default TeamContext;