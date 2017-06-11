import React from 'react';
import { connect } from 'react-redux';
import { SongHeader } from '../components';
import { updatePlayedPercent } from '../actions/player';

function SongHeaderContainer(props) {
  return <SongHeader { ...props } />;
}

function mapStateToProps(state) {
  const { playerState, seekBarState, songData: { data: { cover, artist, name, lyric } } } = state;
  return { playerState,
    seekBarState,
    cover,
    artist,
    name,
    showInfo: lyric && !lyric.length };
}

export default connect(mapStateToProps,
  { updatePlayedPercent })(SongHeaderContainer);