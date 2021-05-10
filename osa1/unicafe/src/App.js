import React, { useState } from 'react'

const Display = ({ counter, text }) => {
  return (
    <div>{text} {counter}</div>
  )
}

const Button = (props) => {
  return (
  <button onClick={props.handleClick}>{props.text}</button>
)
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [averageB, setAverageB] = useState(0)
  const [positive, setPositive] = useState(0)

  
  const handleGoodClick = () => {
    setGood(good + 1)
    handleAllClick();
    handleAverage(1);
    handlePositive();
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    handleAllClick();
    handleAverage(0);
    handlePositive();
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    handleAllClick();
    handleAverage(-1);
    handlePositive();
  }

  const handleAllClick = () => {
    setAll(allClicks + 1)
  }

  const handleAverage = (x) => {
    console.log(allClicks)
    if (allClicks !== 0) {
      setAverageB(averageB + x)
      console.log(x)
      setAverage(x / allClicks)
    }
  }

  const handlePositive = () => {
    if (allClicks !== 0) {
      setPositive((good * 100/ allClicks) + ' %')
    }
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGoodClick} text={'good'}/>
      <Button handleClick={handleNeutralClick} text={'neutral'}/>
      <Button handleClick={handleBadClick} text={'bad'}/>
      <h2>statistics</h2>
      <Display text={'good'} counter={good}/>
      <Display text={'neutral'} counter={neutral}/>
      <Display text={'bad'} counter={bad}/>
      <Display text={'all'} counter={allClicks}/>
      <Display text={'average'} counter={average}/>
      <Display text={'positive'} counter={positive}/>
    </div>
  )
}

export default App
