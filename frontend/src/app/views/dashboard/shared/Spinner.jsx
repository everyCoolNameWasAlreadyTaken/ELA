import React from 'react';
import { styled } from '@mui/material';

const SpinnerContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px', // Adjust the height as per your requirement
});

const LoadingSpinner = styled('div')`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #333;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Spinner = () => {
    return (
        <SpinnerContainer>
            <LoadingSpinner />
        </SpinnerContainer>
    );
};

export default Spinner;

