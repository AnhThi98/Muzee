import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import { Nav, SongHeader, SongBody } from './components';
import { PlayerContainer } from './containers';
import rootReducer from './reducers';
import { UPDATE_LYRIC, UPDATE_LYRIC_PERCENT,  UPDATE_SONG_CURRENT_TIME } from './constant/action_constant';
import './styles/base.sass';

const logger = createLogger({
  predicate: (getState, action) => (
    action.type !== UPDATE_LYRIC
    && action.type !== UPDATE_LYRIC_PERCENT
    && action.type !== UPDATE_SONG_CURRENT_TIME),
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

class App extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="container">
          <SongHeader />
          <SongBody />
        </div>
        <PlayerContainer />
      </div>
    );
  }
}

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app'));