import axios from "axios";
import { env } from "../env";


// Fetch teams from the server
export const fetchTeams = async () => {
  let getTeams = await axios
  .get(`${env.REACT_APP_API}/admin/get_teams`)
  .then((res) => {
    return res;
  })
  .catch((error) => {
    return error.response;
  });
return getTeams;
};

export const updateMatchDetails = async (teamId, matchDetails) => {
  try {
    const response = await axios
    .put(`${env.REACT_APP_API}/score/${teamId}`, matchDetails);
    return response.data; // Assuming your API returns the updated match details.
  } catch (error) {
    console.error(`Error updating match details for team ${teamId}:`, error);
    throw error;
  }
};

export const createMatchRecord = async (teamId, innings) => {
    let response = await axios
    .post(`${env.REACT_APP_API}/admin/post_score`, {
      team_id: teamId,
      innings : innings,
      score: 0, // Initialize with 0 score
      wickets: 0, // Initialize with 0 wickets
      overs: 0.0, // Initialize with 0.0 overs
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};


