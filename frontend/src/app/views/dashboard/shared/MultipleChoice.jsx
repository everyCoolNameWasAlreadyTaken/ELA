import {
    Box,
    Card,
    CardContent,
    FormControlLabel,
    Radio,
    RadioGroup,
    styled,
    Button,
    Typography,
    useTheme
} from '@mui/material';
import {useState, useRef, useEffect} from 'react';
import server from "../../../../axios/axios";
import Speed from "../shared/charts/Speed";
import Score from "../shared/charts/Score";

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
    height: '500px',
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

const QuestionTitle = styled(Typography)(({theme}) => ({
    marginTop: '5px',
    fontSize: '2rem',
    textAlign: 'center',
    fontWeight: 'bold',
    zIndex: 1,
    color: theme.palette.text.primary,
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
    padding: '8px',
    margin: '4px',
    background: theme.palette.primary.main,
    color: '#fff',
    borderRadius: '7px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    zIndex: 1,
}));

const ContinueButtonWrapper = styled('div')(({theme}) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: theme.spacing(2),
}));

const ContinueButton = styled(Button)(({theme, disabled}) => ({
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
        if (quizStarted && currentIndex === 0) {
            startTimer();
        }
    }, [quizStarted, currentIndex]);

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
        <ContentBox>
            {!quizStarted ? (
                <>
                    <StartButton onClick={handleStartQuiz}>Start Quiz</StartButton>
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
                                    Correct
                                    Answer: {question.answers[questions[index].correctIndex]}</CorrectAnswer>
                                <GivenAnswer
                                    isCorrect={questions[index].correctIndex === questions[index].answers.indexOf(userAnswers[index])}>
                                    Your Answer: {userAnswers[index]}
                                </GivenAnswer>
                            </CardContent>
                        </ResultCard>
                    ))}
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
                            {currentQuestion && (
                                <QuestionTitle>
                                    {currentQuestion.title}
                                </QuestionTitle>
                            )}
                            <QuestionContent>
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

export default MultipleChoice;
