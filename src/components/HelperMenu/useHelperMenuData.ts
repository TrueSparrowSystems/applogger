import {useCallback, useState, useEffect} from 'react';
import {LogTypes} from '../../constants';
import WebServerHelper from '../../helper/WebServerHelper';
import {getLogTracker} from '../../LogTracker';
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
  const logTracker = getLogTracker();

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
    logTracker.uploadCurrentSessionLog();
  }, [logTracker]);

  /**
   * @function uploadAllSessionLogs - Function to upload all session logs.
   * @returns {void}
   */
  const uploadAllSessionLogs: () => void = useCallback(() => {
    logTracker.uploadAllSessionLogs();
  }, [logTracker]);

  /**
   * @function deleteCurrentSessionLogs - Function to delete current session logs.
   * @returns {void}
   */
  const deleteCurrentSessionLogs: () => void = useCallback(() => {
    const currentSessionId = logTracker.getSessionId();
    logTracker
      .clearTrackingLogsOfSession(currentSessionId)
      .then(() => {
        logTracker.createNewSession();
      })
      .catch(() => {});
  }, [logTracker]);

  /**
   * @function deleteAllLogs - Function to delete all session logs.
   * @returns {void}
   */
  const deleteAllLogs: () => void = useCallback(() => {
    logTracker
      .deleteAllLogs()
      .then(() => {
        logTracker.createNewSession();
      })
      .catch(() => {});
  }, [logTracker]);

  /**
   * @function handleTracking - Function to toggle tracking state.
   * @returns {void}
   */
  const handleTracking: () => void = useCallback(() => {
    logTracker.track({
      description: 'Tap on Tracking Control Button (#tracking_control)',
      type: LogTypes.Tap,
      params: {
        testId: 'tracking_control',
        trackingState: isTrackingActive ? 'disabled' : 'enabled',
      },
    });
    if (isTrackingActive) {
      logTracker.disableTracking();
      setIsTrackingActive(false);
    } else {
      logTracker.enableTracking();
      setIsTrackingActive(true);
    }
  }, [logTracker, isTrackingActive]);

  /**
   * @function handleSession - Function to toggle session state.
   * @returns {void}
   */
  const handleSession: () => void = useCallback(() => {
    logTracker.track({
      description: 'Tap on Session control Button (#session_control)',
      type: LogTypes.Tap,
      params: {
        testId: 'session_control',
        sessionState: isSessionActive
          ? 'stopped session'
          : 'started new session',
      },
    });

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
