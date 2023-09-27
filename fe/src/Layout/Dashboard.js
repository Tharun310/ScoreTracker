import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { CheckLoginComponent } from "../Service/SecurityService";
import "./Dashboard.css";
import { getLiveUpdates } from '../Service/userapi';

const UserPage = () => {
  const [liveScores, setLiveScores] = useState([
    {
      id: 1,
      team: '',
      score: '',
      wickets: '',
      innings: '',
      completed: '',
      overs: '',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 2,
      team: '',
      score: '',
      wickets: '',
      innings: '',
      completed: '',
      overs: '',
      createdAt: '',
      updatedAt: '',
    },
  ]);
  const [currentInnings,setcurrentInnings] = useState(0)
  const [matchResult, setMatchResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const liveUpdates = await getLiveUpdates();
        setLiveScores(liveUpdates.getData)
        console.log("liveScores[0].completed: ",liveScores[0].completed)
        if(liveScores[0].completed == '1'){
          setcurrentInnings(1)
          console.log("current innings is set to 1")
        }
        console.log("live dict",liveScores);
        console.log("currentInnings",currentInnings)
        console.log("live dict ids",liveScores[0].score)
      } catch (error) {
        console.error('Error in fetching live updates:', error);
      }
    };
    const intervalId = setInterval(fetchData, 3000);
  
    return () =>{
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (liveScores[0].completed === '1' && liveScores[1].completed === '1') {

      const firstInningsScore = parseInt(liveScores[0].score, 10);
      const firstInningsWickets = parseInt(liveScores[0].wickets, 10);
      const secondInningsScore = parseInt(liveScores[1].score, 10);
      const secondInningsWickets = parseInt(liveScores[1].wickets, 10);

      if (firstInningsScore > secondInningsScore) {
        const runsDifference = firstInningsScore - secondInningsScore;
        setMatchResult(`${liveScores[0].team} won by ${runsDifference} runs.`);
      } else if (firstInningsScore < secondInningsScore) {
        const wicketsDifference = 10 - secondInningsWickets;
        setMatchResult(`${liveScores[1].team} won by ${wicketsDifference} wickets.`);
      } else {
        setMatchResult('The match ended in a tie.');
      }
    }
  }, [liveScores]);




  return (
    <>

    <div className="user-container">
      <CheckLoginComponent />
      <ToastContainer />
      <div className="user-title">
      <h1>SportZ Buzz....</h1>
      </div>
      {liveScores[0].completed === "" ? (
        
            <div>
               <p>Loading live score...</p>
            </div>
          ) : (
            <div>
                 {liveScores[0].completed === '1' && (
              <div className="right-card target-card">
              <h2>Target</h2>
              <p>{parseInt(liveScores[0].score)+1}</p>
            </div>
          )}
          <div className="innings-container">
          <div className="innings">
            <h2>{liveScores[0].team}</h2>
            <div className="profile-photo">
                <p>{liveScores[0].team.charAt(0)}</p></div>
            {liveScores[0].completed === '0' && (
            <div className="team-details">
              <p>Score: {liveScores[0].score}</p>
              <p>Wickets: {liveScores[0].wickets}</p>
              <p>Overs: {liveScores[0].overs}</p>
            </div>
          )}
      
          {liveScores[0].completed === '1' && (
            <h1>{liveScores[0].score}/{liveScores[0].wickets}</h1>
          )}
          </div>
      
        <div className="innings">
          <h2>{liveScores[1].team}</h2>
          <div className="profile-photo">
            <p>{liveScores[1].team.charAt(0)}</p></div>
          {liveScores[0].completed === '1' && liveScores[1].completed === '0' &&(
          <div className="team-details">
            <p>Score: {liveScores[1].score}</p>
            <p>Wickets: {liveScores[1].wickets}</p>
            <p>Overs: {liveScores[1].overs}</p>
          </div>
          )}
          {liveScores[1].completed === '1' && (
        <h1>{liveScores[1].score}/{liveScores[1].wickets}</h1>
        )}
        </div>
        </div>
          {matchResult && (
          <div className="result-card">
            {matchResult}
        </div>
        )}
            </div>
          )}
    </div>
    </>
  );
};

export default UserPage;