import { useState } from "react";

function Button({ onClick, text }) {
  return <button onClick={onClick}>{text}</button>;
}

function StatisticLine({ text, value }) {
  return (
    <tr>
      <td>
        {text} {text === "positive" ? `${value}%` : value}
      </td>
    </tr>
  );
}

function Statistics({ good, neutral, bad, all, average, positive }) {
  return (
    <div>
      <h2>statistics</h2>

      {all === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive} />
          </tbody>
        </table>
      )}
    </div>
  );
}

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const handleAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  const handleVotes = () => {
    const updatedVotes = [...votes].map((vote, index) => (index === selected ? vote + 1 : vote));
    setVotes(updatedVotes);
  };

  const mostVotedAnecdote = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />

      <div>
        <h3>Anecdote of the day</h3>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <div>
          <Button onClick={handleVotes} text="vote" />
          <Button onClick={handleAnecdote} text="next anecdote" />
        </div>

        <h3>Anecdote with most votes</h3>
        {anecdotes[mostVotedAnecdote]}
        <p>has {votes[mostVotedAnecdote]} votes</p>
      </div>
    </div>
  );
}
