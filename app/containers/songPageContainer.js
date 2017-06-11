import React from 'react';
import { connect } from 'react-redux';
import { SongHeaderContainer } from './';
import { SongBody } from '../components';
import { fetchSuggestedSong } from '../actions/song';

const idRegex = /\/song\/[A-Za-z0-9_-]+\/(\w{8})/g;

class SongPage extends React.Component {
  constructor() {
    super();
    this.state = { suggestedSongs: [] };
  }

  componentDidMount() {
    fetchSuggestedSong(this.props.params.id)
      .then(({ data }) => this.setState({ suggestedSongs: data.songs }))
      .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    console.log('cool');
    const nextLoc = nextProps.routing.locationBeforeTransitions.pathname;
    const [, id] = idRegex.exec(nextLoc);
    fetchSuggestedSong(id)
      .then(({ data }) => this.setState({ suggestedSongs: data.songs }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <SongHeaderContainer />
        <SongBody suggestedSongs={this.state.suggestedSongs}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { routing: state.routing };
}

export default connect(mapStateToProps)(SongPage);

