import {
  Box,
  Card,
  styled,

  Grid
} from '@mui/material';


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

const CardRoot = styled(Card)(({theme}) => ({
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: '24px',
  padding: '24px !important',
  [theme.breakpoints.down('sm')]: {
      paddingLeft: '16px !important',
  },
}));

const ContentBox = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
});



const Analytics = () => {

  return (
    <CardRoot>
    
      <Grid container spacing={3}>
      <Grid item lg={12} md={12} sm={12} xs={12}>

        <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
        <CardHeader>
          <Title>Poster Matching</Title>
        </CardHeader>
      <CardHeader>
        <SubTitle>This Quiz is currently in development and will be available soon.</SubTitle>
      </CardHeader>
      </Card>
      <div style={{filter: 'blur(5px)'}}>
      <Box overflow="auto">
      <ContentBox>
              <img src='/assets/Poster/TheOutlaw.jpg' alt='Nummer1' style={{ width: '23%', marginRight: '20px' }} />
              <img src='/assets/Poster/Casablanca.jpeg' alt='Nummer3' style={{ width: '23%', marginRight: '20px' }} />
              <img src='/assets/Poster/Expendables2.jpeg' alt='Nummer4' style={{ width: '23%', marginRight: '20px' }} />
              <img src='/assets/Poster/Jaws.jpeg' alt='Nummer5'style={{ width: '23%'}} />     
      </ContentBox>
      <ContentBox style={{marginTop: '100px'}}>
              <img src='/assets/Poster/Nummer4.png' alt='Nummer1' style={{ width: '23%', marginRight: '20px' }} />
              <img src='/assets/Poster/Nummer1.png' alt='Nummer3' style={{ width: '23%', marginRight: '20px' }} />
              <img src='/assets/Poster/Nummer2.png' alt='Nummer4' style={{ width: '23%', marginRight: '20px' }} />
              <img src='/assets/Poster/Nummer3.png' alt='Nummer5'style={{ width: '23%'}} />     
      </ContentBox>
      </Box>
      </div>
      </Grid>
      </Grid>
      
    </CardRoot>
  );
};

export default Analytics;
