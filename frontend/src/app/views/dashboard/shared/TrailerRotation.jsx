import {
  Box,
  Card,
  styled,
  
} from '@mui/material';
import VideoPlayer from './VideoPlayer';

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



const TrailerRotation = () => {

  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <CardHeader>
        <Title>Trailer Rotation</Title>
      </CardHeader>
      <CardHeader>
        <SubTitle> Play the Video and give the answer. To continue press the Button on the buttom right corner.</SubTitle>
      </CardHeader>
        <ViewVideo ><VideoPlayer/></ViewVideo >
    </Card>
  );
};

export default TrailerRotation;
