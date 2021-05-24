import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text} 
    </button>
  )
}

const VoteCount = (props) => {
  return (
    <div>has {props.votecount} votes</div>
  )
}

const VoteMost = (props) => {
  let topvote = 0
  let topvoteIndex = 0

  props.copy.forEach((item, index) => {
    if (item >= topvote) {
      topvote = item
      topvoteIndex = index
    }
  })

  return (
    <div>
      <h2>Anectode with the most votes</h2>
      {props.anectode[topvoteIndex]}
    </div>
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
   
  const [selected, setSelected] = useState(0)
  const votes = Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0)
  const [copy, setCopy] = useState(votes)
  


  const handleNextClick = () => {
    setSelected(Math.floor(Math.random() * (6 - 0) + 0))
  }  
  
  const handleVoteClick = () => {
    setCopy(copy.map((x, i) => {
      if (i === selected) {
        return (x + 1)
      } 
      return (x)
    }))
  }

  return (
    <div>
      <div>
        <h2>Anectode of the day</h2>
        {anecdotes[selected]}
      </div>
      <VoteCount votecount={copy[selected]}/>
      <div>
        <Button handleClick={handleVoteClick} text={'vote'}/>
        <Button handleClick={handleNextClick} text={'next anecdote'}/>
      </div>

      <VoteMost copy={copy} anectode={anecdotes}/>
    </div>
  )
}

export default App
