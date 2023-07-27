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
import leven from 'leven';


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
  const [isLoaded, setLoading] = useState(false);


  const [article, setArticle] = useState(" ");
  const [answerarticle, setAnswerArticle] = useState(" ");
  const [correctarticle, setcorrectArticle] = useState(" ");
  const [inputs, setInputs] = useState({});
  const [userScore, setuserScore] = useState(0);


  const processTextWithPlaceholders = (text) => {
    const regex = /_+/g;
    const replacedText = text.replace(regex, '%PLACEHOLDER%');
    
    return replacedText;
  };

  const fetchWikiArticle = async () => {
    try {
      const response = await server.get(`/wikiarticle`);
      const textdata = response.data;
      setArticle(processTextWithPlaceholders(textdata.paragraph_with_blanks));
      setcorrectArticle(textdata.first_paragraph);
      setLoading(true);

     } catch (error) {
          console.error("Error fetching Wikipedia article:", error);
    }
  };




  const handleReplaceBlanks = (text) => {
    const placeholders = text.split('%PLACEHOLDER%');
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
    const placeholders = article.split('%PLACEHOLDER%');
    let userInputIndex = 0;
  
    for (let i = 1; i < placeholders.length; i++) {
      const inputName = `input${userInputIndex}`;
      const userInput = inputs[inputName] || '';
      const placeholder = placeholders[i];
  
      if (mergedText.includes(`%PLACEHOLDER%${placeholder}`)) {
        mergedText = mergedText.replace(`%PLACEHOLDER%${placeholder}`, `${userInput}${placeholder}`);
        userInputIndex++;
      }
    }
  
    

    
    setShowScore(true);
    console.log(mergedText)
    setAnswerArticle(mergedText);
    console.log(answerarticle)
    console.log(mergedText)
    
    handleTextScore();
  };

 
  const handleTextScore = () => {
    const levenshteinDistance = leven(correctarticle, answerarticle );
    setuserScore(levenshteinDistance);
    console.log("Textscore: ", levenshteinDistance)
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

  const showText = () => {
    console.log("Correct Text: ", correctarticle);
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
                          {!isLoaded ? (
                          <>
                            <p>Your Movie Article is getting prepaired. Please wait...</p>
                          </>

                          ):(
                            <>
                              {handleReplaceBlanks(article)}
                              <button onClick={handleMergeText}>Abgegen</button>
                              <button onClick={showText}>Text</button>
                          </>
                          )}

                        </div>
                      </ContentBox>
                    </>
                ) : (
                  <>
                    <ContentBox>
                        <div>
                          <p>Score: </p>
                          <p>{userScore}</p>
                          <p>Your Text</p>
                          <p>{answerarticle}</p>
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