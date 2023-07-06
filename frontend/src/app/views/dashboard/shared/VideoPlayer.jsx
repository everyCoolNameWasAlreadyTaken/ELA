import {
    Box,
    Card,
    Icon,
    IconButton,
    styled,
    Tooltip,
    Button,
    Grid
} from '@mui/material';

import React, {useState, useRef} from 'react';
import ReactPlayer from 'react-player';
import server from "../../../../axios/axios";
import { compareTwoStrings } from 'string-similarity';

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
/*     display: 'flex',
  position: 'absolute',
  top: '280px',
  right: '50px',
  width: '50px',
  height: '50px',
  justifyContent: 'center',
  float: 'right', */
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

const ViewAudio = styled(Box)(() => ({
  marginTop: '10%',
}));


const Answers = styled(Box)({
  fontSize: '1rem',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '90%',
  marginTop: '5px',
  padding: '10px',
});


const VideoPlayer = () => {

    const [quizStarted, setQuizStarted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [timer, setTimer] = useState([]);
    const [startTime, setStartTime] = useState(0);

    const [clip_address, setClipAddress] = useState('');

    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [correctanswers, setAnswers] = useState([]);
    const inputRef = useRef('');
    const userId = 0;
    
    const fetchAudioData = async () => {
      try {
          const response = await server.get(`/video`);
          const audioData = response.data;
          console.log("Geladene Daten: ", audioData);
          console.log("Audiodata: ", audioData.questions[0]);
          
          setClipAddress(audioData.clip_address);
          setQuestions(audioData.questions);
          

          var answers = audioData.questions.map(function(question) {
              return question.answer;        
            });
            setAnswers(answers);
            console.log(answers);
          
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
      fetchAudioData();
      startTimer();
  };

  
  const handleUserAnsweres = (event) => {
      const selectedAnswer = event.target.value;
      setUserAnswers((prevAnswers) => {
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[currentIndex] = selectedAnswer;
          return updatedAnswers;
      });
  };
      function containsOnlyNumbers(str) {
        return /^[0-9]+$/.test(str);
      }
    function handleUserInputErrors(userInput, correctAnswers){
        var similarityThreshold =1;

        if (correctAnswers.length>10){
            similarityThreshold = 0.3;
        } else if (correctAnswers.length>5){
            similarityThreshold = 0.4;
        }else {
            similarityThreshold = 0.5;
            }
        
        if (containsOnlyNumbers(correctAnswers)){
            similarityThreshold = 1;
        }

          const similarity = compareTwoStrings(userInput, correctAnswers);
          if (similarity >= similarityThreshold) {
            // Die Antwort wird als korrekt betrachtet
            return true;
          }
        // Keine Übereinstimmung gefunden
        return false;
      }

  const handleNextQuestion = () => {
      const endTime = Date.now();
      const timeTaken = endTime - startTime;
      
          if(inputRef.current){
          inputRef.current.value ="";
          }

      setTimer((prevTimes) => {
          const updatedTimes = [...prevTimes];
          updatedTimes[currentIndex] = timeTaken;
          return updatedTimes;
      })
      const UserisCorrect  = handleUserInputErrors(userAnswers[currentIndex].toString(), correctanswers[currentIndex].toString());
      if (UserisCorrect) {
            setScore(score + 1);
            console.log("Die Antwort ist korrekt!");
          } else {
            console.log("Die Antwort ist falsch!");
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
          isCorrect: question.correctIndex === question.answer.indexOf(userAnswers[index]),
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
                    <ContentBox>
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
                                                Answer: {correctanswers[index]}</CorrectAnswer>
                                            <GivenAnswer
                                                isCorrect={correctanswers[index] === userAnswers[index]}>
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
                                    <QuizStatusBox>
                                        {`${currentIndex + 1}/${questions.length}`}
                                    </QuizStatusBox>
                                    <ViewAudio>
                                    <ReactPlayer
                                      url={clip_address}
                                      controls
                                      width="640px"
                                      height="360px"
                                      />
                                    </ViewAudio>
                                    <Question>{currentQuestion?.question}
                                     </Question>
                                     <Answers>
                                     Ihre Antwort: 
                                    <input type="text" value={userAnswers[currentIndex+1]} onChange={handleUserAnsweres} ref={inputRef}/>
                                    </Answers>
                                
                                <Tooltip title="Continue" placement="top">
                                    <ButtonWrapper>
                                        <ContinueButton onClick={handleNextQuestion}
                                                        disabled={!userAnswers[currentIndex]}>
                                            <Icon
                                                color={userAnswers[currentIndex] ? "primary" : "disabled"}>arrow_right_alt</Icon>
                                        </ContinueButton>
                                    </ButtonWrapper>
                                </Tooltip>
                                </ContentBox>
                            </>
                        )}
                    </ContentBox>
                </Grid>
            </Grid>
        </CardRoot> 
    );
};

export default VideoPlayer;
