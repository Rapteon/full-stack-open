import React, {useState} from 'react'

const Display = ({text, val}) => {
  return (
    <div>{text} {val}</div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const giveGoodFeedback = () => setGood(good + 1)
  const giveNeutralFeedback = () => setNeutral(neutral + 1)
  const giveBadFeedback = () => setBad(bad + 1)

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={giveGoodFeedback}>good</button>
      <button onClick={giveNeutralFeedback}>neutral</button>
      <button onClick={giveBadFeedback}>bad</button>
      <h2>statistics</h2>
      <Display text='good' val={good}/>
      <Display text='neutral' val={neutral}/>
      <Display text='bad' val={bad}/>
    </div>
  )
}

export default App