import { useState } from "react";
import TeamContext from "./TeamContext";

const TeamState = (props: any) => {
  const host = "http://10.0.2.2:5001";
  const [team, setTeam] = useState<any[]>([]);
  const [teamMem, setTeamMem] = useState<any[]>([]);

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

  const addTeam = async (det:any, token: any) => {
    const formData = new FormData();
    console.log('Image URI:', det.logo);

    formData.append('det', JSON.stringify(det));
    formData.append('image', {
      uri: det.logo, 
      type: 'image/jpeg', 
      name: `${det.teamId}_logo.jpg`,
    });
  
    const response = await fetch(`${host}/api/team/addTeam`, {
      method: "PUT",
      headers: {
        "authorization": `Bearer ${token}`
      },
      body: formData,
    });
  
    const res = await response.json();
    setTeam(res);
  };
  
  

  const addTeamMem = async (det:any, token :any) => {
    const response = await fetch(`${host}/api/team/addTeamMem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify(det)
    });
    const res = await response.json();
    setTeamMem(res);
  };

  const getTeamMem = async (det:any, token :any) => {
    det = JSON.stringify(det);
    const response = await fetch(`${host}/api/Team/getTeamMem?det=${det}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      }
    });
    const res = await response.json();
    if(res)
      setTeamMem(res);
  };

  const delTeamMem = async (det:any, token :any) => {
    console.log(det)
    const response = await fetch(`${host}/api/Team/delTeamMem`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify(det)
    });
    const res = await response.json();
    if(res)
      setTeamMem(res);
  };

  return (
    <TeamContext.Provider value={{ team, setTeam, addTeam, getTeam, addTeamMem, teamMem,getTeamMem, delTeamMem}}>
      {props.children}
    </TeamContext.Provider>
  );
};

export default TeamState;
