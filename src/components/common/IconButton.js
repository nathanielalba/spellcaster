import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Icon, { IconPropTypes } from './Icon';

const IconButton = (props) => {
  const {
    onPress,
    name,
    color,
    size,
    activeOpacity,
  } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity}
    >
      <Icon
        name={name}
        size={size}
        color={color}
      />
    </TouchableOpacity>
  );
};

IconButton.propTypes = {
  ...IconPropTypes,
  onPress: PropTypes.func,
  activeOpacity: PropTypes.number,
};

IconButton.defaultProps = {
  onPress: () => null,
  activeOpacity: 1,
};

export default IconButton;
