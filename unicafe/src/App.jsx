import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const handleGood = (newGood) => {
    setGood(newGood);
    setAll(newGood + neutral + bad);
  };

  const handleNeutral = (newNeutral) => {
    setNeutral(newNeutral);
    setAll(good + newNeutral + bad);
  };

  const handleBad = (newBad) => {
    setBad(newBad);
    setAll(good + neutral + newBad);
  };

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <button onClick={() => handleGood(good + 1)}>good</button>
        <button onClick={() => handleNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => handleBad(bad + 1)}>bad</button>
      </div>

      <h2>statistics</h2>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>average {(good*1 + neutral * 0 + bad * -1)/all}</div>
      <div>positive {(good * 100)/all} %</div>
    </div>
  );
};

export default App;
