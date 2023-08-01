import {
    Box,
    Card,
    styled,
    Button,
    useTheme,
    CardContent
} from '@mui/material';
import React, {useState, useRef, useEffect} from 'react';
import ReactPlayer from 'react-player';
import server from "../../../../axios/axios";
import {compareTwoStrings} from 'string-similarity';
import Speed from "./charts/Speed";
import Score from "./charts/Score";
import FeedbackDisplay from "./FeedbackDisplay";
import Spinner from "./Spinner";

const ContentBox = styled('div')(({theme}) => ({
    margin: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {margin: '16px'},
}));

const StartButton = styled(Button)(({theme}) => ({
    alignSelf: 'center',
    background: theme.palette.primary.main,
    color: '#fff',
    borderRadius: '100px',
    fontSize: '2rem',
    fontWeight: 'bold',
    padding: '16px 32px',
    '&:hover': {
        background: theme.palette.primary.dark,
    },
}));

const QuestionCard = styled(Card)(({theme}) => ({
    marginBottom: theme.spacing(2),
    height: '630px',
    width: '800px',
    flexDirection: 'column',
    justifyContent: 'center',
}));

const Question = styled('p')(({theme}) => ({
    marginTop: '10px',
    paddingTop: '10px',
    paddingBottom: '5px',
    width: '90%',
    fontSize: '1rem',
    fontWeight: '50',
    color: theme.palette.text.primary,
}));

const QuizStatusBox = styled(Box)(({theme}) => ({
    position: 'absolute',
    padding: '8px',
    margin: '4px',
    background: theme.palette.primary.main,
    color: '#fff',
    borderRadius: '7px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    zIndex: 1,
}));

const QuestionContent = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '55px',
    marginTop: '20px',
    '& .MuiFormControlLabel-root': {
        marginLeft: '0',
    },
});

const QuestionFeedback = styled('p')(({theme}) => ({
    marginTop: '5px',
    paddingTop: '5px',
    paddingBottom: '5px',
    width: '90%',
    fontSize: '1rem',
    fontWeight: '50',
    color: theme.palette.text.primary,
}));

const ContinueButtonWrapper = styled('div')(({theme}) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: theme.spacing(2),
}));

const ContinueButton = styled(Button)(({theme, disabled}) => ({
    margin: '20px',
    alignSelf: 'flex-end',
    height: '55px',
    width: '130px',
    borderRadius: '300px',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.15rem',
    background: disabled ? theme.palette.grey[500] : theme.palette.primary.main,
    color: disabled ? '#fff' : theme.palette.primary.contrastText,
    '&:hover': {
        background: disabled ? theme.palette.grey[500] : theme.palette.primary.dark,
    },
}));

const FeedbackButton = styled(Button)(({theme}) => ({
    margin: '20px',
    alignSelf: 'flex-end',
    height: '55px',
    width: '180px',
    borderRadius: '300px',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.15rem',
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
        background: theme.palette.primary.dark,
    },
}));

const ResultCard = styled(Card)(({theme}) => ({
    marginBottom: theme.spacing(2),
    height: '200px',
    width: '850px',
    flexDirection: 'column',
    justifyContent: 'center',
}));

const CorrectAnswer = styled('p')({
    fontWeight: 'bold',
    margin: '20px',
});

const GivenAnswer = styled('p')(({isCorrect}) => ({
    fontWeight: 'bold',
    margin: '20px',
    color: isCorrect ? 'green' : 'red',
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
    '& input[type="text"]': {
        width: '100%',
        padding: '8px',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '10px',
    },
});

const SpeedAndScoreContainer = styled(Card)({
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '10px 0',
});

const SpeedContainer = styled(Box)({
    flex: '1 1 45%',
});

const ScoreContainer = styled(Box)({
    flex: '1 1 45%',
});


const VideoPlayer = () => {

    const [quizStarted, setQuizStarted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);

    const [clip_address, setClipAddress] = useState('');
    const [audioName, setAudioName] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState(0);
    const timerRef = useRef();

    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [correctanswers, setAnswers] = useState([]);
    const inputRef = useRef('');
    const userId = 0;
    const {palette} = useTheme();
    const [feedbackData, setFeedbackData] = useState('');
    const [feedback, setFeedback] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAudioData = async () => {
        try {
            const response = await server.get(`/video`);
            const videoData = response.data;
            setAudioName(videoData.movie_name);
            setClipAddress(videoData.clip_address);
            setQuestions(videoData.questions);
            setGenre(videoData.genre);
            setYear(videoData.year.toString());

            var answers = videoData.questions.map(function (question) {
                return question.answer;
            });
            setAnswers(answers);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const startTimer = () => {
        timerRef.current = setInterval(() => {
            setTimeTaken((prevTimer) => prevTimer + 1);
        }, 1000);
    };

    useEffect(() => {
        if (quizStarted && currentIndex === 0) {
            startTimer();
        }
    }, [quizStarted, currentIndex]);

    const stopTimer = () => {
        clearInterval(timerRef.current);
    };

    const handleStartQuiz = () => {
        setQuizStarted(true);
        setTimeTaken(0);
        fetchAudioData();
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
        UserisCorrect = similarity >= similarityThreshold;
        return {UserisCorrect, similarity};
    }

    const handleNextQuestion = () => {
        if (inputRef.current) {
            inputRef.current.value = "";
        }

        const {
            UserisCorrect,
            similarity
        } = handleUserInputErrors(userAnswers[currentIndex].toString(), correctanswers[currentIndex].toString());

        if (UserisCorrect) {
            setScore(score + 1);
        } else {
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
        if (similarity.similarity === 1) {
            textStyle = 'green';
        } else if (similarity.similarity > 0) {
            textStyle = 'orange';
        } else {
            textStyle = 'red';
        }
        return (textStyle);
    }

    const submitUserAnswers = () => {
        const answerData = {
            itemType: "VideoQuiz",
            data: {
                date: new Date().toISOString(),
                totalQuestions: questions.length,
                rightAnswers: score,
                wrongAnswers: (questions.length - score),
                timeTaken: timeTaken,
                questions: questions.map((question, index) => ({
                    isCorrect: handleUserInputErrors(userAnswers[index].toString(), correctanswers[index].toString()).UserisCorrect,
                    title: audioName,
                    year: year,
                    genre: genre,
                }))
            }
        };
        server.post(`/users/${userId}/quiz/answers`, answerData)
            .then(response => {
            })
            .catch(error => {
                console.error('Error sending answer data:', error);
            });
    };

    const reload = () => {
        setQuestions([]);
        setUserAnswers([]);
        setCurrentIndex(0);
        setScore(0);
        setShowScore(false);
        setQuizStarted(false);
        setIsLoading(false);
        setFeedback(false);
        setFeedbackData('');
        fetchAudioData();
    };

    const currentQuestion = questions[currentIndex];

    const mappedString = questions
        .map((question, index) => {
            const myAnswer = userAnswers[index] || 'N/A';
            return `Question: """${question.question}""", My Answer: """${myAnswer}""", Correct Answer: """${question.answer}"""`;
        })
        .join('\n');

    const feedbackPrompt = 'I am currently participating in an online quiz about movies, their genre, directors ' +
        'and actors. I just finished an Audio Quiz where I got to listen to a 20 second movie theme sample. ' +
        `The Movie is ${audioName}` + 'This was the result at the end:\n ' + mappedString +
        `\nIt took me ${timeTaken} Minutes to complete the Quiz. Can you give me a short synopsis of the movie and 
        also if I have wrong answers provide a suggestion why I have thought that "My Answer" was true while it was 
        wrong. Can you give the synopsis first and then one paragraph with the suggestion for each question?`;

    const handleFeedbackClick = () => {
        setIsLoading(true);
        setFeedbackData('');
        setFeedback(false);
        setShowScore(false);
        console.log(questions)
        console.log(feedbackPrompt)

        server
            .post(`/users/${userId}/chat`, {content: feedbackPrompt})
            .then((response) => {
                console.log(response.data);
                const responseData = response.data.response;
                setFeedbackData(responseData);
                setFeedback(true);
            })
            .catch((error) => {
                console.error('Error sending answer data:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <ContentBox>
            {!quizStarted ? (
                <>
                    <>
                        <StartButton onClick={handleStartQuiz}>Start Quiz</StartButton>
                    </>
                </>
            ) : showScore ? (
                <>
                    <SpeedAndScoreContainer>
                        <SpeedContainer>
                            <Speed
                                height="280px"
                                color={[
                                    palette.primary.dark,
                                    palette.primary.main,
                                    palette.primary.light,
                                ]}
                                speed={((timeTaken / 60)).toFixed(1)}
                            />
                        </SpeedContainer>
                        <ScoreContainer>
                            <Score
                                height="280px"
                                color={[
                                    palette.primary.dark,
                                    palette.primary.main,
                                    palette.primary.light,
                                ]}
                                score={score}
                                questions={questions.length}
                            />
                        </ScoreContainer>
                    </SpeedAndScoreContainer>
                    {questions.map((question, index) => (
                        <ResultCard>
                            <CardContent key={index}>
                                <QuestionFeedback>{question.question}</QuestionFeedback>
                                <CorrectAnswer>
                                    Correct Answer: {correctanswers[index]}
                                </CorrectAnswer>
                                <GivenAnswer style={{
                                    color: makeTextColourful(handleUserInputErrors(userAnswers[index], correctanswers[index]))
                                }}>
                                    Your Answer: {userAnswers[index]}
                                </GivenAnswer>
                            </CardContent>
                        </ResultCard>
                    ))}
                    <ContinueButtonWrapper>
                        <ContinueButton onClick={reload}>
                            New Quiz
                        </ContinueButton>
                        <FeedbackButton
                            onClick={handleFeedbackClick}
                            variant="contained"
                            color="primary"
                        >Get Feedback</FeedbackButton>
                    </ContinueButtonWrapper>
                </>
            ) : isLoading ? (
                <>
                    <Spinner/>
                </>
            ) : feedback ? (
                <>
                    <FeedbackDisplay feedbackData={feedbackData}/>
                    <ContinueButtonWrapper>
                        <ContinueButton onClick={reload}>
                            New Quiz
                        </ContinueButton>
                    </ContinueButtonWrapper>
                </>
            ) : (
                <>
                    <QuestionCard>
                        <CardContent>
                            <QuizStatusBox>
                                {`${currentIndex + 1}/${questions.length}`}
                            </QuizStatusBox>
                            <QuestionContent>
                                <ViewAudio>
                                    <ReactPlayer
                                        url={clip_address}
                                        controls
                                        width="640px"
                                        height="360px"
                                    />
                                </ViewAudio>
                                <Question>{currentQuestion?.question}</Question>
                                <Answers>
                                    Your Answer:
                                    <input type="text" value={userAnswers[currentIndex + 1]}
                                           onChange={handleUserAnsweres} ref={inputRef}/>
                                </Answers>
                            </QuestionContent>
                        </CardContent>
                    </QuestionCard>
                    <ContinueButtonWrapper>
                        <ContinueButton onClick={handleNextQuestion} disabled={!userAnswers[currentIndex]}>
                            Continue
                        </ContinueButton>
                    </ContinueButtonWrapper>
                </>
            )}
        </ContentBox>
    );
};

export default VideoPlayer;
