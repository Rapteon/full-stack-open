import { useState } from "react";

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  if (all == 0) {
    return <div>No feedback given</div>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good}></StatisticLine>
        <StatisticLine text="neutral" value={neutral}></StatisticLine>
        <StatisticLine text="bad" value={bad}></StatisticLine>
        <StatisticLine text="all" value={all}></StatisticLine>
        <StatisticLine
          text="average"
          value={(good * 1 + neutral * 0 + bad * -1) / all}
        ></StatisticLine>
        <StatisticLine
          text="positive"
          value={`${(good * 100) / all} %`}
        ></StatisticLine>
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = (newGood) => {
    setGood(newGood);
  };

  const handleNeutral = (newNeutral) => {
    setNeutral(newNeutral);
  };

  const handleBad = (newBad) => {
    setBad(newBad);
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
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  );
};

export default App;
