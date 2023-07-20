import {Card, Box, CardContent, styled,Tooltip} from '@mui/material';
import React, {useState, useEffect} from 'react';
import server from "../../../axios/axios";

const ContentBox = styled('div')(({theme}) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {margin: '16px'},
}));

const Title = styled('span')(() => ({
    margin: '10px',
    fontSize: '1rem',
    fontWeight: '500',
    marginRight: '.5rem',
    textTransform: 'capitalize',
    alignSelf: 'center',
    display: 'flex',
}));

const SubTitle = styled('span')(({theme}) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
}));

const TitleWrapper = styled('div')(({theme}) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
}));

const ContainerStyle = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',

  });

  const imageStyle = {
    objectFit: 'contain',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '15px',
  };

const Level = () => {

    const [correctQuizzes, setcorrectQuizzes] = useState(0);
    const [totalQuizzes, settotalQuizzes] = useState(0);
    const [userLevel, setuserLevel] = useState(0);
    const [picture, setPicture] = useState(" ");

    const fetchUserLevel = async () => {
        try {
            const response = await server.get(`/`); //TODO: Set Backend Route to fetch Database Values
            const userdata = response.data;
            setcorrectQuizzes(userdata.correctQuizzes);
            settotalQuizzes(userdata.totalQuizzes);
            console.log("correctQuizzes: ", correctQuizzes);
            console.log("totalQuizzes: ", totalQuizzes);

        } catch (error) {
            console.error('Error:', error);
        }
    };
    const calculateUserLevel = () => {
        //TODO: Remove Comment to fetchUserLevel
        //fetchUserLevel();
        var correctPercent = (39 / 100)*100; //Remove Hardcoded Values Replace with (correctQuizzes,totalQuizzes)
        switch (true) {
            case correctPercent < 40:   //Stufe 0
                console.log("Stufe 0")
                setuserLevel("Level 0 - Freshman");
                setPicture("/assets/images/Level_Pics/Lvl0.jpg");
                break;
            case correctPercent < 55:   //Stufe 1
                console.log("Stufe 1")
                setuserLevel("Level 1 - Junior Script Assistant");
                setPicture("/assets/images/Level_Pics/Lvl1.jpg");
                break;
            case correctPercent < 65:   //Stufe 2
                console.log("Stufe 2")
                setuserLevel("Level 2 - Junior Light Operator");
                setPicture("/assets/images/Level_Pics/Lvl2.jpg");
                break;
            case correctPercent < 80:   //Stufe 3
                console.log("Stufe 3")
                setuserLevel("Level 3 - Second Camera Operator");
                setPicture("/assets/images/Level_Pics/Lvl3.jpg");
                break;
            case correctPercent < 90:   //Stufe 4
                console.log("Stufe 4")
                setuserLevel("Level 4 - Chief Camera Operator");
                setPicture("/assets/images/Level_Pics/Lvl4.jpg");
                break;
            default:                    //Stufe 5
                console.log("Stufe 5")
                setuserLevel("Level 5 - Director");
                setPicture("/assets/images/Level_Pics/Lvl5.jpg");
                break;
          }

    }

    useEffect(() => {
        calculateUserLevel();
    },)

    return (
    <ContentBox>
        <Card>
            <CardContent>
                <TitleWrapper>
                    <Title>Your current Level</Title>
                    <Tooltip title="Your Current Level Shows your progress in the exams you have taken. Your correct answers and the time taken are used for the calculation. There are six levels: Level 0 represents a new entry into the world of film and Level 5 represents absolute expertise in all areas of film and series.">
                        <SubTitle>{userLevel}</SubTitle>
                    </Tooltip>
                </TitleWrapper>
                <ContainerStyle>
                    <img src={picture} style={imageStyle} alt="Level"/>
                </ContainerStyle>
            </CardContent>
        </Card>
    </ContentBox>
    );

};

export default Level;
