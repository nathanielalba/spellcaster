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
  videoPlayback: {
    data: {},
  },
};

const store = createStore(initialState);

export default store;
