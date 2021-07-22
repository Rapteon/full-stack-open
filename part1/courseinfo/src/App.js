import React from 'react'

const Header = (props) => (
  <h1>{props.content}</h1>
)

const Part = (props) => (
  <>
    <p>{props.part_num} {props.part_value}</p>
  </>
)

const Content = (props) => (
  <>
    <Part part_num = {props.values[0].name} part_value = {props.values[0].exercises} />
    <Part part_num = {props.values[1].name} part_value = {props.values[1].exercises} />
    <Part part_num = {props.values[2].name} part_value = {props.values[2].exercises} />
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
    const part1 = {
      name: 'Fundamentals of React',
      exercises: 10
    }
    const part2 = {
      name: 'Using props to pass data',
      exercises: 7
    }
    const part3 = {
      name: 'State of a component',
      exercises: 14
    }

    return (
        <div>
            <Header content = {course}/>
            <Content values = {[part1, part2, part3]} />
            <Total exerciseCounts = {[part1.exercises, part2.exercises, part3.exercises]} />
        </div>
    )
}

export default App
