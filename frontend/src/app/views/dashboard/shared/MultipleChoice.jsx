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

const ContentBox = styled(Box)({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
});

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
                <>
                <ContentBox>
                    <p>Score: {score}/{questions.length}</p>
                    {questions.map((question, index) => (
                        <ResultBox key={index}>
                            <QuestionFeedback>{question.question}</QuestionFeedback>
                            <CorrectAnswer>
                                Correct Answer: {question.answers[questions[index].correctIndex]}</CorrectAnswer>
                            <GivenAnswer isCorrect={questions[index].correctIndex === questions[index].answers.indexOf(userAnswers[index])}>
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
                </>) : (
                <>
                    <ContentBox>
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
                                <ContinueButton onClick={handleNextQuestion} disabled={!userAnswers[currentIndex]}>
                                    <Icon
                                        color={userAnswers[currentIndex] ? "primary" : "disabled"}>arrow_right_alt</Icon>
                                </ContinueButton>
                            </ButtonWrapper>
                        </Tooltip>
                </>
            )}
        </CardRoot>
    );
};

export default MultipleChoice;
