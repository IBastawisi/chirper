import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { actions } from '../slices';
import { AppDispatch, RootState } from '../store';
import Dashboard from './Dashboard';
import NewTweet from './NewTweet';
import Navbar from './Navbar';
import TweetPage from './TweetPage';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.app)

  useEffect(() => {
    dispatch(actions.app.loadAsync())
  }, [dispatch])

  return (
    <Router basename="/chirper">
      <>
        <LoadingBar />
        <div className='container'>
          <Navbar />
          {!state.loading && <div>
            <Route path='/' exact component={Dashboard} />
            <Route path='/tweet/:id' component={TweetPage} />
            <Route path='/new' component={NewTweet} />
          </div>}
        </div>
      </>
    </Router>
  );
}

export default App;
