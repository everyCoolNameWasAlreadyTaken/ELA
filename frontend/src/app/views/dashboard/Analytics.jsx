import {Card, CardContent, Grid, styled, useTheme} from '@mui/material';
import {Fragment, useState} from 'react';
import RadarChart from './shared/Radar';


const ContentBox = styled('div')(({theme}) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {margin: '16px'},
}));

const Title = styled('span')(() => ({
    margin: '10px',
    fontSize: '1rem',
    fontWeight: '500',
    marginRight: '.5rem',
    textTransform: 'capitalize',
}));

const SubTitle = styled('span')(({theme}) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
}));

const TitleWrapper = styled('div')(({theme}) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
}));

const capitalizeAndSpace = (text) => {
    return text.replace(/([A-Z])/g, ' $1').trim();
};

const Analytics = () => {
    const {palette} = useTheme();
    const [selectedOption, setSelectedOption] = useState('genre');
    const userId = 0;

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const multipleChoiceStatsEndpoint = `multipleChoice`;
    const audioQuizStatsEndpoint = `audioQuiz`;
    const videoQuizStatsEndpoint = `videoQuiz`;

    return (
        <Fragment>
            <ContentBox className="analytics" justifyContent="center">
                <Grid container spacing={2}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <Card sx={{px: 3, py: 2, mb: 3, height: '100%'}}>
                            <Grid
                                container
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                height="100%"
                            >
                                <TitleWrapper>
                                    <Title>{capitalizeAndSpace(multipleChoiceStatsEndpoint)} Performance</Title>
                                    <SubTitle>Genres</SubTitle>
                                </TitleWrapper>

                                <Grid item sx={{width: '100%'}}>
                                    <Card>
                                        <CardContent>
                                            <RadarChart
                                                height="300px"
                                                color={[
                                                    palette.primary.dark,
                                                    palette.primary.main,
                                                    palette.primary.light,
                                                ]}
                                                userId={userId}
                                                statsEndpoint={`${multipleChoiceStatsEndpoint}/${selectedOption}`}
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <TitleWrapper>
                                    <Title>{capitalizeAndSpace(audioQuizStatsEndpoint)} Performance</Title>
                                    <SubTitle>Genres</SubTitle>
                                </TitleWrapper>

                                <Grid item sx={{width: '100%'}}>
                                    <Card>
                                        <CardContent>
                                            <RadarChart
                                                height="300px"
                                                color={[
                                                    palette.primary.dark,
                                                    palette.primary.main,
                                                    palette.primary.light,
                                                ]}
                                                userId={userId}
                                                statsEndpoint={`${audioQuizStatsEndpoint}/${selectedOption}`}/>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <TitleWrapper>
                                    <Title>{capitalizeAndSpace(videoQuizStatsEndpoint)} Performance</Title>
                                    <SubTitle>Genres</SubTitle>
                                </TitleWrapper>

                                <Grid item sx={{width: '100%'}}>
                                    <Card>
                                        <CardContent>
                                            <RadarChart
                                                height="300px"
                                                color={[
                                                    palette.primary.dark,
                                                    palette.primary.main,
                                                    palette.primary.light,
                                                ]}
                                                userId={userId}
                                                statsEndpoint={`${videoQuizStatsEndpoint}/${selectedOption}`}/>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </ContentBox>
        </Fragment>
    );
};

export default Analytics;
