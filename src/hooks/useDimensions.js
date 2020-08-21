import { useState, useCallback, useRef } from 'react';
import { Dimensions } from 'react-native';
import { isPortrait } from '../utils';

/**
 * @description simple hook to prevent constant re-rendering of onLayout in <View />
 * @param {boolean} keepAspectRatio will use orientation to maintain the correct aspect ratio
 * @returns [layoutDimensions: { width: int, height: int }, onLayout: func]
 * @todo maybe extract the single param as a bool to object for better config, but for this example i believe is fine.
 */
const useDimensions = (keepAspectRatio = true) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  // constants
  const BASE_16_9_RATIO = 0.8;
  // useRef here since react won't really care about this value and only cares when .current is updated
  // prevents recalculating each time again
  const PORTRAIT_HEIGHT_CALC = useRef(BASE_16_9_RATIO * 0.56);
  const LANDSCAPE_WIDTH_CALC = useRef(BASE_16_9_RATIO * 1.77);

  const onLayout = useCallback((e) => {
    let { height, width } = e.nativeEvent.layout;

    if (keepAspectRatio) {
      const dimensions = Dimensions.get('window');

      if (isPortrait()) {
        height = (dimensions.width * PORTRAIT_HEIGHT_CALC.current);
        width = (dimensions.width * BASE_16_9_RATIO);
      } else {
        height = (dimensions.height * BASE_16_9_RATIO);
        width = (dimensions.height * LANDSCAPE_WIDTH_CALC);
      }
    }

    setDimensions({ height, width });
  }, []);

  return [dimensions, onLayout];
};

export default useDimensions;
