import React, { useState } from 'react'

const Button = (props) => {
  return(
  <button onClick={props.handleClick}>{props.text}</button>
  )
}

const StatisticsLine = (props) => {
  if (props.text === 'good' || props.text === 'neutral' || props.text === 'bad') {
    console.log(props.text)
    return (
      <tr>
        <td>{props.text} </td>
        <td>{props.value}</td>
      </tr>
    )
  } else if (props.text === 'all') {
    return (
      <tr>
      <td>{props.text}</td>
      <td>{props.value.length}</td>
    </tr>
    )
  } else if (props.text === 'average') {
    let x = 0
    if (props.value.length > 0) {
        x = props.value.reduce((accumulator, currentValue) => accumulator + currentValue)/props.value.length
      }
    return (
      <tr>
      <td>{props.text}</td>
      <td>{x}</td>
    </tr>
    )
  } else if (props.value.length > 0) {
    let y = props.good * 100 / props.all.length
    return (
      <tr>
        <td>{props.text}</td> 
        <td>{y} %</td>
      </tr>
    )
  }
  return (
    <tr></tr>
  )
}

const Statistics = (props) => {
  if (props.all.length !== 0) {
    return (
      <table>
        <tbody>
        <StatisticsLine text={'good'} value={props.good}/>
        <StatisticsLine text={'neutral'} value={props.neutral}/>
        <StatisticsLine text={'bad'} value={props.bad}/>
        <StatisticsLine text={'all'} value={props.all}/> 
        <StatisticsLine text={'average'} value={props.all} />
        <StatisticsLine text={'positive'} value={props.all} good={props.good} all={props.all}/>
        </tbody>
      </table>
    )
  }
  return (
    <div>No feedback given</div>
  )
}




const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState([])

  const handleGoodClick = () => {
    setGood(good + 1) 
    setAll(all.concat(1))
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all.concat(0))
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all.concat(-1))
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGoodClick} text={'good'}/>
      <Button handleClick={handleNeutralClick} text={'neutral'}/>
      <Button handleClick={handleBadClick} text={'bad'}/>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

export default App
