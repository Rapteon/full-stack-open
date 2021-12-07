import React from "react"

const Header = (props) => (
  <h1>{props.name}</h1>
)

const Content = (props) => (
  <div>
    <Part name={props.parts[0]} count={props.counts[0]}/>
    <Part name={props.parts[1]} count={props.counts[1]}/>
    <Part name={props.parts[2]} count={props.counts[2]}/>
  </div>
)

const Part = (props) => (
  <p>{props.name} {props.count}</p>
)
const Total = (props) => {
  /**
   * sum is assigned the value created by summing all
   * elements in the counts array.
   */
  const sum = props.counts.reduce((previous, current) => (previous + current));
  return <p>Number of exercises {sum}</p>
}
const App = () => {
  const course = "Half Stack application development"
  const part1 = "Fundamentals of React"
  const exercises1 = 10
  const part2 = "Using props to pass data"
  const exercises2 = 7
  const part3 = "State of a component"
  const exercises3 = 14

  return (
    <div>
      <Header name={course}/>
      <Content parts={[part1, part2, part3]} counts={[exercises1, exercises2, exercises3]}/>
      <Total counts={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

export default App