import {useCallback, useState, useEffect} from 'react';
import WebServerHelper from '../../helper/WebServerHelper';
import {getLogTracker} from '../../LogTracker';
import EventTypes from '../../services/local-event/EventTypes';
import {LocalEvent} from '../../services/local-event/LocalEvent';

interface HelperMenuDataInterface {
  isVisible: boolean;
  sessionControlText: string;
  trackingControlText: string;
  enableUploadButtons: boolean;
  uploadCurrentSessionLogs: () => void;
  uploadAllSessionLogs: () => void;
  shareUrl: () => void;
  hideMenu: () => void;
  deleteAllLogs: () => void;
  deleteCurrentSessionLogs: () => void;
  handleSession: () => void;
  handleTracking: () => void;
}

export default function useHelperMenuData(): HelperMenuDataInterface {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);
  const [isTrackingActive, setIsTrackingActive] = useState<boolean>(false);
  const logTracker = getLogTracker();

  const showMenu = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hideMenu = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    const sessionStatus: boolean = logTracker.isSessionActive();
    setIsSessionActive(sessionStatus);

    const trackingStatus: boolean = logTracker.isTrackingDisabled();
    setIsTrackingActive(!trackingStatus);

    LocalEvent.on(EventTypes.UI.HelperMenu.Show, showMenu);
    LocalEvent.on(EventTypes.UI.HelperMenu.Hide, hideMenu);
    return () => {
      LocalEvent.off(EventTypes.UI.HelperMenu.Show);
      LocalEvent.off(EventTypes.UI.HelperMenu.Hide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shareUrl = useCallback(() => {
    WebServerHelper.shareUIUrl();
  }, []);

  const uploadCurrentSessionLogs = useCallback(() => {
    logTracker.uploadCurrentSessionLog();
  }, [logTracker]);
  const uploadAllSessionLogs = useCallback(() => {
    logTracker.uploadAllSessionLogs();
  }, [logTracker]);

  const deleteCurrentSessionLogs = useCallback(() => {
    const currentSessionId = logTracker.getSessionId();
    logTracker
      .clearTrackingLogsOfSession(currentSessionId)
      .then(() => {
        logTracker.createNewSession();
      })
      .catch(() => {});
  }, [logTracker]);

  const deleteAllLogs = useCallback(() => {
    logTracker
      .deleteAllLogs()
      .then(() => {
        logTracker.createNewSession();
      })
      .catch(() => {});
  }, [logTracker]);

  const handleTracking = useCallback(() => {
    if (isTrackingActive) {
      logTracker.disableTracking();
      setIsTrackingActive(false);
    } else {
      logTracker.enableTracking();
      setIsTrackingActive(true);
    }
  }, [logTracker, isTrackingActive]);

  const handleSession = useCallback(() => {
    if (isSessionActive) {
      logTracker.stopSession();
      setIsSessionActive(false);
    } else {
      logTracker.createNewSession();
      setIsSessionActive(true);
    }
  }, [logTracker, isSessionActive]);

  return {
    isVisible,
    sessionControlText: isSessionActive ? 'Stop session' : 'Start new session',
    trackingControlText: isTrackingActive
      ? 'Disable Tracking'
      : 'Enable Tracking',
    enableUploadButtons: logTracker.canUpload(),
    uploadCurrentSessionLogs,
    uploadAllSessionLogs,
    deleteAllLogs,
    shareUrl,
    hideMenu,
    deleteCurrentSessionLogs,
    handleSession,
    handleTracking,
  };
}
