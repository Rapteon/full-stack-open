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
  console.log(props)
  return (
   <>
    <p>Number of exercises {props.value[0].exercises + props.value[1].exercises + props.value[2].exercises}</p>
   </>
  )
}
const App = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
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
      ]
    }
    return (
        <div>
            <Header content = {course.name}/>
            <Content values = {course.parts} />
            <Total value = {course.parts} />
        </div>
    )
}

export default App
