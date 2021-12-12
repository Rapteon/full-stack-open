import React, {useState} from 'react'

const VoteDisplay = ({voteCounts, index}) => (
  <div>has {voteCounts[index]} votes</div>
)

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ]
    const [statement, setStatement] = useState(anecdotes[0])
    const [voteCounts, setVote] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0})
    const [maxVoted, setMaxVoted] = useState(0)

    const generateAnecdote = () => {
        setStatement(anecdotes[Math.floor(Math.random() * anecdotes.length)])
    }
    
    const updateVote = () =>{
      const newVoteCounts = {...voteCounts}
      newVoteCounts[anecdotes.indexOf(statement)] += 1
      setVote(newVoteCounts)
      updateMaxVoted(newVoteCounts)
    }

    const updateMaxVoted = (voteCounts) => {
      const votes = []
      for (const i in voteCounts) {
        votes.push(voteCounts[i])
      }
      setMaxVoted(votes.indexOf(Math.max(...votes)))
    }
    
    return (
        <div>
            <h2>Anecdote of the day</h2>
            {statement}
            <VoteDisplay voteCounts={voteCounts} index={anecdotes.indexOf(statement)}/>
            <button onClick={updateVote}>vote</button>
            <button onClick={generateAnecdote}>next anecdote</button>
            <h2>Anecdote with most votes</h2>
            {anecdotes[maxVoted]}
            <VoteDisplay voteCounts={voteCounts} index={maxVoted}/>
        </div>
    )
}
export default App