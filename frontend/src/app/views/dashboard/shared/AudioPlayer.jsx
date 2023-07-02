import {
  Box,
  Card,
  FormControlLabel,
  Icon,
  IconButton,
  Radio,
  RadioGroup,
  styled,
  Tooltip,
  Button,
  Grid
} from '@mui/material';

import React, { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import server from "../../../../axios/axios";


const CardRoot = styled(Card)(({theme}) => ({
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: '24px',
  padding: '24px !important',
  [theme.breakpoints.down('sm')]: {
      paddingLeft: '16px !important',
  },
}));

const ContentBox = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
});

const StartButton = styled(Button)(({theme}) => ({
  alignSelf: 'center',
  background: theme.palette.primary.main,
  color: '#fff',
  borderRadius: '4px',
  fontSize: '1rem',
  fontWeight: 'bold',
  padding: '12px 24px',
  '&:hover': {
      background: theme.palette.primary.dark,
  },
}));

const ResultBox = styled(Box)({
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  width: '100%',
  margin: '2px',
  marginBottom: '5px',
  padding: '2px',
});

const Question = styled('p')(({theme}) => ({
  marginTop: '40px',
  paddingTop: '5px',
  paddingBottom: '5px',
  width: '90%',
  fontSize: '1rem',
  fontWeight: '50',
  color: theme.palette.text.primary,
}));

const QuestionFeedback = styled('p')(({theme}) => ({
  marginTop: '5px',
  paddingTop: '5px',
  paddingBottom: '5px',
  width: '90%',
  fontSize: '1rem',
  fontWeight: '50',
  color: theme.palette.text.primary,
}));

const Answers = styled(RadioGroup)({
  fontSize: '1rem',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '90%',
  marginTop: '5px',
  padding: '10px',
});

const AnswerOption = styled(FormControlLabel)({
  marginBottom: '10px',
  marginLeft: '15px',
  width: '90%',
  '& .MuiFormControlLabel-label': {
      fontSize: '0.9rem',
      marginLeft: '8px',
  },
  '& .MuiSvgIcon-root': {
      fontSize: '1rem',
  },
  '& .MuiRadio-root': {
      width: '1rem',
      height: '1rem',
  },
});

const QuizStatusBox = styled(Box)(({theme}) => ({
  position: 'absolute',
  top: '0px',
  left: '0px',
  padding: '8px',
  background: theme.palette.primary.main,
  color: '#fff',
  borderRadius: '4px',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  zIndex: 1,
}));

const ButtonWrapper = styled('span')(({theme}) => ({
  display: 'flex',
  position: 'absolute',
  top: '280px',
  right: '50px',
  width: '50px',
  height: '50px',
  justifyContent: 'center',
  float: 'right',
  [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
  },
}));

const ButtonWrapperLarge = styled('span')(({theme}) => ({
  display: 'flex',
  position: 'absolute',
  top: '820px',
  right: '50px',
  width: '50px',
  height: '50px',
  justifyContent: 'center',
  float: 'right',
  [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
  },
}));

const ContinueButton = styled(IconButton)({
  margin: '1px',
  alignSelf: 'flex-end',
  height: '40px',
  width: '40px',
  overflow: 'hidden',
  borderRadius: '300px',
  justifyContent: 'center',
});

const CorrectAnswer = styled('p')({
  fontWeight: 'bold',
  margin: '20px',
});

const GivenAnswer = styled('p')(({isCorrect}) => ({
  fontWeight: 'bold',
  margin: '20px',
  color: isCorrect ? 'green' : 'red',
}));

const TimeTaken = styled('p')(({theme}) => ({
  display: 'flex',
  alignSelf: 'flex-start',
  fontWeight: 'bold',
  margin: '5px',
  color: theme.palette.primary.main,
}));


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
  
      const [clip_adress, setCurrentAudio] = useState('/assets/AudioClips/aHkLpZsYtR.mp3');
      const [movie_name, setMovieName] = useState('');

      const userId = 0;
  
//Get Audiodata from Backend
const fetchQuizData = async () => {
  try {
       const response = await server.get(`/Audio`);
       const {clip_adress, movie_name, questions} = response.data;
       
       setCurrentAudio(clip_adress);
       setQuestions(questions);
       setMovieName(movie_name);

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
const handleAnswerSelection = (event) => {
  const selectedAnswer = event.target.value;
  setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentIndex] = selectedAnswer;
      return updatedAnswers;
  });
};

const handleNextQuestion = () => {
  const endTime = Date.now();
  const timeTaken = endTime - startTime;
  setTimer((prevTimes) => {
      const updatedTimes = [...prevTimes];
      updatedTimes[currentIndex] = timeTaken;
      return updatedTimes;
  })
  const isCorrect = questions[currentIndex].correctIndex === questions[currentIndex].answers.indexOf(userAnswers[currentIndex])
  if (isCorrect) {
      setScore(score + 1);
  }
  const nextIndex = currentIndex + 1;
  if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
  } else {
      setShowScore(true);
  }
};

const submitUserAnswers = () => {
  const answerData = questions.map((question, index) => ({
      qid: index,
      isCorrect: question.correctIndex === question.answers.indexOf(userAnswers[index]),
      timeTaken: Date.now() - startTime,
  }));

  server.post(`/users/${userId}/answers`, answerData)
      .then(response => {
          console.log('Answer data submitted successfully');
      })
      .catch(error => {
          console.error('Error submitting answer data:', error);
      });
};

const reload = () => {
  fetch('/quiz')
      .then((response) => response.json())
      .then((data) => {
          setQuestions(data);
          setUserAnswers([]);
          setCurrentIndex(0);
          setScore(0);
          setShowScore(false);
          setQuizStarted(false);
      })
      .catch((error) => console.error('ERROR', error));
};

const currentQuestion = questions[currentIndex];

return (
  <CardRoot>
  <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={8} lg={9}>
          {!quizStarted ? (
              <>
                  <ContentBox>
                      <StartButton onClick={handleStartQuiz}>Start Quiz</StartButton>
                  </ContentBox>
              </>
          ) : showScore ? (
              <>
                  <ContentBox>
                      <p>Score: {score}/{questions.length}</p>
                      {questions.map((question, index) => (
                          <ResultBox key={index}>
                              <QuestionFeedback>{question.question}</QuestionFeedback>
                              <CorrectAnswer>
                                  Correct
                                  Answer: {question.answers[questions[index].correctIndex]}</CorrectAnswer>
                              <GivenAnswer
                                  isCorrect={questions[index].correctIndex === questions[index].answers.indexOf(userAnswers[index])}>
                                  Your Answer: {userAnswers[index]}
                              </GivenAnswer>
                          </ResultBox>
                      ))}
                  </ContentBox>
                  <TimeTaken>Time taken: {Math.floor(timer / 1000)} seconds</TimeTaken>
                  <Tooltip title="New Quiz" placement="top">
                      <ButtonWrapperLarge>
                          <ContinueButton onClick={reload}>
                              <Icon color="primary">replay</Icon>
                          </ContinueButton>
                      </ButtonWrapperLarge>
                  </Tooltip>
              </>
          ) : (
              <>
                  <ContentBox>
                  {clip_adress && (
                  <ReactAudioPlayer 
                    src={clip_adress} 
                      controls />
                      )}
                      <QuizStatusBox>
                          {`${currentIndex + 1}/${questions.length}`}
                      </QuizStatusBox>
                      <Question>{currentQuestion?.question}</Question>
                      <Answers value={userAnswers[currentIndex] || ''} onChange={handleAnswerSelection}>
                          {currentQuestion?.answers.map((choice, index) => (
                              <AnswerOption
                                  key={index}
                                  value={choice}
                                  control={<Radio color="primary"/>}
                                  label={choice}
                              />
                          ))}
                      </Answers>
                  </ContentBox>
                  <Tooltip title="Continue" placement="top">
                      <ButtonWrapper>
                          <ContinueButton onClick={handleNextQuestion}
                                          disabled={!userAnswers[currentIndex]}>
                              <Icon
                                  color={userAnswers[currentIndex] ? "primary" : "disabled"}>arrow_right_alt</Icon>
                          </ContinueButton>
                      </ButtonWrapper>
                  </Tooltip>
              </>
          )}
      </Grid>
  </Grid>
</CardRoot>

          
        );
      };
      
      export default AudioPlayer;

