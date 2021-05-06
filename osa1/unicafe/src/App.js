import { render } from '@testing-library/react'
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
  const [allClicks, setAll] = useState([])
  
  const handleGoodClick = () => {
    setAll(allClicks.concat(1))
    setGood(good + 1)
    handleAllClick()
  }

  const handleNeutralClick = () => {
    setAll(allClicks.concat(0))
    setNeutral(neutral + 1)
    handleAllClick()
  }

  const handleBadClick = () => {
    setAll(allClicks.concat(-1))
    setBad(bad + 1)
    handleAllClick()
  }

  const handleAllClick = () => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const allClicksCounter = allClicks.reduce(reducer);
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
      <Display text={'all'} counter={allClicksCounter}/>
      <Display text={'average'} counter={'0'}/>
      <Display text={'positive'} counter={'0'}/>
    </div>
  )
}

export default App
