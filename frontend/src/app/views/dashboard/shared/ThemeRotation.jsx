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




const ThemeRotation = () => {

  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <CardHeader>
        <Title>Theme Rotation</Title>
      </CardHeader>
      <Box overflow="auto">
      <AudioPlayer />
      </Box>
    </Card>
  );
};



export default ThemeRotation;
