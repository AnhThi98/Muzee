import React from 'react';
import { offsetLeft } from '../../utils/mouse';

class Progress extends React.Component {
  constructor() {
    super();
    this.state = {
      seekPercent: 0,
    };
  }

  handleMouseMove(e) {
    this.setState({ seekPercent: e.clientX - offsetLeft(e.currentTarget) });
  }

  handleMouseOut() {
    this.setState({ seekPercent: 0 });
  }

  render() {
    return (
      <div
        className="progressWrapper"
        onMouseMove={this.handleMouseMove.bind(this)}
        onMouseOut={this.handleMouseOut.bind(this)}
      >
        <div className="progressActive"></div>
        <div className="progress"></div>
        <div className="seekBar" style={{ width: this.state.seekPercent }}></div>
      </div>
    );
  }
}

export default Progress;