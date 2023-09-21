import React, { useState, useEffect } from 'react';
import { fetchTeams, updateMatchDetails } from "../../Service/adminapi";
import { ToastContainer } from "react-toastify";
import { CheckAdminComponent } from "../../Service/AdminSecurity";
import './admin.css';





function AdminDashboard() {
  var [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState({ battingTeam: '', fieldingTeam: '' });
  const [matchDetails, setMatchDetails] = useState({ innings: 'batting', score: 0, wickets: 0, overs: 0 });

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

  const handleMatchDetailsUpdate = () => {

    const { battingTeam } = selectedTeams;
    updateMatchDetails(battingTeam, matchDetails)
      .then((updatedDetails) => {
        // Handle success and update UI as needed.
        console.log('Match details updated:', updatedDetails);
      })
      .catch((error) => {
        console.error('Error updating match details:', error);
      });
  };




  return (
    <div className="admin-page">
      <CheckAdminComponent />
      <div className="admin-container">
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
              <option value="batting">Batting</option>
              <option value="fielding">Fielding</option>
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
    </div>
  );
}

export default AdminDashboard;
