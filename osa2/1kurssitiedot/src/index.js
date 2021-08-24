import ReactDOM from 'react-dom';

  const Header = () => {
    return (
      <h1>Web development curriculum</h1>
    )
  }

  const CourseName = ({course}) => {
    return (
      <h2>{course.name}</h2>
    )
  }

  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }

  const Content = ({course}) => {
    return (
      <div>
          {course.parts.map(part => 
            <Part key={part.id} part={part} />
          )}
      </div>
    )
  }

const Total = ({course}) => {
  let inVal = 0;
  let sum = course.parts.reduce((x, y) => x + y.exercises, inVal)
  return(
    <p>Number of exercises {sum}</p>
  ) 
}

const Course = ({course}) => {
  return (
    <div>
      <CourseName course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

const Courses = ({courses}) => {
  return (
    <div>
    <Header/>
    {courses.map(course => 
            <Course key={course.id} course={course} />
          )}
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <Courses courses={courses}/>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))