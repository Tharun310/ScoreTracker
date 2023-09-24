import axios from "axios";
import { env } from "../env";


// export const getLiveUpdates = async () => {
//   let getUpdates = await axios
//   .get(`${env.REACT_APP_API}/users/get_liveUpdates`)
//   .then((res) => {
//     return res;
//   })
//   console.log("service liveupdates", getUpdates)
//   .catch((error) => {
//     return error.response;
//   });
// return getUpdates;
// };


export const getLiveUpdates = async () => {
    try {
      const response = await axios.get(`${env.REACT_APP_API}/users/get_liveUpdates`);
      console.log("response.data",response.data)
      return response.data; // Return the data received from the server
      console.log("data sent");
    } catch (error) {
      console.error('Error fetching live updates:', error);
      throw error; // Re-throw the error for further handling if needed
    }
  };








