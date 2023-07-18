import {Card, CardContent, Grid, styled, useTheme, Tooltip, FormControl, Select, MenuItem } from '@mui/material';
import {Fragment, useState} from 'react';
import RadarChart from './shared/Radar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LevelSystem from './shared/LevelSystem';


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
    const [selectedOptions, setSelectedOptions] = useState({
        multipleChoice: 'genre',
        audioQuiz: 'genre',
        videoQuiz: 'genre',
    });
    const userId = 0;

    const handleOptionChange = (event, chartType) => {
        const selectedValue = event.target.value;
        setSelectedOptions((prevOptions) => ({
            ...prevOptions,
            [chartType]: selectedValue,
        }));
    };

    const multipleChoiceStatsEndpoint = `multipleChoice`;
    const audioQuizStatsEndpoint = `audioQuiz`;
    const videoQuizStatsEndpoint = `videoQuiz`;

    return (
        <Fragment>
            <ContentBox className="analytics" justifyContent="center">
                <Grid container spacing={3}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Card sx={{px: 3, py: 2, mb: 3, height: '100%'}}>
                            <Grid
                                container
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                height="100%"
                                >

                                <TitleWrapper>
                                    <Title>Your current Level</Title>
                                    <Tooltip title="Your Current Level Shows your progress in the exams you have taken. Your correct answers and the time taken are used for the calculation. There are six levels: Level 0 represents a new entry into the world of film and Level 5 represents absolute expertise in all areas of film and series.">
                                        <SubTitle>Level 2 - Junior Light Operator</SubTitle>
                                    </Tooltip>
                                </TitleWrapper>
                                     <LevelSystem />
                                <TitleWrapper>
                                    <Title>{capitalizeAndSpace(multipleChoiceStatsEndpoint)} Performance</Title>
                                </TitleWrapper>

                                <Grid item sx={{ width: '100%' }}>
                                    <Card>
                                        <CardContent>
                                            <FormControl>
                                                <Select
                                                    labelId="chart-option-label-mc"
                                                    id="chart-option-mc"
                                                    value={selectedOptions.multipleChoice}
                                                    onChange={(event) => handleOptionChange(event, 'multipleChoice')}
                                                    IconComponent={ExpandMoreIcon}
                                                >
                                                    <MenuItem value="genre">Genre</MenuItem>
                                                    <MenuItem value="movie">Top 10 Movies</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <RadarChart
                                                height="300px"
                                                color={[
                                                    palette.primary.dark,
                                                    palette.primary.main,
                                                    palette.primary.light,
                                                ]}
                                                userId={userId}
                                                statsEndpoint={`${multipleChoiceStatsEndpoint}/${selectedOptions.multipleChoice}`}
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <TitleWrapper>
                                    <Title>{capitalizeAndSpace(audioQuizStatsEndpoint)} Performance</Title>
                                </TitleWrapper>

                                <Grid item sx={{ width: '100%' }}>
                                    <Card>
                                        <CardContent>
                                            <FormControl>
                                                <Select
                                                    labelId="chart-option-label-aq"
                                                    id="chart-option-aq"
                                                    value={selectedOptions.audioQuiz}
                                                    onChange={(event) => handleOptionChange(event, 'audioQuiz')}
                                                    IconComponent={ExpandMoreIcon}
                                                >
                                                    <MenuItem value="genre">Genre</MenuItem>
                                                    <MenuItem value="movie">Top 10 Movies</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <RadarChart
                                                height="300px"
                                                color={[
                                                    palette.primary.dark,
                                                    palette.primary.main,
                                                    palette.primary.light,
                                                ]}
                                                userId={userId}
                                                statsEndpoint={`${audioQuizStatsEndpoint}/${selectedOptions.audioQuiz}`}
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <TitleWrapper>
                                    <Title>{capitalizeAndSpace(videoQuizStatsEndpoint)} Performance</Title>
                                </TitleWrapper>

                                <Grid item sx={{ width: '100%' }}>
                                    <Card>
                                        <CardContent>
                                            <FormControl>
                                                <Select
                                                    labelId="chart-option-label-vq"
                                                    id="chart-option-vq"
                                                    value={selectedOptions.videoQuiz}
                                                    onChange={(event) => handleOptionChange(event, 'videoQuiz')}
                                                    IconComponent={ExpandMoreIcon}
                                                >
                                                    <MenuItem value="genre">Genre</MenuItem>
                                                    <MenuItem value="movie">Top 10 Movies</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <RadarChart
                                                height="300px"
                                                color={[
                                                    palette.primary.dark,
                                                    palette.primary.main,
                                                    palette.primary.light,
                                                ]}
                                                userId={userId}
                                                statsEndpoint={`${videoQuizStatsEndpoint}/${selectedOptions.videoQuiz}`}
                                            />
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
