import React, { useState, useEffect } from 'react';
import { fetchTeams, updateMatchDetails, createMatchRecord } from "../../Service/adminapi";
import { ToastContainer, toast } from "react-toastify";
import { CheckAdminComponent } from "../../Service/AdminSecurity";
import './admin.css';





function AdminDashboard() {
  var [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState({ battingTeam: '', fieldingTeam: '' });
  const [matchDetails, setMatchDetails] = useState({ innings: 'first', score: 0, wickets: 0, overs: 0 });

  const loadData = async () => {
    let getTeamDetails = await fetchTeams();
    // console.log(getTeamDetails.data.getData)
   
    const teamsArray = Object.values(getTeamDetails.data.getData);
    // console.log(teamsArray);
    try {
      if (getTeamDetails.status === 200) {
        teams = teamsArray;
        setTeams(teamsArray);
        console.log(teams);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  const handleTeamSelection = (teamType, teamId) => {
    setSelectedTeams((prevTeams) => ({ ...prevTeams, [teamType]: teamId }));
  };


const handleMatchDetailsUpdate = async () => {
  const { innings, score, wickets, overs } = matchDetails;
  const formdata = {
    innings : innings,
    score : score,
    wickets : wickets,
    overs : overs,
  }
  console.log("score details:", formdata)
    // Update the details for the batting team
    updateMatchDetails(formdata)
  
};


const handleStartMatch = async () => {
  const { battingTeam, fieldingTeam } = selectedTeams;
  const formdata = {
    battingTeam : battingTeam,
    fieldingTeam : fieldingTeam,
    innings : "first",
  }
  const formdata2 = {
    battingTeam : fieldingTeam,
    innings : "second",
  }
  // Ensure both batting and fielding teams are selected
  if (!battingTeam || !fieldingTeam) {
    alert('Please select both teams before starting the match.');
    return;
  }

  let createscore = await createMatchRecord(formdata);
  let createscore2 = await createMatchRecord(formdata2);
  console.log('createscore',createscore);
      
        toast.success("Match has started");
    };

//   createMatchRecord(fieldingTeam, 'second')
//     .then((createdRecord) => {
//       console.log('Match started:', createdRecord);
      
//     })
//     .catch((error) => {
//       console.error('Error starting the match:', error);
//     });
// };

  return (
  <div className="admin-page full-screen"> 
      <CheckAdminComponent />
      <ToastContainer />
        <h1 className="admin-heading">Admin Page</h1>
        <div className="team-selection">
          <h2>Select Teams:</h2>
          <label>
            Batting Team:
            <select
              className="team-select"
              value={selectedTeams.battingTeam}
              onChange={(e) => handleTeamSelection('battingTeam', e.target.value)}
            >
              <option value="">Select a Team</option>
              {teams.map((team) => (
                <option key={team.team_id} value={team.team_id}>
                  {team.team_name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Fielding Team:
            <select
              className="team-select"
              value={selectedTeams.fieldingTeam}
              onChange={(e) => handleTeamSelection('fieldingTeam', e.target.value)}
            >
              <option value="">Select a Team</option>
              {teams.map((team) => (
                <option key={team.team_id} value={team.team_id}>
                  {team.team_name}
                </option>
              ))}
            </select>
          </label>
          <button className="start-match-button" onClick={handleStartMatch}>
            Start Match
          </button>
        </div>
        <div className="match-details">
          <h2>Match Details:</h2>
          <label>
            Innings:
            <select
              className="match-input"
              value={matchDetails.innings}
              onChange={(e) => setMatchDetails({ ...matchDetails, innings: e.target.value })}
            >
              <option value="first">first</option>
              <option value="second">second</option>
            </select>
          </label>
          <label>
            Score:
            <input
              className="match-input"
              type="number"
              value={matchDetails.score}
              onChange={(e) => setMatchDetails({ ...matchDetails, score: e.target.value })}
            />
          </label>
          <label>
            Wickets:
            <input
              className="match-input"
              type="number"
              value={matchDetails.wickets}
              onChange={(e) => setMatchDetails({ ...matchDetails, wickets: e.target.value })}
            />
          </label>
          <label>
            Overs:
            <input
              className="match-input"
              type="number"
              value={matchDetails.overs}
              onChange={(e) => setMatchDetails({ ...matchDetails, overs: e.target.value })}
            />
          </label>
          <button className="update-button" onClick={handleMatchDetailsUpdate}>
            Update Match Details
          </button>
        </div>
   </div> 
  );
}

export default AdminDashboard;
