import {
  Box,
  Card,
  Icon,
  IconButton,
  styled,
  Tooltip,
  Button,
  Grid, useTheme
} from '@mui/material';
import React, { useState, useRef, useEffect } from "react";
import server from "../../../../axios/axios";


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

const StartButton = styled(Button)(({theme}) => ({
  alignSelf: 'center',
  background: theme.palette.primary.main,
  color: '#fff',
  borderRadius: '4px',
  fontSize: '1rem',
  fontWeight: 'bold',
  padding: '12px 24px',
  '&:hover': {
      background: theme.palette.primary.dark,
  },
}));

const WikipediaQuiz = () => {

  const [quizStarted, setQuizStarted] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);
  const [showScore, setShowScore] = useState(false);


  const [article, setArticle] = useState(" ");
  const [answerearticle, setanswereArticle] = useState(" ");
  const [correctarticle, setcorrectArticle] = useState(" ");
  const [inputs, setInputs] = useState({});


  const fetchWikiArticle = async () => {
    try {
      const response = await server.get(`/wikiarticle`);
      const textdata = response.data;
      setArticle(textdata.paragraph_with_blanks);
      setcorrectArticle(textdata.first_paragraph);



     } catch (error) {
          console.error("Error fetching Wikipedia article:", error);
    }
  };

  const handleReplaceBlanks = (text) => {
    const placeholders = text.split('_');
    if (placeholders.length > 1) {
      const inputFields = placeholders.slice(1).map((placeholder, index) => {
        const inputName = `input${index}`;
        return (
          <React.Fragment key={index}>
            <input
              type="text"
              name={inputName}
              value={inputs[inputName] || ''}
              onChange={(e) => handleChangeInput(e, inputName)}
            />
            {placeholder}
          </React.Fragment>
        );
      });

      return (
        <div>
          {placeholders[0]}
          {inputFields}
        </div>
      );
    }
    return text;
  };

  const handleMergeText = () => {
    let mergedText = article;
    const placeholders = article.split('_');
    placeholders.slice(1).forEach((placeholder, index) => {
      const inputName = `input${index}`;
      const userInput = inputs[inputName] || '';
      mergedText = mergedText.replace(placeholder, `${userInput}${placeholder}`);
    });
    setanswereArticle(mergedText);
    setShowScore(true);
  };

  const handleChangeInput = (event, inputName) => {
    const { value } = event.target;
    setInputs({ ...inputs, [inputName]: value });
  };



  const handleStartQuiz = () => {
    setQuizStarted(true);
    setTimeTaken(0);
    fetchWikiArticle();
  };

  const handleShowUserInput = () => {
    return (
      <div>

      </div>
    );
  }

 

return (
  <CardRoot>
      <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={8} lg={9}>
              <ContentBox>
                {!quizStarted ? (
                    <>
                      <ContentBox>
                        <StartButton onClick={handleStartQuiz}>Start Quiz</StartButton>
                      </ContentBox>
                    </>
                ):!showScore ?(  
                    <>
                      <ContentBox>
                        <div>
                          {handleReplaceBlanks(article)}
                          <button onClick={handleMergeText}>Verschmelzen und ausgeben</button>
                        </div>
                      </ContentBox>
                    </>
                ) : (
                  <>
                    <ContentBox>
                        <div>
                          <p>Your Text</p>
                          <p>{answerearticle}</p>
                          <p>Wikis Text</p>
                          <p>{correctarticle}</p>
                        </div>
                    </ContentBox>
                  </>
                )}
              </ContentBox>
          </Grid>
      </Grid>
  </CardRoot>
                      
);
};


export default WikipediaQuiz;