import { Card, Grid, styled, useTheme } from '@mui/material';
import { Fragment } from 'react';
import MultipleChoice from './shared/MultipleChoice';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Title = styled('span')(() => ({
  fontSize: '2.5rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize',
  width: '100%'
}));

const Analytics = () => {
  const { palette } = useTheme();

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Title>Single Choice Movie Quiz</Title>
            <MultipleChoice />
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default Analytics;
