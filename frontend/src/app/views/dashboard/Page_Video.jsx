import {Box, Card, styled} from '@mui/material';

import VideoPlayer from "./shared/VideoPlayer";

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

const PageVideo = () => {
    return (

        <ContentBox>
            <Card elevation={3} sx={{pt: '20px', mb: 3}}>
                <CardHeader>
                    <Title>Trailer Quiz</Title>
                    <SubTitle>You will see a short clip from a Movie Trailer. Answer given questions regarding the shown movie in the clip. 
                        </SubTitle>
                </CardHeader>
            </Card>
            <Box overflow="auto" justifyContent="center">
                <VideoPlayer/>
            </Box>
        </ContentBox>

    );
};

export default PageVideo;
