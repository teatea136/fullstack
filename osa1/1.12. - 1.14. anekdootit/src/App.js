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
    <div>has {props.votecount} {console.log(props.votecount)}votes</div>
  )
}

const App = () => {
  const anecdotes = [
    '0If it hurts, do it more often',
    '1Adding manpower to a late software project makes it later!',
    '2The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    '3Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    '4Premature optimization is the root of all evil.',
    '5Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const votes = Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0)
  const [copy, setCopy] = {
    list: [votes]
  }

  const handleVoteClick = () => {
    setCopy(copy => {const list = list.map(x => x + 1)
      return {list}
    })
    console.log(copy.list)
    
  }

  const handleNextClick = () => {
    setSelected(Math.floor(Math.random() * (6 - 0) + 0))
  }

  return (
    <div>
      <div>
        {anecdotes[selected]}
      </div>
      <VoteCount votecount={votes[selected]}/>
      <div>
        <Button handleClick={handleVoteClick} text={'vote'}/>
        <Button handleClick={handleNextClick} text={'next anecdote'}/>
      </div>
    </div>
  )
}

export default App
