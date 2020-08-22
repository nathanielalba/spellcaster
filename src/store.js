/**
 * @description choosing to use redux zero for much less boilerplate and won't need to get fancy with actions/types
 */

import createStore from 'redux-zero';
import { applyMiddleware } from 'redux-zero/middleware';
import { connect } from 'redux-zero/devtools';

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

const middlewares = (connect && __DEV__) ? applyMiddleware(connect(initialState)) : [];

const store = createStore(initialState, middlewares);

export default store;
