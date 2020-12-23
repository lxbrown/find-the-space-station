import * as React from 'react';
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SVGOverlay } from 'react-map-gl';

import {ReactComponent as ISSIcon} from '../assets/icons/iss.svg';

const propTypes = {
  position: PropTypes.arrayOf(PropTypes.number) || null,
  width: PropTypes.number,
  height: PropTypes.number,
};

const defaultProps = {
  position: [0, 0],
  width: 125,
  height: 125,
}

export default class IconOverlay extends PureComponent {
  _redraw = ({project}) => {
    const {
      position,
      width,
      height,
    } = this.props;
    if (!position || position.length === 0) {
      return <></>
    }

    const [x, y] = project(position);
    const xCentered = x - (width / 2);
    const yCentered = y - (height / 2);

    return <ISSIcon x={xCentered} y={yCentered} width={width} height={height}/>
  };

  render() {
    return <SVGOverlay redraw={this._redraw} />;
  }
}

IconOverlay.displayName = 'IconOverlay';
IconOverlay.propTypes = propTypes;
IconOverlay.defaultProps = defaultProps;