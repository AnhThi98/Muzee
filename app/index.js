import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Nav, SongBody } from './components';
import { PlayerContainer, SongHeaderContainer } from './containers';
import Analyzer from './components/Analyzer';
import rootReducer from './reducers';
import { UPDATE_LYRIC, UPDATE_LYRIC_PERCENT, UPDATE_SONG_CURRENT_TIME } from './constant/action_constant';
import './styles/base.sass';

const logger = createLogger({
  predicate: (getState, action) => (
    action.type !== UPDATE_LYRIC
    && action.type !== UPDATE_LYRIC_PERCENT
    && action.type !== UPDATE_SONG_CURRENT_TIME),
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
const history = syncHistoryWithStore(browserHistory, store);

class App extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="container">
          {this.props.children}
          <Link to='/song'>song</Link>
          <Link to='/'>Back</Link>
          <Analyzer />
          <SongBody />
        </div>
        <PlayerContainer />
      </div>
    );
  }
}
const Com = () => <h1>hihi</h1>;

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component= {App}>
        <IndexRoute component={Com} />
        <Route path='song' component={SongHeaderContainer} />
      </Route>
    </Router>
  </Provider>, document.getElementById('app'));