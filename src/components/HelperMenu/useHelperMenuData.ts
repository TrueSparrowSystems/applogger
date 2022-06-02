import {useCallback, useState, useEffect} from 'react';
import WebServerHelper from '../../helper/WebServerHelper';
import LogTracker from '../../LogTracker';
import EventTypes from '../../services/local-event/EventTypes';
import {LocalEvent} from '../../services/local-event/LocalEvent';

/**
 * @interface HelperMenuDataInterface
 */
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

  /**
   * @function showMenu - Function to show menu.
   * @returns {void}
   */
  const showMenu: () => void = useCallback(() => {
    setIsVisible(true);
  }, []);

  /**
   * @function hideMenu - Function to hide menu.
   * @returns {void}
   */
  const hideMenu: () => void = useCallback(() => {
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

  /**
   * @function shareUrl - Function to share url.
   * @returns {void}
   */
  const shareUrl: () => void = useCallback(() => {
    WebServerHelper.shareUIUrl();
  }, []);

  /**
   * @function uploadCurrentSessionLogs - Function to upload current session logs.
   * @returns {void}
   */
  const uploadCurrentSessionLogs: () => void = useCallback(() => {
    LogTracker.uploadCurrentSessionLog();
  }, []);

  /**
   * @function uploadAllSessionLogs - Function to upload all session logs.
   * @returns {void}
   */
  const uploadAllSessionLogs: () => void = useCallback(() => {
    LogTracker.uploadAllSessionLogs();
  }, []);

  /**
   * @function deleteCurrentSessionLogs - Function to delete current session logs.
   * @returns {void}
   */
  const deleteCurrentSessionLogs: () => void = useCallback(() => {
    const currentSessionId = LogTracker.getSessionId();
    LogTracker.clearTrackingLogsOfSession(currentSessionId)
      .then(() => {
        LogTracker.createNewSession();
      })
      .catch(() => {});
  }, []);

  /**
   * @function deleteAllLogs - Function to delete all session logs.
   * @returns {void}
   */
  const deleteAllLogs: () => void = useCallback(() => {
    LogTracker.deleteAllLogs()
      .then(() => {
        LogTracker.createNewSession();
      })
      .catch(() => {});
  }, []);

  /**
   * @function handleTracking - Function to toggle tracking state.
   * @returns {void}
   */
  const handleTracking: () => void = useCallback(() => {
    if (isTrackingActive) {
      LogTracker.disableTracking();
      setIsTrackingActive(false);
    } else {
      LogTracker.enableTracking();
      setIsTrackingActive(true);
    }
  }, [isTrackingActive]);

  /**
   * @function handleSession - Function to toggle session state.
   * @returns {void}
   */
  const handleSession: () => void = useCallback(() => {
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
