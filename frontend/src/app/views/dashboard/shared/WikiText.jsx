import {
  Card,
  styled,
  Button,
  CardContent
} from '@mui/material';
import React, { useState} from "react";
import server from "../../../../axios/axios";



const ContentBox = styled('div')(({theme}) => ({
  margin: '30px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {margin: '16px'},
}));


const StartButton = styled(Button)(({theme}) => ({
  alignSelf: 'center',
  background: theme.palette.primary.main,
  color: '#fff',
  borderRadius: '100px',
  fontSize: '2rem',
  fontWeight: 'bold',
  padding: '16px 32px',
  '&:hover': {
      background: theme.palette.primary.dark,
  },
}));
const ButtonWrapperLarge = styled('span')(({theme}) => ({
  display: 'flex',
  width: '50px',
  height: '50px',
  justifyContent: 'center',
  float: 'right',
  [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
  },
}));

const SubmitButton = styled(Button)(({theme}) => ({
  margin: '20px',
  alignSelf: 'flex-end',
  height: '55px',
  width: '350px',
  borderRadius: '300px',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '1.15rem',
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
      background: theme.palette.primary.dark,
  },
}));

const QuestionCard = styled(Card)(({theme}) => ({
  marginBottom: theme.spacing(2),
  height: '630px',
  width: '800px',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const ContinueButton = styled(Button)(({theme, disabled}) => ({
  margin: '20px',
  alignSelf: 'flex-end',
  height: '55px',
  width: '130px',
  borderRadius: '300px',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '1.15rem',
  background: disabled ? theme.palette.grey[500] : theme.palette.primary.main,
  color: disabled ? '#fff' : theme.palette.primary.contrastText,
  '&:hover': {
      background: disabled ? theme.palette.grey[500] : theme.palette.primary.dark,
  },
}));
const ContinueButtonWrapper = styled('div')(({theme}) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginRight: theme.spacing(2),
  marginTop: '20px',
}));

const ResultCard = styled(Card)(({theme}) => ({
  marginBottom: theme.spacing(2),
  height: '200px',
  width: '850px',
  paddingLeft: '50px',
  paddingRight: '50px',
  justifyContent: 'center',
}));

const Answer = styled('p')(({isCorrect}) => ({
  fontWeight: 'bold',
  margin: '20px',
}));

const WikipediaQuiz = () => {

  const [quizStarted, setQuizStarted] = useState(false);
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
    setAnswerArticle(mergedText);
  };

  const calculateAccuracy = (correctText, userText) => {
    const correctWords = correctText.split(/\s+/);
    const userWords = userText.split(/\s+/);
    
    let totalWords = correctWords.length;
    let correctWordsCount = 0;
    
    for (let i = 0; i < totalWords; i++) {
      if (correctWords[i] === userWords[i]) {
        correctWordsCount++;
      }
    }
    
    const accuracy = (correctWordsCount / totalWords) * 100;
    return accuracy;
  };

  const handleTextScore = () => {
    const accuracy = calculateAccuracy(correctarticle, answerarticle);
    const roundedScore = Math.round(accuracy);
    setuserScore(roundedScore);
  };
  


  const handleChangeInput = (event, inputName) => {
    const { value } = event.target;
    setInputs({ ...inputs, [inputName]: value });
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    fetchWikiArticle();
    
  };

  const reload = () => {
    setuserScore(0)
    setArticle(" ");
    setAnswerArticle(" ");
    setcorrectArticle(" ");
    setInputs({});
    setShowScore(false);
    setQuizStarted(false);
    setLoading(false);
};
  

 

return (
              <ContentBox>
                {!quizStarted ? (
                    <>
                      <ContentBox>
                        <StartButton onClick={handleStartQuiz}>Start Quiz</StartButton>
                      </ContentBox>
                    </>
                ):!showScore ?(  
                    <>
                      <QuestionCard>
                        <CardContent>
                        <div>
                          {!isLoaded ? (
                          <>
                            <p>Your Movie Article is getting prepaired. Please wait...</p>
                          </>

                          ):(
                            <>
                              {handleReplaceBlanks(article)}
                              <ContinueButtonWrapper>
                                <ButtonWrapperLarge>
                              <SubmitButton onClick={handleMergeText}>Submit</SubmitButton>
                              </ButtonWrapperLarge>
                              </ContinueButtonWrapper>
                          </>
                          )}

                        </div>
                        </CardContent>
                      </QuestionCard>
                    </>
                ) : (
                  <>
                    <ContentBox>
                    <QuestionCard>
                        <CardContent>
                        <div>
                          {userScore !== 0 ? (
                            <>
                            <ContentBox>
                            <ResultCard>                            
                                Your Text
                            <Answer>
                                {answerarticle}
                            </Answer>  
                              </ResultCard>
                              <ResultCard>                     
                                Wikis Text
                                <Answer>
                                {correctarticle}
                              </Answer> 
                              </ResultCard>                         
                            </ContentBox>

                            Score: {userScore} out of 100
                              
                              <ButtonWrapperLarge>
                                  <ContinueButton onClick={reload}>
                                      New Quiz
                                  </ContinueButton>
                              </ButtonWrapperLarge>

                            </>
                            ) : (
                              <>
                              {handleTextScore()}
                              </>
                            )}
                          
                        </div>
                         </CardContent>
                      </QuestionCard> 

                    </ContentBox>
                  </>
                )}
              </ContentBox>
                      
);
};


export default WikipediaQuiz;