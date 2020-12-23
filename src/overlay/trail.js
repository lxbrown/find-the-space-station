import * as React from 'react';
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CanvasOverlay } from 'react-map-gl';

const propTypes = {
  positions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)) || null,
  lineWidth: PropTypes.number,
  strokeStyle: PropTypes.string,
  compositeOperation: PropTypes.string
};

const defaultProps = {
  positions: null,
  lineWidth: 4,
  strokeStyle: '#1FBAD6',
  compositeOperation: 'source-over'
}

export default class TrailOverlay extends PureComponent {
  _redraw = ({ width, height, ctx, project }) => {
    const {
      compositeOperation,
      positions,
      lineWidth,
      strokeStyle
    } = this.props;

    ctx.clearRect(0, 0, width, height);
    if (!positions || positions.length === 0) {
      return;
    }

    ctx.globalCompositeOperation = compositeOperation;
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;

    ctx.beginPath();
    for (const [index, position] of positions.entries()) {
      const [x, y] = project(position);
      if (index === 0) {
        ctx.moveTo(x, y);
      }
      else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  };

  render() {
    return <CanvasOverlay redraw={this._redraw} />;
  }
}

TrailOverlay.displayName = 'TrailOverlay';
TrailOverlay.propTypes = propTypes;
TrailOverlay.defaultProps = defaultProps;