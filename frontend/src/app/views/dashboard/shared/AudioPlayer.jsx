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

import React, {useState, useRef, useEffect} from 'react';
import ReactAudioPlayer from 'react-audio-player';
import server from "../../../../axios/axios";
import {compareTwoStrings} from 'string-similarity';


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


const AudioPlayer = () => {

    const [quizStarted, setQuizStarted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [timer, setTimer] = useState(0);

    const [clip_address, setClipAddress] = useState('');
    const [audioName, setAudioName] = useState('');
    const [questions, setQuestions] = useState([]);
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [correctanswers, setAnswers] = useState([]);
    const inputRef = useRef('');
    const timerRef = useRef();
    const userId = 0;

    const fetchAudioData = async () => {
        try {
            const response = await server.get(`/audio`);
            const audioData = response.data;
            console.log("Geladene Daten: ", audioData);
            console.log("Audiodata: ", audioData.questions[0]);
            setAudioName(audioData.movie_name);
            setClipAddress(audioData.clip_address);
            setQuestions(audioData.questions);
            setGenre(audioData.genre);
            setYear(audioData.year.toString());

            var answers = audioData.questions.map(function (question) {
                return question.answer;
            });
            setAnswers(answers);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const startTimer = () => {
        timerRef.current = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 1000);
    };

    useEffect(() => {
        if (quizStarted && currentIndex === 0) {
            startTimer();
        }
        return () => {
            stopTimer();
        };
    }, [quizStarted, currentIndex]);

    const stopTimer = () => {
        clearInterval(timerRef.current);
    };

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

    function handleUserInputErrors(userInput, correctAnswers) {
        var similarityThreshold = 1;

        if (correctAnswers.length > 10) {
            similarityThreshold = 0.3;
        } else if (correctAnswers.length > 5) {
            similarityThreshold = 0.4;
        } else {
            similarityThreshold = 0.5;
        }

        if (containsOnlyNumbers(correctAnswers)) {
            similarityThreshold = 1;
        }

          const similarity = compareTwoStrings(userInput, correctAnswers);
          var UserisCorrect = false;
          if (similarity >= similarityThreshold) {
            UserisCorrect = true;
          }else{
            UserisCorrect = false;}
        return {UserisCorrect, similarity};
      }


    const handleNextQuestion = () => {
        if (inputRef.current) {
            inputRef.current.value = "";
        }

        const {UserisCorrect, similarity}  = handleUserInputErrors(userAnswers[currentIndex].toString(), correctanswers[currentIndex].toString());

        if (UserisCorrect) {
            setScore(score + 1);
            console.log("Die Antwort ist korrekt!");
            console.log("answerscore", similarity);
          } else {
            console.log("Die Antwort ist falsch!");
            console.log("answerscore", similarity);
          }
        const nextIndex = currentIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentIndex(nextIndex);
        } else {
            stopTimer();
            setShowScore(true);
            submitUserAnswers(UserisCorrect);
        }
    };

    function makeTextColourful(similarity) {
        var textStyle = 'red';
        if (similarity.similarity==1){
         textStyle = 'green';}
            else if (similarity.similarity>0){
                 textStyle = 'orange';
            } else{
                 textStyle = 'red';}
          return (textStyle);}


    const submitUserAnswers = () => {
        const answerData = {
            itemType: "AudioQuiz",
            data: {
                date: new Date().toISOString(),
                totalQuestions: questions.length,
                rightAnswers: score,
                wrongAnswers: (questions.length - score),
                timeTaken: timer,
                questions: questions.map((question, index) => ({
                    isCorrect: handleUserInputErrors(userAnswers[index].toString(), correctanswers[index].toString()).UserisCorrect,
                    title: audioName,
                    year: year,
                    genre: genre,
                }))
            }
        };
        console.log(answerData);
        server.post(`/users/${userId}/quiz/answers`, answerData)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error sending answer data:', error);
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
                                            <GivenAnswer style={{ color: makeTextColourful(handleUserInputErrors(userAnswers[index],correctanswers[index]))
                                                 }}>
                                                Your Answer: {userAnswers[index]}
                                            </GivenAnswer>
                                        </ResultBox>
                                    ))}
                                </ContentBox>
                                <TimeTaken>{((timer/60)).toFixed(1)} minutes</TimeTaken>
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
                                        <ReactAudioPlayer
                                            src={clip_address}
                                            controls/>
                                    </ViewAudio>
                                    <Question>{currentQuestion?.question}
                                    </Question>
                                    <Answers>
                                        Ihre Antwort:
                                        <input type="text" value={userAnswers[currentIndex + 1]}
                                               onChange={handleUserAnsweres} ref={inputRef}/>
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

export default AudioPlayer;

