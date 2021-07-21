import React from 'react'

const Header = (props) => (
  <h1>{props.content}</h1>
)

const Content = (props) => (
  <>
    <p>{props.values[0][0]} {props.values[0][1]}</p>
    <p>{props.values[1][0]} {props.values[1][1]}</p>
    <p>{props.values[2][0]} {props.values[2][1]}</p>
  </>
)

const Total = (props) => {
  let sum = 0;
  props.exerciseCounts.forEach(element => {
    sum += element;
  })
  return (
   <>
    <p>Number of exercises {sum}</p>
   </>
  )
}
const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header content = {course}/>
            <Content values = {[[part1, exercises1],[part2, exercises2],[part3, exercises3]]} />
            <Total exerciseCounts = {[exercises1, exercises2, exercises3]} />
        </div>
    )
}

export default App
