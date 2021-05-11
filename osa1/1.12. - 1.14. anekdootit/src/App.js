import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text} 
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  let votes = Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0);
  const copy = [...votes]
   
  const [selected, setSelected] = useState(0)

  const handleVoteClick = () => {
    console.log('voting now ' + selected)
    copy[selected] += 1
  }

  const handleNextClick = () => {
    setSelected(Math.floor(Math.random() * 6))
  }

  return (
    <div>
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        <Button handleClick={handleVoteClick} text={'vote'}/>
        <Button handleClick={handleNextClick} text={'next anecdote'}/>
      </div>
    </div>
  )
}

export default App
