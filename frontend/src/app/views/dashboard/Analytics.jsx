import {Card, CardContent, Grid, styled, useTheme, FormControl, Select, MenuItem} from '@mui/material';
import {Fragment, useState} from 'react';
import RadarChart from './shared/charts/Radar';
import StackedChart from "./shared/charts/StackedChart";
import Doughnut from "./shared/charts/Doughnut";
import ComparisonChart from "./shared/charts/ComparisonChart";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
    alignSelf: 'center',
    display: 'flex',
}));

const TitleWrapper = styled('div')(({theme}) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
}));

const TitleWrapperSolid = styled('div')(({theme}) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const capitalizeAndSpace = (text) => {
    return text.replace(/([A-Z])/g, ' $1').trim();
};

const Analytics = () => {
    const {palette} = useTheme();
    const [selectedOptionsItemTypse, setSelectedOptionsItemTypse] = useState({
        multipleChoice: 'genre',
        audioQuiz: 'genre',
        videoQuiz: 'genre',
    });
    const [selectedOptionsNrPerc, setSelectedOptionsNrPerc] = useState('numbers');
    const userId = 0;

    const handleItemTypeChange = (event, chartType) => {
        const selectedValue = event.target.value;
        setSelectedOptionsItemTypse((prevOptions) => ({
            ...prevOptions,
            [chartType]: selectedValue,
        }));
    };

    const handleNumberPercentageChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOptionsNrPerc(selectedValue);
    };

    const multipleChoiceStatsEndpoint = `multipleChoice`;
    const audioQuizStatsEndpoint = `audioQuiz`;
    const videoQuizStatsEndpoint = `videoQuiz`;
    const themeStatsEndpoint = `time`;
    const quizPercentage = `percentage`;
    const comparison = `itemTypes`;

    return (
        <Fragment>
            <ContentBox className="analytics" justifyContent="center">
                <Grid container spacing={3}>

                    <Grid item xs={12}>
                        <Card sx={{px: 3, py: 2, mb: 3, height: '100%'}}>
                            <CardContent>
                                <TitleWrapperSolid>
                                    <Title>Your Right Answer Percentage</Title>
                                </TitleWrapperSolid>
                                <StackedChart height="300px"
                                              color={[
                                                  palette.primary.dark,
                                                  palette.primary.main,
                                                  palette.primary.light,
                                                  palette.primary.contrastText,
                                              ]}
                                              userId={userId}
                                              statsEndpoint={`${themeStatsEndpoint}`}/>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <TitleWrapperSolid>
                                    <Title>Your Taken Quizzes</Title>
                                </TitleWrapperSolid>
                                <Doughnut
                                    height="300px"
                                    color={[
                                        palette.primary.dark,
                                        palette.primary.main,
                                        palette.primary.light,
                                    ]}
                                    userId={userId}
                                    statsEndpoint={`${quizPercentage}`}/>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <TitleWrapper>
                                    <div style={{flex: 1}}>
                                        <FormControl>
                                            <Select
                                                labelId="chart-option-label-mc"
                                                id="chart-option-mc"
                                                value={selectedOptionsNrPerc}
                                                onChange={handleNumberPercentageChange}
                                                IconComponent={ExpandMoreIcon}
                                            >
                                                <MenuItem value="numbers">Numbers</MenuItem>
                                                <MenuItem value="percentages">Percentages</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div style={{flex: 1, textAlign: 'right'}}>
                                        <Title>Your Overall Quizzes Stats</Title>
                                    </div>
                                    <div style={{flex: 1}}/>
                                </TitleWrapper>
                                <ComparisonChart
                                    height="300px"
                                    color={[
                                        palette.primary.dark,
                                        palette.primary.main,
                                        palette.primary.light,
                                    ]}
                                    userId={userId}
                                    statsEndpoint={`${comparison}/${selectedOptionsNrPerc}`}/>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <TitleWrapper>
                                    <div style={{flex: 1}}>
                                        <FormControl>
                                            <Select
                                                labelId="chart-option-label-mc"
                                                id="chart-option-mc"
                                                value={selectedOptionsItemTypse.multipleChoice}
                                                onChange={(event) => handleItemTypeChange(event, 'multipleChoice')}
                                                IconComponent={ExpandMoreIcon}
                                            >
                                                <MenuItem value="genre">Genre</MenuItem>
                                                <MenuItem value="movie">Top 10 Movies</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div style={{flex: 1, textAlign: 'right'}}>
                                        <Title>{capitalizeAndSpace(multipleChoiceStatsEndpoint)} Performance</Title>
                                    </div>
                                    <div style={{flex: 1}}/>
                                </TitleWrapper>
                                <RadarChart
                                    height="300px"
                                    color={[
                                        palette.primary.dark,
                                        palette.primary.main,
                                        palette.primary.light,
                                    ]}
                                    userId={userId}
                                    statsEndpoint={`${multipleChoiceStatsEndpoint}/${selectedOptionsItemTypse.multipleChoice}`}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <TitleWrapper>
                                    <div style={{flex: 1}}>
                                        <FormControl>
                                            <Select
                                                labelId="chart-option-label-mc"
                                                id="chart-option-mc"
                                                value={selectedOptionsItemTypse.audioQuiz}
                                                onChange={(event) => handleItemTypeChange(event, 'audioQuiz')}
                                                IconComponent={ExpandMoreIcon}
                                            >
                                                <MenuItem value="genre">Genre</MenuItem>
                                                <MenuItem value="movie">Top 10 Movies</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div style={{flex: 1, textAlign: 'right'}}>
                                        <Title>{capitalizeAndSpace(audioQuizStatsEndpoint)} Performance</Title>
                                    </div>
                                    <div style={{flex: 1}}/>
                                </TitleWrapper>
                                <RadarChart
                                    height="300px"
                                    color={[
                                        palette.primary.dark,
                                        palette.primary.main,
                                        palette.primary.light,
                                    ]}
                                    userId={userId}
                                    statsEndpoint={`${audioQuizStatsEndpoint}/${selectedOptionsItemTypse.audioQuiz}`}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <TitleWrapper>
                                    <div style={{flex: 1}}>
                                        <FormControl>
                                            <Select
                                                labelId="chart-option-label-mc"
                                                id="chart-option-mc"
                                                value={selectedOptionsItemTypse.videoQuiz}
                                                onChange={(event) => handleItemTypeChange(event, 'videoQuiz')}
                                                IconComponent={ExpandMoreIcon}
                                            >
                                                <MenuItem value="genre">Genre</MenuItem>
                                                <MenuItem value="movie">Top 10 Movies</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div style={{flex: 1, textAlign: 'right'}}>
                                        <Title>{capitalizeAndSpace(videoQuizStatsEndpoint)} Performance</Title>
                                    </div>
                                    <div style={{flex: 1}}/>
                                </TitleWrapper>
                                <RadarChart
                                    height="300px"
                                    color={[
                                        palette.primary.dark,
                                        palette.primary.main,
                                        palette.primary.light,
                                    ]}
                                    userId={userId}
                                    statsEndpoint={`${videoQuizStatsEndpoint}/${selectedOptionsItemTypse.videoQuiz}`}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </ContentBox>
        </Fragment>
    );
};

export default Analytics;
