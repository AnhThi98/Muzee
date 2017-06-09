import React from 'react';
import KaraokeLyric from 'react-karaoke-lyric';
import { connect } from 'react-redux';
import Progress from './progress';
import './index.sass';


function SongHeader(props) {
  const { per1, per2, lyric1, lyric2 } = props.lyric;

  return (
    <div className='songHeader'>
      <div />
      <div className='karaokeWrapper'>
        <KaraokeLyric
          text={lyric1.text || ''}
          percentage={per1 || 0}
          activeStyle={{ color: 'skyblue' }}
        />
        <br />
        <br />
        <KaraokeLyric
          text={lyric2.text || ''}
          percentage={per2 || 0}
          activeStyle={{ color: 'skyblue' }}
        />
      </div>
      <Progress />
    </div>
  );
}

function mapStateToProps(state) {
  const { lyric } = state;
  return { lyric };
}

export default connect(mapStateToProps)(SongHeader);