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
  let [sum, setSum] = useState(0)
  let [average, setAverage] = useState(0)

  
  const handleGoodClick = () => {
    setAll(allClicks.concat(1))
    setGood(good + 1)
    handleAllClick();
    handleAverage();
  }

  const handleNeutralClick = () => {
    setAll(allClicks.concat(0))
    setNeutral(neutral + 1)
    handleAllClick();
    handleAverage();
  }

  const handleBadClick = () => {
    setAll(allClicks.concat(-1))
    setBad(bad + 1)
    handleAllClick();
    handleAverage();
  }



  let handleAllClick = () => {
    setSum(sum = allClicks.length + 1)
  }

  const handleAverage = () => {
    if (sum !== 0) {
      setAverage(average = (allClicks.reduce((accumulator, currentValue) =>
        accumulator + currentValue, 0))/ sum)
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
      <Display text={'all'} counter={sum}/>
      <Display text={'average'} counter={average}/>
      <Display text={'positive'} counter={'0'}/>
    </div>
  )
}

export default App
