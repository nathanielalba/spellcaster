import { Dimensions } from 'react-native';

const isPortrait = () => {
  const { height, width } = Dimensions.get('screen');

  return height >= width;
};

export default isPortrait;
