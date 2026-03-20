const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Part = ({ partName, exerciseCount }) => {
  return <p>{partName} {exerciseCount}</p>
}

const Content = ({ parts }) => {
  return (
    <div>
      <Part partName={parts[0].name} exerciseCount={parts[0].exerciseCount}></Part>
      <Part partName={parts[1].name} exerciseCount={parts[1].exerciseCount}></Part>
      <Part partName={parts[2].name} exerciseCount={parts[2].exerciseCount}></Part>
    </div>
  )
}

const Total = ({ counts }) => {
  const sum = counts.reduce((prev, curr) => prev + curr, 0)
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
      <Header course={course}></Header>
      <Content parts={[
        { name: part1, exerciseCount: exercises1 },
        { name: part2, exerciseCount: exercises2 },
        { name: part3, exerciseCount: exercises3 },
      ]}></Content>
      <Total counts={[exercises1, exercises2, exercises3]}></Total>
    </div>
  )
}
export default App