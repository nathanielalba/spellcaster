import React, { useState, useEffect } from 'react';
import GoogleCast from 'react-native-google-cast';

import { logger } from '../utils';


const useCasting = (props) => {
  // state
  const [castState, setCastState] = useState(null);
  const [device, setDevice] = useState(null);

  // constants
  const LOGGER_NAME = '[RNGC]:';
  const GOOGLE_CAST_EVENTS = `
      SESSION_STARTING SESSION_STARTED SESSION_START_FAILED SESSION_SUSPENDED
      SESSION_RESUMING SESSION_RESUMED SESSION_ENDING SESSION_ENDED
      MEDIA_STATUS_UPDATED MEDIA_PLAYBACK_STARTED MEDIA_PLAYBACK_ENDED MEDIA_PROGRESS_UPDATED
      CHANNEL_CONNECTED CHANNEL_DISCONNECTED CHANNEL_MESSAGE_RECEIVED
    `.trim().split(/\s+/);

  useEffect(() => {
    getCurrentDevice();
    getCastState();

    GOOGLE_CAST_EVENTS.forEach((event) => {
      GoogleCast.EventEmitter.addListener(GoogleCast[event], () => {
        logger(event, arguments);
      });
    });

    return () => {
      GOOGLE_CAST_EVENTS.forEach((event) => {
        GoogleCast.EventEmitter.removeListener(GoogleCast[event], () => {
          logger(event, arguments);
        });
      });
    };
  }, []);
  
  const getCurrentDevice = async () => {
    try {
      const device = await GoogleCast.getCastDevice();
      setDevice(device);
    } catch (e) {
      logger(LOGGER_NAME, 'getDeviceState', e);
    }
  };

  const getCastState = async () => {
    try {
      const status = await GoogleCast.getCastState();
      setCastState(status);
    } catch (e) {
      logger(LOGGER_NAME, 'getCastState', e);
    }
  };

  return [castState, device];
};

export default useCasting;
