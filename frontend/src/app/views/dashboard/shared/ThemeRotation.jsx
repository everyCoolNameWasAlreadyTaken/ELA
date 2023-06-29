import {
  Box,
  Card,
  styled,
} from '@mui/material';
import AudioPlayer from './AudioPlayer';

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
const ViewAudio = styled(Box)(() => ({
  marginTop: '50px',
  marginLeft: '40%',
}));




const ThemeRotation = () => {

  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <CardHeader>
        <Title>Theme Rotation</Title>
      </CardHeader>
      <CardHeader>
        <SubTitle> Play the Audio and give the answer. To continue press the Button on the buttom right corner.</SubTitle>
      </CardHeader>

      <Box overflow="auto">

        <ViewAudio>
          <AudioPlayer />
      </ViewAudio>
      </Box>
    </Card>
  );
};



export default ThemeRotation;
