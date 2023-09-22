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

export const fetchLiveScore = async (innings) => {
  let getScore = await axios
  .get(`${env.REACT_APP_API}/admin/get_score/${innings}`)
  .then((res) => {
    return res;
  })
  .catch((error) => {
    return error.response;
  });
return getScore;
};

export const updateMatchDetails = async (formdata) => {
  
    let updateMatchDetails = await axios
    .put(`${env.REACT_APP_API}/admin/update_score`, {
      innings:formdata.innings,
      score : formdata.score,
      wickets : formdata.wickets,
      overs : formdata.overs,
    })
    .then((res) => {
      console("response",res)
      return res;
    })
    .catch((error) => {
      return error.response;
    });
  return updateMatchDetails;
};

export const createMatchRecord = async (formdata) => {
  console.log("formdata",formdata)
    let createMatchRecord = await axios
    .post(`${env.REACT_APP_API}/admin/post_score`, {
      team_id: formdata.battingTeam,
      innings : formdata.innings,
      score: 0, // Initialize with 0 score
      wickets: 0, // Initialize with 0 wickets
      overs: 0.0, // Initialize with 0.0 overs
    })
    .then((res) => {
      console("response",res)
      return res;
    })
    .catch((error) => {
      return error.response;
    });
  return createMatchRecord;
};


