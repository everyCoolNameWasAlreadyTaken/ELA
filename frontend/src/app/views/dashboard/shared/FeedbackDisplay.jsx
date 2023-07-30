import React from 'react';
import {Card, CardContent, Typography, styled} from '@mui/material';

const StyledCard = styled(Card)(({theme}) => ({
    width: '1000px',
    margin: '20px',
    padding: '20px',
    boxShadow: theme.shadows[5],
    whiteSpace: 'pre-wrap',
}));

const Text = styled('p')({
    fontSize: '1.2rem',
});

const FeedbackDisplay = ({feedbackData}) => {

    return (
        <StyledCard>
            <CardContent>
                <Typography variant="h4" component="h2" gutterBottom>
                    Your AI Feedback
                </Typography>
                <Text>
                    {feedbackData}
                </Text>
            </CardContent>
        </StyledCard>
    );
};

export default FeedbackDisplay;
