import { useState } from 'react'
import css from "./App.module.css"
import CafeInfo from "../CafeInfo/CafeInfo.tsx";
import { type Votes } from '../../types/votes.ts';
import { type VoteType } from '../../types/votes.ts';
import VoteOptions from '../VoteOptions/VoteOptions.tsx';
import VoteStats from '../VoteStats/VoteStats.tsx';
import Notification from '../Notification/Notification.tsx';

function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0
  }
  );
  const handleVotes = (type: VoteType) => {
    setVotes({
      ...votes,
      [type]: votes[type] + 1,
    });
  };

  function resetVotes() {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0
    });
  };
const totalVotes: number = votes.bad + votes.good + votes.neutral
const positiveRate: number = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0
  const canReset:boolean = totalVotes > 0;



  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions onVote={handleVotes} onReset={resetVotes} canReset={canReset} />
      { totalVotes > 0 ? 
      (<VoteStats votes={votes} totalVotes={totalVotes} positiveRate={positiveRate} />)
      : (<Notification />)
      }
    </div>
  )
}

export default App
