import React from 'react';
import { connect } from 'react-redux';
import { SongHeaderContainer } from './';
import { SongBody } from '../components';

function SongPage(props) {
  return (
    <div>
      <SongHeaderContainer />
      <SongBody suggestedSongs={props.suggestedSongs}/>
    </div>
  );
}

function mapStateToProps(state) {
  return { suggestedSongs: state.songData.suggestedSongs };
}

export default connect(mapStateToProps)(SongPage);

