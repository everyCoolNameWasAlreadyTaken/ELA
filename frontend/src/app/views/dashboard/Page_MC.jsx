import {Box, Card, Grid, styled} from '@mui/material';
import {Fragment} from 'react';
import MultipleChoice from "./shared/MultipleChoice";

const ContentBox = styled('div')(({theme}) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {margin: '16px'},
}));

const CardHeader = styled(Box)(() => ({
    display: 'flex',
    paddingLeft: '24px',
    paddingRight: '24px',
    marginBottom: '12px',
    alignItems: 'center',
    justifyContent: 'center',
}));

const Title = styled('span')(() => ({
    fontSize: '1.25rem',
    fontWeight: '500',
    textTransform: 'capitalize',
    margin: '5px'
}));


const SubTitle = styled('span')(({theme}) => ({
    fontSize: '1.25rem',
    color: theme.palette.text.secondary,
    margin: '5px'
}));


const Page_MC = () => {

    return (

        <ContentBox>
            <Card elevation={3} sx={{pt: '20px', mb: 3}}>
                <CardHeader>
                    <Title>Single Choice Movie Quiz</Title>
                    <SubTitle>Select one out of five possible answers. To submit your answer, press the Button on the
                        right.</SubTitle>
                </CardHeader>


            </Card>
            <Box overflow="auto" justifyContent="center">
                <MultipleChoice/>
            </Box>
        </ContentBox>

    );
};

export default Page_MC;
