import {useCallback, useState, useEffect} from 'react';
import WebServerHelper from '../../helper/WebServerHelper';
import LogTracker from '../../LogTracker';
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

  const showMenu = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hideMenu = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    const sessionStatus: boolean = LogTracker.isSessionActive();
    setIsSessionActive(sessionStatus);

    const trackingStatus: boolean = LogTracker.isTrackingDisabled();
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
    LogTracker.uploadCurrentSessionLog();
  }, []);
  const uploadAllSessionLogs = useCallback(() => {
    LogTracker.uploadAllSessionLogs();
  }, []);

  const deleteCurrentSessionLogs = useCallback(() => {
    const currentSessionId = LogTracker.getSessionId();
    LogTracker.clearTrackingLogsOfSession(currentSessionId)
      .then(() => {
        LogTracker.createNewSession();
      })
      .catch(() => {});
  }, []);

  const deleteAllLogs = useCallback(() => {
    LogTracker.deleteAllLogs()
      .then(() => {
        LogTracker.createNewSession();
      })
      .catch(() => {});
  }, []);

  const handleTracking = useCallback(() => {
    if (isTrackingActive) {
      LogTracker.disableTracking();
      setIsTrackingActive(false);
    } else {
      LogTracker.enableTracking();
      setIsTrackingActive(true);
    }
  }, [isTrackingActive]);

  const handleSession = useCallback(() => {
    if (isSessionActive) {
      LogTracker.stopSession();
      setIsSessionActive(false);
    } else {
      LogTracker.createNewSession();
      setIsSessionActive(true);
    }
  }, [isSessionActive]);

  return {
    isVisible,
    sessionControlText: isSessionActive ? 'Stop session' : 'Start new session',
    trackingControlText: isTrackingActive
      ? 'Disable Tracking'
      : 'Enable Tracking',
    enableUploadButtons: LogTracker.canUpload(),
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
