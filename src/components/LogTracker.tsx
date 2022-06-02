import React from 'react';
import {useWebServer} from '../hooks';
import HelperMenu from './HelperMenu';

export function LogTracker() {
  useWebServer();
  return <HelperMenu />;
}
