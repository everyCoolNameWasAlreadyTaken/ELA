import { Grid, styled, Box, Card } from '@mui/material';
import { Fragment } from 'react';
import MultipleChoice from './shared/MultipleChoice';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}));

const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const Analytics = () => {

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
            <CardHeader>
              <Title>Single Choice Movie Quiz</Title>
              </CardHeader>
              <CardHeader>
                <SubTitle>Select one out of five possible answers. To submit your answer, press the Button on the right.</SubTitle>
              </CardHeader>
            </Card>
            <MultipleChoice />
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default Analytics;
