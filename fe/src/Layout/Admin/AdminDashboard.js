import React, { useState, useEffect, useMemo} from 'react';
import { fetchTeams, updateMatchDetails, createMatchRecord } from "../../Service/adminapi";
import { ToastContainer, toast } from "react-toastify";
import { CheckAdminComponent } from "../../Service/AdminSecurity";
import { fetchLiveScore } from '../../Service/adminapi';
import './admin.css';





function AdminDashboard() {
  var [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState({ battingTeam: '', fieldingTeam: '' });
  const [matchDetails, setMatchDetails] = useState({ innings: 'first', score: 0, wickets: 0, overs: 0 });
  const [liveScore, setLiveScore] = useState({
    "0" : {
      team_id : '',
      score : '',
      wickets : '',
      overs : '',
      innings : '',
    }
  });
  const [targetScore, setTargetScore] = useState("0")

  // const fetchLiveScore = async (innings) => {
  //   try {
      
  //     const response = await axios.get(`/api/live-score?innings=${innings}`);
  //     return response.data;
  //   } catch (error) {
  //     throw new Error('Error fetching live score: ' + error.message);
  //   }
  // };

  const loadlivescore = async () => {
    try {
    let getScoreDetails = await fetchLiveScore(matchDetails.innings);
    let fetchData = getScoreDetails.data;
        if (getScoreDetails.status === 200) {
          let myData = [
            { team_id: fetchData.livescore.team_id, 
            score: fetchData.livescore.score,
            wickets : fetchData.livescore.wickets,
            innings : fetchData.livescore.innings,
            overs : fetchData.livescore.overs,
           },
          ];
          setLiveScore(myData);
          console.log("liveScore",liveScore['0']);
        }
    } catch (error) {
      console.log(error);
    }
  };
  useMemo(() => {
    loadlivescore();
  }, []);

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
    loadlivescore();
    loadlivescore();
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



  return (
    <div className="admin-page full-screen">
    <CheckAdminComponent />
      <ToastContainer />
    <h1 className="admin-heading">Admin Page</h1>
    <div className="admin-content">
      <div className="half left">
        <div className="team-selection">
          <h2>Select Teams:</h2>
          <label>
            Batting Team:
            <select
              className="team-select"
              value={selectedTeams.battingTeam}
              onChange={(e) =>
                handleTeamSelection('battingTeam', e.target.value)
              }
            >
              <option value="">Select a Team</option>
              {/* Render teams dynamically */}
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
              onChange={(e) =>
                handleTeamSelection('fieldingTeam', e.target.value)
              }
            >
              <option value="">Select a Team</option>
              {/* Render teams dynamically */}
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
        {liveScore['0'].team_id ? (
            <div>
              <p>Team: {liveScore['0'].team_id}</p>
              <p>Score: {liveScore['0'].score}</p>
              <p>Wickets: {liveScore['0'].wickets}</p>
              <p>Overs: {liveScore['0'].overs}</p>
              {selectedTeams.innings === 'second' && (
                <p>Target Score: {liveScore.target}</p>
              )}
            </div>
          ) : (
            <p>Loading live score...</p>
          )}
      </div>
      <div className="half right">
        <div className="match-details">
          <h2>Match Details:</h2>
          <label>
            Innings:
            <select
              className="match-input"
              value={matchDetails.innings}
              onChange={(e) =>
                setMatchDetails({
                  ...matchDetails,
                  innings: e.target.value,
                })
              }
            >
              <option value="first">First</option>
              <option value="second">Second</option>
            </select>
          </label>
          <label>
            Score:
            <input
              className="match-input"
              type="number"
              value={matchDetails.score}
              onChange={(e) =>
                setMatchDetails({ ...matchDetails, score: e.target.value })
              }
            />
          </label>
          <label>
            Wickets:
            <input
              className="match-input"
              type="number"
              value={matchDetails.wickets}
              onChange={(e) =>
                setMatchDetails({ ...matchDetails, wickets: e.target.value })
              }
            />
          </label>
          <label>
            Overs:
            <input
              className="match-input"
              type="number"
              value={matchDetails.overs}
              onChange={(e) =>
                setMatchDetails({ ...matchDetails, overs: e.target.value })
              }
            />
          </label>
          <button className="update-button" onClick={handleMatchDetailsUpdate}>
            Update Match Details
          </button>
        </div>
        <div className="live-score">
          <h2>Live Score</h2>
          {liveScore['0'].team_id ? (
            <div>
              <p>Team: {liveScore['0'].team_id}</p>
              <p>Score: {liveScore['0'].score}</p>
              <p>Wickets: {liveScore['0'].wickets}</p>
              <p>Overs: {liveScore['0'].overs}</p>
              {selectedTeams.innings === 'second' && (
                <p>Target Score: {liveScore.target}</p>
              )}
            </div>
          ) : (
            <p>Loading live score...</p>
          )}
        </div>
      </div>
    </div>
  </div>
);
}

export default AdminDashboard;
