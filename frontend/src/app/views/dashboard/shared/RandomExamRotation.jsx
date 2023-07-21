import {
  Box,
  Card,
  styled,
  Button,
} from '@mui/material';
import {useState} from 'react';
import TrailerRotation from './TrailerRotation';
import ThemeRotation from './ThemeRotation';


const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
  fontSize: '1.5rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}));




const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.text.secondary,
}));

const StartButton = styled(Button)(({theme}) => ({
  alignSelf: 'center',
  background: theme.palette.primary.main,
  color: '#fff',
  borderRadius: '4px',
  fontSize: '1rem',
  fontWeight: 'bold',
  padding: '12px 24px',
  marginLeft: '24px',
  marginBottom: '24px',
  '&:hover': {
      background: theme.palette.primary.dark,
  },
}));




const RandomExamRotation = () => {
  const [quizStarted, setQuizStarted] = useState(false);



  const handleStartQuiz = () => {
    setQuizStarted(true);
};

  return (
    <>
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }} style={{ backgroundColor: 'rgba(25, 118, 210, 0.62)' }}>
      <CardHeader>
        <Title>Random Exam</Title>
      </CardHeader>
      <CardHeader>
      <SubTitle>This is the random exam. You get random Item types with random questions of various movies. You get timed and your time and score will influnce your ranking.</SubTitle>
      </CardHeader>

    </Card>
    {!quizStarted ? (
                        <>
                        <Card>
                        <CardHeader>
                          <SubTitle elevation={3} sx={{ pt: '20px', mb: 3 }}>If you click on "Start Exam", you will not be able to leave the page, otherwise your exam will be marked as failed. </SubTitle>
                        </CardHeader>
                        <StartButton onClick={handleStartQuiz}>Start Exam</StartButton>
                        </Card>
                        </>
                    ) : (

      <Box overflow="auto">
          {/* TODO: Hier muss noch die Logik zum nacheinander Anzeiger der Itemtypes eingefügt werden*/}
          {/* <TrailerRotation /> */}
          {/* <ThemeRotation /> */}
      </Box>
      )}
      </>
  );
};



export default RandomExamRotation;
