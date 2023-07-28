import {
  Box,
  Card,
  styled,
  
} from '@mui/material';
import WikipediaQuiz from './WikiText';

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
const ViewVideo = styled(Box)(() => ({
  marginTop: '30px',
  marginLeft: '30%',
  marginBottom: '50px'
}));



const ClozeText = () => {

  return (
    <> 
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <CardHeader>
        <Title>Cloze Text</Title>
      </CardHeader>
      <CardHeader>
        <SubTitle> You get a short text about movies. But some words are missing. Fill in the missing words in the blank spaces.</SubTitle>
      </CardHeader>
      </Card>
      <Box overflow="auto">
        <WikipediaQuiz/>
        </Box>
        </>
  );
};

export default ClozeText;
