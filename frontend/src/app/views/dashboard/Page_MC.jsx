import { Grid, styled} from '@mui/material';
import { Fragment } from 'react';
import SingleChoiceRotation from './shared/SingleChoiceRotation';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));


const Analytics = () => {

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <SingleChoiceRotation />
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default Analytics;
