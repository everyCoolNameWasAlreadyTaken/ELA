import {
  Box,
  Card,
  styled,
  
} from '@mui/material';
import React from 'react';

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

const ContentBox = styled(Box)({
  position: 'center',
  display: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
});

const ContainerStyle = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '410px', 
    
  });

  const imageStyle = {
    objectFit: 'contain',
    maxWidth: '100%',
    maxHeight: '90%',
  };

const Clustering = () => {



    
    return (
      <>
      <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <CardHeader>
        <Title>Clustering</Title>
      </CardHeader>
      <CardHeader>
        <SubTitle> Here are the Clustering Diagrams shown</SubTitle>
      </CardHeader>
      </Card>
      <Card>
        <ContentBox>
            <ContainerStyle>
                <img src="/assets/clustering.jpg" style={imageStyle} alt="All Questions"/>
                <img src="/assets/clusteringMedia.jpg" style={imageStyle} alt="Media Questions"/>
                <img src="/assets/clusteringMultiplechoice.jpg" style={imageStyle} alt="MC Questions"/>
            </ContainerStyle>
            </ContentBox>
            </Card>
            </>
    );
};

export default Clustering;

