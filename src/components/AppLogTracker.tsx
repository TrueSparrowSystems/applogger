import React from 'react';
import {useWebServer} from '../hooks';
import HelperMenu from './HelperMenu';

export function AppLogTracker() {
  useWebServer();
  return <HelperMenu />;
}
