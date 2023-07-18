import {
    Box,
    styled,
} from '@mui/material';
import React from 'react';


const ContainerStyle = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '250px', // oder die gewünschte Höhe des Containers
    
  });

  const imageStyle = {
    objectFit: 'contain', // Anpassen, um das gewünschte Verhalten zu erzielen (cover, contain, etc.)
    maxWidth: '100%',
    maxHeight: '100%',
  };

const LevelSystem = () => {



    


    return (
            <ContainerStyle>
                <img src="/assets/images/Level_Pics/Lvl2.jpg" style={imageStyle} alt="Level 2"/>
            </ContainerStyle>

    );
};

export default LevelSystem;

