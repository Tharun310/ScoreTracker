// UserPage.js
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { CheckLoginComponent } from "../Service/SecurityService";
import "./Dashboard.css";
import { getLiveUpdates } from '../Service/userapi';

const UserPage = () => {
  let teamFlagUrl1 = "data:image/png;base64,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"
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
        // console.log("liveUpdates.getdata",liveUpdates.getData[0]['id'])
        // setLiveScores(liveUpdates.getData);
        // console.log("live updates",liveUpdates);
        // setLiveScores(liveUpdates.getData);
        // liveScores = liveUpdates.getData
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
    <div className="user-page">
      <CheckLoginComponent />
      <ToastContainer />
      
      <div className="left">
        <h2>{liveScores[0].team}</h2>
        <div className="team-flag" style={{ backgroundImage: `url(${teamFlagUrl1})` }}></div>
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
      {liveScores[0].completed === '1' && (
        <div className="right">
          <h2>Target</h2>
          <p>{liveScores[0].score}</p>
        </div>
      )}

      
        <div className="right">
          <h2>{liveScores[1].team}</h2>
          <div className="team-flag" style={{ backgroundImage: `url(${teamFlagUrl1})` }}></div>
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
        {matchResult && (
        <div className={`result ${matchResult === 'Success' ? 'success' : ''}`}>
          {matchResult}
        </div>
      )}
    </div>
  );
};

export default UserPage;
