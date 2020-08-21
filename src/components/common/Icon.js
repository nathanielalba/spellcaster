import React from 'react';
import { default as MaterialIcon } from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import theme from '../../theme';

const Icon = (props) => {
  const { name, size, color } = props;

  return (
    <MaterialIcon
      name={name}
      size={size}
      color={color}
    />
  );
};

export const IconPropTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
};

Icon.propTypes = IconPropTypes;

Icon.defaultProps = {
  size: 12,
  color: theme.colors.white,
};

export default Icon;
