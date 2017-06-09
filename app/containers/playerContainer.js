import React from 'react';
import { connect } from 'react-redux';
import { Player } from '../components';
import { updateLyric, updateLyricPercent } from '../actions/player';

function PlayerContainer(props) {
  const { lyric, updateLyric, updateLyricPercent, songData } = props;
  return (
    <Player
      lyric={lyric}
      updateLyric={updateLyric}
      updateLyricPercent={updateLyricPercent}
      songData={songData}
    />
  );
}

function mapStateToProps({ lyric, songData }) {
  return { lyric, songData };
}

export default connect(mapStateToProps, { updateLyric, updateLyricPercent })(PlayerContainer);

