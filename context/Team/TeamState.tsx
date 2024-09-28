import { useState } from "react";
import TeamContext from "./TeamContext";

const TeamState = (props: any) => {
  const host = "http://10.0.2.2:5001";
  const [team, setTeam] = useState<any[]>([]);

  // Get all teams
  const getTeam = async (det:any, token :any) => {
    det = JSON.stringify(det);
    const response = await fetch(`${host}/api/Team/getTeam?det=${det}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      }
    });
    const res = await response.json();
    setTeam(res);
  };

  const addTeam = async (det:any, token :any) => {
    const response = await fetch(`${host}/api/team/addTeam`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify(det)
    });
    const res = await response.json();
    setTeam(res);
  };

  const addTeamMem = async (det:any, token :any) => {
    const response = await fetch(`${host}/api/team/addTeam`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify(det)
    });
    const res = await response.json();
    setTeam(res);
  };

  return (
    <TeamContext.Provider value={{ team, setTeam, addTeam, getTeam, addTeamMem}}>
      {props.children}
    </TeamContext.Provider>
  );
};

export default TeamState;
