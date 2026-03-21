const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ partName, exerciseCount }) => {
  return (
    <p>
      {partName} {exerciseCount}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      <Part
        partName={parts[0].name}
        exerciseCount={parts[0].exerciseCount}
      ></Part>
      <Part
        partName={parts[1].name}
        exerciseCount={parts[1].exerciseCount}
      ></Part>
      <Part
        partName={parts[2].name}
        exerciseCount={parts[2].exerciseCount}
      ></Part>
    </div>
  );
};

const Total = ({ counts }) => {
  const sum = counts.reduce((prev, curr) => prev + curr, 0);
  return <p>Number of exercises {sum}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header course={course}></Header>
      <Content
        parts={[
          { name: part1.name, exerciseCount: part1.exercises },
          { name: part2.name, exerciseCount: part2.exercises },
          { name: part3.name, exerciseCount: part3.exercises },
        ]}
      ></Content>
      <Total
        counts={[part1.exercises, part2.exercises, part3.exercises]}
      ></Total>
    </div>
  );
};
export default App;
