/**
 * @description choosing to use redux zero for much less boilerplate and won't need to get fancy with actions/types
 */

import createStore from 'redux-zero';

const initialState = {
  // keep track of videos
  videos: {
    data: [],
    loaded: false,
  },
  // need to determine where to start/progress
  // ie: { data: { 1: { duration: 32.4 } } }
  videoPlayback: {
    data: {},
  },
  videoPlayer: {
    isFullScreen: false,
  },
  casting: {
    isCasting: false,
    device: null,
  },
};

const store = createStore(initialState);

export default store;
