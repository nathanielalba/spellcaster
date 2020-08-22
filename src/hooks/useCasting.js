import { useState, useEffect, useRef } from 'react';
import GoogleCast from 'react-native-google-cast';

import { logger } from '../utils';

const useCasting = () => {
  const [device, setDevice] = useState(null);
  const [isCasting, setIsCasting] = useState(false);
  // RNGC Constants
  const SESSION_STARTED = GoogleCast.SESSION_STARTED;
  const SESSION_ENDED = GoogleCast.SESSION_ENDING;

  useEffect(() => {
    GoogleCast.EventEmitter.addListener(SESSION_STARTED, () => {
      updateCastingStatus(true);
    });

    GoogleCast.EventEmitter.addListener(SESSION_ENDED, () => {
      updateCastingStatus(false);
    });

    return () => {
      GoogleCast.EventEmitter.removeListener(SESSION_STARTED, () => {
        updateCastingStatus(true);
      });

      GoogleCast.EventEmitter.removeListener(SESSION_ENDED, () => {
        updateCastingStatus(false);
      });
    };
  }, []);

  const updateCastingStatus = (isCasting) => {
    setIsCasting(isCasting);
    getCurrentDevice();
  };

  const getCurrentDevice = async () => {
    try {
      const device = await GoogleCast.getCastDevice();
      setDevice(device);
    } catch (e){
      logger('There was an error getting the casting device', e);
    }
  };

  return [isCasting, device];
};

export default useCasting;
