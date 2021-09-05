import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Tweet from './Tweet';

function Dashboard() {
  const tweetIds = useSelector((state: RootState) => Object.keys(state.tweets)
    .sort((a, b) => state.tweets[b].timestamp - state.tweets[a].timestamp))

  return (
    <div>
      <h3 className='center'>Your Timeline</h3>
      <ul className='dashboard-list'>
        {tweetIds.map(id => <li key={id}><Tweet id={id} /></li>)}
      </ul>
    </div>
  );
}

export default Dashboard;
