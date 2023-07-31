import { Box, Card, styled } from '@mui/material';

import ClozeText from './shared/ClozeText';


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


const Page_Cloze = () => {

  return (
      <ContentBox>
            <Card elevation={3} sx={{pt: '20px', mb: 3}}>
                <CardHeader>
                    <Title>Cloze Text Movie Quiz</Title>
                    <SubTitle>You get a short text about movies. But some words are missing. Fill in the missing words in the blank spaces.</SubTitle>
                </CardHeader>
            </Card>
            <Box overflow="auto" justifyContent="center">
              <ClozeText/>
            </Box>
      </ContentBox>
  );
};

export default Page_Cloze;
