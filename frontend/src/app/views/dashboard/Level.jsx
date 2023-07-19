import LevelSystem from './shared/LevelSystem';
import {Card, CardContent, Grid, styled, useTheme, FormControl, Select, MenuItem, Tooltip} from '@mui/material';


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

const SubTitle = styled('span')(({theme}) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
}));

const TitleWrapper = styled('div')(({theme}) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
}));

const Level = () => {

    return (
    <ContentBox>
        <Card>
            <CardContent>
                <TitleWrapper>
                    <Title>Your current Level</Title>
                    <Tooltip title="Your Current Level Shows your progress in the exams you have taken. Your correct answers and the time taken are used for the calculation. There are six levels: Level 0 represents a new entry into the world of film and Level 5 represents absolute expertise in all areas of film and series.">
                        <SubTitle>Level 2 - Junior Light Operator</SubTitle>
                    </Tooltip>
                </TitleWrapper>
                <LevelSystem />
            </CardContent>
        </Card>
    </ContentBox>
    );

};

export default Level;
