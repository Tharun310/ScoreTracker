import axios from "axios";
import { env } from "../env";



// Fetch teams from the server
export const fetchTeams = () => {
  return axios.get(`${BASE_URL}/teams`);
};

// Fetch matches from the server
export const fetchMatches = () => {
  return axios.get(`${BASE_URL}/matches`);
};

// Update the scorecard for a specific match and team
export const updateScorecard = (matchId, teamId, data) => {
  return axios.post(`${BASE_URL}/matches/${matchId}/scorecard`, {
    teamId,
    ...data,
  });
};
