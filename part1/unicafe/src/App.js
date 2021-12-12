import React, {useState} from 'react'

const StatisticsLine = ({text, val}) => {
  return (
    <div>{text} {val}</div>
  )
}

const Statistics = ({feedbacks, weights}) => {
  /**
   * Returns the average feedback received by the cafe
   */
  const totalFeedbacks = feedbacks.reduce((prev, current) => prev + current)

  const averageFeedback = () => {
    const weightedSum = feedbacks.map((val, index) => val * weights[index]).reduce((prev, current) => prev + current)
    return (weightedSum)/(totalFeedbacks)
  }

  /**
   * Returns the percentage of positive feedback received.
   * feedbacks[0] must hold the value to calculate
   * positive feedback for.
   */
  const positiveFeedback = () => {
    return (feedbacks[0] / totalFeedbacks * 100)+' %'
  }

  if (totalFeedbacks === 0)
    return 'No feedbacks given'
  else
    return (
      <table>
        <tr>
          <td>good</td>
          <td>{feedbacks[0]}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{feedbacks[1]}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{feedbacks[2]}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{totalFeedbacks}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{averageFeedback()}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{positiveFeedback()}</td>
        </tr>
      </table>
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

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={giveGoodFeedback}>good</button>
      <button onClick={giveNeutralFeedback}>neutral</button>
      <button onClick={giveBadFeedback}>bad</button>
      <h2>statistics</h2>
      <Statistics feedbacks={[good, neutral, bad]} weights={[1, 0, -1]}/>
    </div>
  )
}

export default App