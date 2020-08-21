
/**
 * @description simple logger to avoid logging in production
 * @param  {...any} args 
 * 
 */
const logger = (...args) => {
  if (__DEV__) {
    console.log(...args);
  } else {
    // do some sort of sentry/whatever logging
  }
};

export default logger;
