import {
  Box,
  Card,
  styled,
} from '@mui/material';
import MultipleChoice from './MultipleChoice';

const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}));


const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));




const SingleChoiceRotation = () => {

  return (
    <>
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <CardHeader>
        <Title>Single Choice Movie Quiz</Title>
      </CardHeader>
      <CardHeader>
      <SubTitle>Select one out of five possible answers. To submit your answer, press the Button on the right.</SubTitle>
      </CardHeader>


    </Card>
      <Box overflow="auto">
          <MultipleChoice />
      </Box>
      </>
  );
};



export default SingleChoiceRotation;
