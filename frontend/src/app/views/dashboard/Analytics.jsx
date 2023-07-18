import {Card, CardContent, Grid, styled, useTheme, FormControl, Select, MenuItem } from '@mui/material';
import {Fragment, useState} from 'react';
import RadarChart from './shared/Radar';
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
                <Grid container spacing={2}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <Card sx={{ px: 3, py: 2, mb: 3, height: '100%' }}>
                            <Grid
                                container
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                height="100%"
                            >
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
