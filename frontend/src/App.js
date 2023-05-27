import React, {useState, useEffect} from 'react';
import './App.css';


function App() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch('/api')
        .then(
            response => response.json()
        )
        .then(
            data => setData(data)
        )
  }, []);

  return (
    <div className="App">
        <h1 className="title">{data.title}</h1>
        <p> Hello </p>
    </div>
  );
}

export default App;
