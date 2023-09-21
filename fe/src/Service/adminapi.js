import axios from "axios";
import { env } from "../env";



export const getEvent = async () => {
  let getAllEvent = await axios
    .get(`${env.REACT_APP_API}/dashboard/upcoming_event/get`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });
  return getAllEvent;
};


// Fetch teams from the server
export const fetchTeams = async () => {
  let getTeams = await axios
  .get(`${env.REACT_APP_API}/dashboard/teams/get`)
  .then((res) => {
    return res;
  })
  .catch((error) => {
    return error.response;
  });
return getTeams;
};

// Fetch matches from the server
export const fetchMatches = () => {
  return axios.get(`${env.REACT_APP_API}/matches`);
};

// Update the scorecard for a specific match and team
export const updateScorecard = (matchId, teamId, data) => {
  return axios.post(`${env.REACT_APP_API}/matches/${matchId}/scorecard`, {
    teamId,
    ...data,
  });
};
