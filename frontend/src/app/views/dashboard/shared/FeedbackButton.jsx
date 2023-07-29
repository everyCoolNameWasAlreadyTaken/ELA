import React from 'react';
import {
    Button, styled,
} from '@mui/material';
import server from "../../../../axios/axios";
import {useUserContext} from "./UserContext";

const StyledButton = styled(Button)(({theme, disabled}) => ({
    alignSelf: 'flex-end',
    height: '55px',
    width: '130px',
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

const FeedbackButton = ({ itemType, timeTaken, questionData }) => {
    const {userId} = useUserContext();
    const handleFeedbackClick = () => {
        const feedbackData = {
            itemType: itemType,
            timeTaken: timeTaken,
            questions: questionData.map((question) => ({
                title: question.title,
                year: question.year,
                RightAnswer: question.correctAnswer,
                YourAnswer: question.userAnswer,
            })),
        };
        console.log(feedbackData);
        server.post(`/users/${userId}/quiz/answers`, feedbackData)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error sending answer data:', error);
            });
    };

    return (
        <StyledButton onClick={handleFeedbackClick} variant="contained" color="primary">
            Get Feedback
        </StyledButton>
    );
};

export default FeedbackButton;
