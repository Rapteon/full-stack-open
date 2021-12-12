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
  const [all, setAll] = useState(0)

  const giveGoodFeedback = () => {
    setGood(good + 1)
    setAll(all + 1)
  }
  const giveNeutralFeedback = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  const giveBadFeedback = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  /**
   * Returns the average feedback received by the cafe
   */
  const averageFeedback = () => {
    const [goodWeight, neutralWeight, badWeight] = [1, 0, -1]

    if (all === 0)
      return 0
    else
      return (good * goodWeight + neutral * neutralWeight + bad * badWeight)/all
  }

  /**
   * Returns the percentage of positive feedback received.
   */
  const positiveFeedback = () => {
    if (all === 0)
      return 0
    else
      return (good / all * 100)+' %'
  }
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
      <Display text='all' val={all}/>
      <Display text='average' val={averageFeedback()}/>
      <Display text='positive' val={positiveFeedback()}/>
    </div>
  )
}

export default App