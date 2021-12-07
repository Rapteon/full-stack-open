import React from "react"

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Content = (props) => (
  <div>
    <Part part={props.parts[0]}/>
    <Part part={props.parts[1]}/>
    <Part part={props.parts[2]}/>
  </div>
)

const Part = (props) => (
  <p>{props.part.name} {props.part.exercises}</p>
)
const Total = (props) => {
  /**
   * sum is assigned the value created by summing all
   * elements in the counts array.
   */
  let sum = 0;
  for(let i of props.parts) {
    sum += i.exercises;
  }
  return <p>Number of exercises {sum}</p>
}
const App = () => {
  const course = "Half Stack application development"
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ];

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default App