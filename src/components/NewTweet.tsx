import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { actions } from '../slices';
import { AppDispatch, RootState } from '../store';

const NewTweet: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authedUser = useSelector((state: RootState) => state.app.authedUser)
  const history = useHistory()
  const [text, setText] = useState('')
  const replyingTo = useParams<{ id: string | undefined }>().id;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const author = authedUser as string;
    await dispatch(actions.tweets.addTweetAsync({ text, author, replyingTo }))
    setText('')
    !replyingTo && history.push('/')
  }

  const tweetLeft = 280 - text.length

  return (
    <div>
      <h3 className='center'>Compose new {replyingTo ? "reply" : "Tweet"}</h3>
      <form className='new-tweet' onSubmit={handleSubmit}>
        <textarea
          placeholder="What's happening?"
          value={text}
          onChange={handleChange}
          className='textarea'
          maxLength={280}
          autoFocus
        />
        {tweetLeft <= 100 && (
          <div className='tweet-length'>
            {tweetLeft}
          </div>
        )}
        <button
          className='btn'
          type='submit'
          disabled={text === ''}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default NewTweet;
