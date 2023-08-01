import {Box, Card, styled} from '@mui/material';
import AudioPlayer from "./shared/AudioPlayer";

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


const Analytics = () => {

    return (

        <ContentBox>
            <Card elevation={3} sx={{pt: '20px', mb: 3}}>
                <CardHeader>
                    <Title>Movie Theme Quiz</Title>
                    <SubTitle>You will hear a short clip from a Movie theme. Answer given questions regarding the played movie in the clip. 
                        corner.</SubTitle>
                </CardHeader>
            </Card>
            <Box overflow="auto" justifyContent="center">
                <AudioPlayer/>
            </Box>
        </ContentBox>

    );
};

export default Analytics;
