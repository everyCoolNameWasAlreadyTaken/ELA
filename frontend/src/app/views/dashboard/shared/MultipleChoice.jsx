import {Box, Card, FormControlLabel, Icon, IconButton, Radio, RadioGroup, styled, Tooltip} from '@mui/material';
import {useEffect, useState} from 'react';

const CardRoot = styled(Card)(({theme}) => ({
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '24px',
    padding: '24px !important',
    [theme.breakpoints.down('sm')]: {
        paddingLeft: '16px !important',
    },
}));

const Question = styled('p')(({theme}) => ({
    marginTop: '5px',
    paddingTop: '10px',
    paddingBottom: '10px',
    fontSize: '1rem',
    fontWeight: '50',
    color: theme.palette.text.primary,
}));

const Answers = styled(RadioGroup)(({theme}) => ({
    fontSize: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: '10px',
}));

const AnswerOption = styled(FormControlLabel)(({theme}) => ({
    marginBottom: '10px',
    marginLeft: '12px',
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
}));

const QuizStatusBox = styled(Box)(({theme}) => ({
    position: 'absolute',
    top: '2px',
    left: '2px',
    padding: '8px',
    background: theme.palette.primary.main,
    color: '#fff',
    borderRadius: '4px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    zIndex: 1, // Add this line to ensure visibility
}));

const ContinueButton = styled(IconButton)(({theme}) => ({
    width: '40px',
    height: '40px',
    display: 'flex',
    overflow: 'hidden',
    borderRadius: '300px',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '2%',
    right: '2%',
    zIndex: 1, // Add this line to ensure visibility
}));

const MultipleChoice = () => {
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    useEffect(() => {
        fetch('/quiz')
            .then((response) => response.json())
            .then((data) => setQuestions(data))
            .catch((error) => console.error('ERROR', error));
    }, []);

    const handleAnswerSelection = (event) => {
        const selectedAnswer = event.target.value;
        setUserAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[currentIndex] = selectedAnswer;
            return updatedAnswers;
        });
    };

    const handleNextQuestion = () => {
        if (questions[currentIndex].correctIndex === questions[currentIndex].answers.indexOf(userAnswers[currentIndex])) {
            setScore(score + 1);
        }
        const nextIndex = currentIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentIndex(nextIndex);
        } else {
            setShowScore(true);
        }
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
            })
            .catch((error) => console.error('ERROR', error));
    };

    const currentQuestion = questions[currentIndex];

    return (
        <CardRoot>
            {showScore ? (
                <Box position="relative">
                    <p>Score: {score}/{questions.length}</p>
                    {questions.map((question, index) => (
                        <Card key={index}>
                            <Question>{question.question}</Question>
                            <p>Correct Answer: {question.answers[question.correctIndex]}</p>
                            <p>Your Answer: {userAnswers[index]}</p>
                        </Card>
                    ))}
                    <ContinueButton onClick={reload}>
                        <Icon color="primary">replay</Icon>
                    </ContinueButton>
                </Box>
            ) : (
                <>
                    <Box position="relative">
                        <Question>{currentQuestion?.question}</Question>
                        <QuizStatusBox>
                            {`${currentIndex + 1}/${questions.length}`}
                        </QuizStatusBox>
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
                        <Tooltip title="Continue" placement="top">
                            <ContinueButton onClick={handleNextQuestion} disabled={!userAnswers[currentIndex]}>
                                <Icon color="primary">arrow_right_alt</Icon>
                            </ContinueButton>
                        </Tooltip>
                    </Box>
                </>
            )}
        </CardRoot>
    );
};

export default MultipleChoice;
