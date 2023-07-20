import React, { useState, useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";

const WikipediaQuiz = () => {
  const [article, setArticle] = useState("");
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const fetchRandomFilmArticle = async () => {
      try {
        const response = await axios.get("/random-film-article"); // Ändern Sie die URL, um Ihren Flask-Server zu verwenden

        setArticle(response.data.extract);
        prepareQuizData(response.data.extract);
      } catch (error) {
        console.error("Error fetching Wikipedia article:", error);
      }
    };
    fetchRandomFilmArticle();
  }, []);


  const prepareQuizData = (articleText) => {
    // Zählen Sie die Wörter im ersten Absatz
    const words = articleText.split(" ");
    const totalWords = words.length;

    // Bestimmen Sie die Anzahl der Wörter, die Sie ausblenden möchten (z. B. 20% des Absatzes)
    const wordsToHideCount = Math.ceil(totalWords * 0.2); // 20% der Wörter ausblenden

    // Generieren Sie eine Liste von zufälligen Indizes, die aus der Anzahl der Wörter ausgewählt werden sollen
    const randomIndexes = [];
    while (randomIndexes.length < wordsToHideCount) {
      const randomIndex = Math.floor(Math.random() * totalWords);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }

    // Erzeugen Sie eine Liste mit Quizdaten, wobei die ausgewählten Wörter ausgeblendet werden
    let hiddenCounter = 0;
    const quizData = words.map((word, index) => {
      if (randomIndexes.includes(index)) {
        hiddenCounter++;
        return {
          original: word,
          question: "__".repeat(word.length), // Ersetzen des Wortes durch Unterstriche als Platzhalter
          answer: word,
        };
      } else {
        return {
          original: word,
          question: word, // Das Wort bleibt unverändert, da es nicht ausgeblendet wird
          answer: word,
        };
      }
    });

    setQuizData(quizData);
  };

  return (
    <div>
      {quizData.map((item, index) => (
        <div key={index}>
          {parse(item.question)} {/* Rendern der Quizfrage */}
          <input
            type="text"
            value={item.answer}
            onChange={(e) => {
              // Implementieren Sie hier die Logik zur Handhabung der Benutzereingabe
              const updatedQuizData = [...quizData];
              updatedQuizData[index].answer = e.target.value;
              setQuizData(updatedQuizData);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default WikipediaQuiz;