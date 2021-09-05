import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { RootState } from '../store';
import NewTweet from './NewTweet';
import Tweet from './Tweet';

const TweetPage: React.FC = () => {
  const { id } = useParams<{ id: string}>();
  const replies = useSelector((state: RootState) => state.tweets[id].replies)

  return (
    <div>
      <Tweet id={id} />
      <NewTweet />
      {replies.length !== 0 && <h3 className='center'>Replies</h3>}
      <ul>
        {replies.map((replyId) => (
          <li key={replyId}>
            <Tweet id={replyId}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TweetPage;
