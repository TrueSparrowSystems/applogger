import Clipboard from '@react-native-clipboard/clipboard';
import {useMemo, useCallback, useState, useEffect} from 'react';
import NetworkHelper from '../../helper/NetworkHelper';
import LogTracker from '../../LogTracker';
import EventTypes from '../../services/local-event/EventTypes';
import {LocalEvent} from '../../services/local-event/LocalEvent';

interface HelperMenuDataInterface {
  serverUrl: string | null;
  isVisible: boolean;
  sessionControlText: string;
  uploadLogs: () => void;
  copyLink: () => void;
  hideMenu: () => void;
  deleteCurrentSessionLogs: () => void;
  handleSession: () => void;
}

export default function useHelperMenuData(): HelperMenuDataInterface {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);

  const showMenu = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hideMenu = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    const sessionStatus: boolean = LogTracker.isSessionActive();
    setIsSessionActive(sessionStatus);

    LocalEvent.on(EventTypes.UI.HelperMenu.Show, showMenu);
    LocalEvent.on(EventTypes.UI.HelperMenu.Hide, hideMenu);
    return () => {
      LocalEvent.off(EventTypes.UI.HelperMenu.Show);
      LocalEvent.off(EventTypes.UI.HelperMenu.Hide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const serverUrl: string | null = useMemo(() => {
    const ipAddress: string | null = NetworkHelper.getDeviceIpAddress();
    const path: string = '/session';
    if (ipAddress) {
      return `${ipAddress}${path}`;
    }
    return null;
  }, []);

  const copyLink = useCallback(() => {
    if (serverUrl) {
      Clipboard.setString(serverUrl);
    }
  }, [serverUrl]);

  const uploadLogs = useCallback(() => {
    //TODO: Implement upload interface.
  }, []);

  const deleteCurrentSessionLogs = useCallback(() => {
    const currentSessionId = LogTracker.getSessionId();
    //TODO: Call delete function.
  }, []);

  const stopCurrentSession = useCallback(() => {
    LogTracker.stopSession();
  }, []);

  const startNewSession = useCallback(() => {
    LogTracker.createNewSession();
  }, []);

  const handleSession = useCallback(() => {
    if (isSessionActive) {
      stopCurrentSession();
    } else {
      startNewSession();
    }
  }, [isSessionActive, startNewSession, stopCurrentSession]);

  return {
    serverUrl,
    isVisible,
    sessionControlText: isSessionActive ? 'Stop session' : 'Start new session',
    uploadLogs,
    copyLink,
    hideMenu,
    deleteCurrentSessionLogs,
    handleSession,
  };
}
