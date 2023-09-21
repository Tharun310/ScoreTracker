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


