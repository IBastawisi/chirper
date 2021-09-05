import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { actions } from '../slices';
import { AppDispatch, RootState } from '../store';
import { formatDate, formatTweet } from '../utils/helpers';

const Tweet: React.FC<{ id: string }> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory()
  const authedUser = useSelector((state: RootState) => state.app.authedUser)
  const tweet = useSelector((state: RootState) => state.tweets[id])
  const tweetAuthor = useSelector((state: RootState) => state.users[tweet.author])
  const parentTweet = useSelector((state: RootState) => state.tweets[(tweet.replyingTo as string)])
  const formattedTweet = formatTweet(tweet, tweetAuthor, authedUser, parentTweet)

  const { name, avatar, timestamp, text, hasLiked, likes, replies, parent } = formattedTweet;

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(actions.tweets.toggleLike({id: tweet.id, hasLiked: formattedTweet.hasLiked, authedUser: authedUser as string }))
  }

  const toParent = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault()
    history.push(`/tweet/${id}`)
  }

  return (
    <Link className='tweet' to={`/tweet/${id}`}>
      <img
        src={avatar}
        alt={`Avatar of ${name}`}
        className='avatar'
      />
      <div className='tweet-info'>
        <div>
          <span>{name}</span>
          <div>{formatDate(timestamp)}</div>
          {parent && (
            <button className='replying-to' onClick={(e) => toParent(e, parent.id)}>
              Replying to @{parent.author}
            </button>
          )}
          <p>{text}</p>
        </div>
        <div className='tweet-icons'>
          <svg className='tweet-icon' stroke="currentColor" fill="currentColor" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.164 19.547c-1.641-2.5-3.669-3.285-6.164-3.484v1.437c0 .534-.208 1.036-.586 1.414-.756.756-2.077.751-2.823.005l-6.293-6.207c-.191-.189-.298-.444-.298-.713s.107-.524.298-.712l6.288-6.203c.754-.755 2.073-.756 2.829.001.377.378.585.88.585 1.414v1.704c4.619.933 8 4.997 8 9.796v1c0 .442-.29.832-.714.958-.095.027-.19.042-.286.042-.331 0-.646-.165-.836-.452zm-7.141-5.536c2.207.056 4.638.394 6.758 2.121-.768-3.216-3.477-5.702-6.893-6.08-.504-.056-.888-.052-.888-.052v-3.497l-5.576 5.496 5.576 5.5v-3.499l1.023.011z"></path>
          </svg>
          <span>{replies !== 0 && replies}</span>
          <button className='heart-button' onClick={handleLike}>
            {hasLiked === true
              ? <svg className='tweet-icon' stroke="#e0245e" fill="#e0245e" version="1" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.2 9.4c0 1.3.2 3.3 2 5.1 1.6 1.6 6.9 5.2 7.1 5.4.2.1.4.2.6.2s.4-.1.6-.2c.2-.2 5.5-3.7 7.1-5.4 1.8-1.8 2-3.8 2-5.1 0-3-2.4-5.4-5.4-5.4-1.6 0-3.2.9-4.2 2.3-1-1.4-2.6-2.3-4.4-2.3-2.9 0-5.4 2.4-5.4 5.4z"></path>
              </svg>
              : <svg className='tweet-icon' stroke="currentColor" fill="currentColor" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20c-.195 0-.391-.057-.561-.172-.225-.151-5.508-3.73-7.146-5.371-1.831-1.831-2.043-3.777-2.043-5.082 0-2.964 2.411-5.375 5.375-5.375 1.802 0 3.398.891 4.375 2.256.977-1.365 2.573-2.256 4.375-2.256 2.964 0 5.375 2.411 5.375 5.375 0 1.305-.212 3.251-2.043 5.082-1.641 1.641-6.923 5.22-7.146 5.371-.17.115-.366.172-.561.172zm-4.375-14c-1.861 0-3.375 1.514-3.375 3.375 0 1.093.173 2.384 1.457 3.668 1.212 1.212 4.883 3.775 6.293 4.746 1.41-.971 5.081-3.534 6.293-4.746 1.284-1.284 1.457-2.575 1.457-3.668 0-1.861-1.514-3.375-3.375-3.375s-3.375 1.514-3.375 3.375c0 .552-.447 1-1 1s-1-.448-1-1c0-1.861-1.514-3.375-3.375-3.375z"></path>
              </svg>}
          </button>
          <span>{likes !== 0 && likes}</span>
        </div>
      </div>
    </Link>
  );
}

export default Tweet;
