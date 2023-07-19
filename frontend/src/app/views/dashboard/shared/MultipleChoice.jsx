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
    Grid,
    Typography,
    useTheme
} from '@mui/material';
import {useState, useRef, useEffect} from 'react';
import server from "../../../../axios/axios";
import Speed from "../shared/charts/Speed";
import Score from "../shared/charts/Score";

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
    marginTop: '10px',
    paddingTop: '10px',
    paddingBottom: '5px',
    width: '90%',
    fontSize: '1rem',
    fontWeight: '50',
    color: theme.palette.text.primary,
}));

const QuestionTitle = styled(Typography)(({theme}) => ({
    marginTop: '50px',
    right: '0px',
    width: '80%',
    height: '20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    zIndex: 1,
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

const SpeedAndScoreContainer = styled(Card)({
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '10px 0',
});

const SpeedContainer = styled(Box)({
    flex: '1 1 45%', // Adjust the flex value to adjust the width of the Speed component
});

const ScoreContainer = styled(Box)({
    flex: '1 1 45%', // Adjust the flex value to adjust the width of the Score component
});

const MultipleChoice = () => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);
    const timerRef = useRef();
    const {palette} = useTheme();

    const userId = 0;

    useEffect(() => {
        if (quizStarted) {
            startTimer();
        } else {
            stopTimer();
        }
    }, [quizStarted]);

    const startTimer = () => {
        timerRef.current = setInterval(() => {
            setTimeTaken((prevTimer) => prevTimer + 1);
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(timerRef.current);
    };

    const fetchQuizData = async () => {
        try {
            const response = await server.get(`/quiz`);
            const Quizdata = response.data;
            console.log(Quizdata)
            setQuestions(Quizdata);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleStartQuiz = () => {
        setQuizStarted(true);
        setTimeTaken(0);
        fetchQuizData();
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
        const isCorrect = questions[currentIndex].correctIndex === questions[currentIndex].answers.indexOf(userAnswers[currentIndex])
        if (isCorrect) {
            setScore(score + 1);
        }
        const nextIndex = currentIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentIndex(nextIndex);
        }
        if (nextIndex === questions.length) {
            stopTimer();
            submitUserAnswers();
            setShowScore(true);
        }
    };

    const submitUserAnswers = () => {
        const answerData = {
            itemType: "MultipleChoice",
            data: {
                date: new Date().toISOString(),
                totalQuestions: questions.length,
                rightAnswers: score,
                wrongAnswers: (questions.length - score),
                timeTaken: timeTaken,
                questions: questions.map((question, index) => ({
                    qid: question.qid,
                    isCorrect: question.correctIndex === question.answers.indexOf(userAnswers[index]),
                    title: question.title,
                    year: question.year,
                    genre: question.genre,
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
        fetchQuizData()
        setUserAnswers([]);
        setCurrentIndex(0);
        setScore(0);
        setShowScore(false);
        setQuizStarted(false);
        setTimeTaken(0);
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

                            <ContentBox>
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
                                {currentQuestion && (
                                    <QuestionTitle>
                                        Movie: {currentQuestion.title}
                                    </QuestionTitle>
                                )}
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

export default MultipleChoice;
