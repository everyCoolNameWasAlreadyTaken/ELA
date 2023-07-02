import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import server from "../../../../axios/axios";

const VideoPlayer = () => {
  /* const [videos, setVideos] = useState([
    '/assets/VideoClips/Gravity_Clip1.mp4',
    '/assets/VideoClips/Gravity_Clip2.mp4',
    '/assets/VideoClips/Gravity_Clip3.mp4',
    '/assets/VideoClips/BladeRunner_Clip1.mp4',
    '/assets/VideoClips/BladeRunner_Clip2.mp4',
    '/assets/VideoClips/BladeRunner_Clip3.mp4'
  ]); */

    const [quizStarted, setQuizStarted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [timer, setTimer] = useState([]);
    const [startTime, setStartTime] = useState(0);

    const [currentVideo, setCurrentVideo] = useState('/assets/VideoClips/BladeRunner_Clip3.mp4');
  

//Get Videodata from Backend
  const fetchQuizData = async () => {
  try {
       const response = await server.get(`/Video`);
       const {videolink, moviename, question1, answere1, question2, answere2, question3, answere3} = response.data;
       
       setCurrentVideo(videolink);
      } catch (error) {
        console.error('Error:', error);
  }
};

const startTimer = async () => {
  try {
      if (currentIndex <= questions.length) {
          setStartTime(Date.now());
      }
  } catch (error) {
      console.error('Error:', error);
  }
}
const handleStartQuiz = () => {
  setQuizStarted(true);
  fetchQuizData();
  startTimer();
};



  return (
    <div>
      {
        <ReactPlayer
          url={currentVideo}
          controls
          width="640px"
          height="360px"
        />
      }
      <div>
          Examplequestion
      </div>
    </div>


  );
};
export default VideoPlayer;
