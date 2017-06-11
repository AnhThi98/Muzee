import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Nav } from './components';
import { PlayerContainer, SongPageContainer } from './containers';
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
          <Analyzer />
        </div>
        <PlayerContainer />
      </div>
    );
  }
}
const Com = () =>
  <div>
    <Link to='/song/Heroes-Tonight/IWBZ9I00'>Heroes</Link>
    <br />
    <Link to='/song/Noi-Nay-Co-Anh/ZW79ZBE8'>Noi nay co anh</Link>
    <br />
    <Link to='/song/Spring-Day/ZW79ZZ7I'>spring day</Link>
  </div>
;

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component= {App}>
        <IndexRoute component={Com} />
        <Route path='song/:name/:id' component={SongPageContainer} />
      </Route>
    </Router>
  </Provider>, document.getElementById('app'));