import React, { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import server from "../../../../axios/axios";



const AudioPlayer = () => {
   /*  // eslint-disable-next-line
    const [audioFiles, setAudios] = useState([
    '/assets/AudioClips/aHkLpZsYtR.mp3',
    '/assets/AudioClips/qWdEfGjIhT.mp3',
    '/assets/AudioClips/bNxMvPlKoJ.mp3',
    '/assets/AudioClips/cVbNmLkPoI.mp3',
    '/assets/AudioClips/qWeRtYuIoP.mp3',
    '/assets/AudioClips/mNbVcXzAsD.mp3',
    '/assets/AudioClips/zXcVbNmLoI.mp3',
    '/assets/AudioClips/aSdFgHjKlP.mp3',
    '/assets/AudioClips/qWeRtZUKoP.mp3',
    '/assets/AudioClips/pOiUyTrEsD.mp3',
    '/assets/AudioClips/zXcVbNmLoP.mp3',
    '/assets/AudioClips/ZUkltYuIoP.mp3',
    '/assets/AudioClips/pOkouUrEsD.mp3',
    '/assets/AudioClips/ZxcVbnmAqs.mp3',
    '/assets/AudioClips/WerTyuIoPz.mp3',
    '/assets/AudioClips/LkjHgfDsAx.mp3',
    '/assets/AudioClips/QweOlUuIop.mp3',
    '/assets/AudioClips/pOiuytReWq.mp3',
    '/assets/AudioClips/vBnmQwertY.mp3',
    '/assets/AudioClips/ZxcVbnmAsd.mp3',
    '/assets/AudioClips/gHjklpoiUt.mp3',
    '/assets/AudioClips/asdFghjklz.mp3',
    '/assets/AudioClips/bNmAsdfghJ.mp3',
    '/assets/AudioClips/poiUytReWs.mp3',
    '/assets/AudioClips/XwCvBnMlKj.mp3',
    '/assets/AudioClips/RfDsGhJkLm.mp3',
    '/assets/AudioClips/ZbVnMqWsEr.mp3',
    '/assets/AudioClips/JtYuIqWpAs.mp3',
    '/assets/AudioClips/KjNmLkIuHj.mp3',
    '/assets/AudioClips/DgThKpFsXd.mp3',
    '/assets/AudioClips/CbVmNkLjMh.mp3',
    '/assets/AudioClips/RvBnMkLpQw.mp3',
    '/assets/AudioClips/ZxVbNkLjHg.mp3',
    '/assets/AudioClips/TsWqErYhUj.mp3',
    '/assets/AudioClips/BnMlKjHgFv.mp3',
    '/assets/AudioClips/GdHsKfJlMq.mp3',
    '/assets/AudioClips/YnTgHmJbFs.mp3',
    '/assets/AudioClips/WpAsDfGhJk.mp3',
    '/assets/AudioClips/MnBhFgJkLp.mp3',
    '/assets/AudioClips/QwErTyUqWi.mp3',]); */

      const [quizStarted, setQuizStarted] = useState(false);
      const [questions, setQuestions] = useState([]);
      const [userAnswers, setUserAnswers] = useState([]);
      const [currentIndex, setCurrentIndex] = useState(0);
      const [score, setScore] = useState(0);
      const [showScore, setShowScore] = useState(false);
      const [timer, setTimer] = useState([]);
      const [startTime, setStartTime] = useState(0);
  
      const [currentAudio, setCurrentAudio] = useState('/assets/AudioClips/aHkLpZsYtR.mp3');
  
//Get Audiodata from Backend
const fetchQuizData = async () => {
  try {
       const response = await server.get(`/Audio`);
       const {audiolink, moviename, question1, answere1, question2, answere2, question3, answere3} = response.data;
       
       setCurrentAudio(audiolink);
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
            {currentAudio && (
              <ReactAudioPlayer 
              src={currentAudio} 
              controls />
            )}
            <div>
              Examplequestion
            </div>
          </div>

          
        );
      };
      
      export default AudioPlayer;

