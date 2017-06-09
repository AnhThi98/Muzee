import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import { Nav, SongHeader, SongBody } from './components';
import { PlayerContainer } from './containers';
import rootReducer from './reducers';
import './styles/base.sass';

const store = createStore(rootReducer, applyMiddleware(thunk));

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