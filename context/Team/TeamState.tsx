import { useState } from "react";
import TeamContext from "./TeamContext";

const TeamState = (props: any) => {
  const host = "http://localhost:5001";
  const [team, setTeam] = useState<any[]>([]);

  // Get all teams
  const getTeam = async () => {
    const response = await fetch(`${host}/api/Team/getTeam`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setTeam(json);
  };

  const addTeamMem = async (nme: string, loc: string, logo: string | null, tag: string) => {
    const response = await fetch(`${host}/api/Team/addTeamMem`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ nme, loc, logo, tag })
    });
    const json = await response.json();
    setTeam(json);
  };

  const addTeam = async () => {
    const response = await fetch(`${host}/api/Team/addTeam`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setTeam(json);
  };

  return (
    <TeamContext.Provider value={{ team, setTeam, addTeamMem }}>
      {props.children}
    </TeamContext.Provider>
  );
};

export default TeamState;
