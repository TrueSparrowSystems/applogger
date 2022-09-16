import {useCallback, useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {LogTypes} from '../../constants';
import {getWebServerHelperInstance} from '../../helper/WebServerHelper';
import {getLogTracker} from '../../LogTracker';
import Cache from '../../services/Cache';
import {CacheKey} from '../../services/Cache/CacheKey';
import EventTypes from '../../services/local-event/EventTypes';
import {LocalEvent} from '../../services/local-event/LocalEvent';

/**
 * @interface HelperMenuDataInterface
 */
interface HelperMenuDataInterface {
  showActivityIndicator: boolean;
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
  const [showActivityIndicator, setShowActivityIndicator] =
    useState<boolean>(false);
  const logTracker = getLogTracker();

  /**
   * @function showMenu - Function to show menu.
   * @returns {void}
   */
  const showMenu: () => void = useCallback(() => {
    Cache.setValue(CacheKey.isHelperMenuOpen, true);
    setIsVisible(true);
  }, []);

  /**
   * @function hideMenu - Function to hide menu.
   * @returns {void}
   */
  const hideMenu: () => void = useCallback(() => {
    Cache.setValue(CacheKey.isHelperMenuOpen, false);
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
    getWebServerHelperInstance().shareUIUrl();
  }, []);

  /**
   * @function showAlert - Function to show completion alert on helper menu actions
   * @param  {string} message - message to be shown in alert
   */
  const showAlert = useCallback((message: string) => {
    Alert.alert(message);
  }, []);

  /**
   * @function uploadCurrentSessionLogs - Function to upload current session logs.
   * @returns {void}
   */
  const uploadCurrentSessionLogs: () => void = useCallback(() => {
    setShowActivityIndicator(true);
    logTracker
      .uploadCurrentSessionLog()
      .then(status => {
        if (status) {
          showAlert('Current session log uploaded');
        } else {
          showAlert('Could not upload current session logs');
        }
      })
      .finally(() => {
        setShowActivityIndicator(false);
      });
  }, [logTracker, showAlert]);

  /**
   * @function uploadAllSessionLogs - Function to upload all session logs.
   * @returns {void}
   */
  const uploadAllSessionLogs: () => void = useCallback(() => {
    setShowActivityIndicator(true);
    logTracker
      .uploadAllSessionLogs()
      .then(status => {
        if (status) {
          showAlert('All session logs uploaded');
        } else {
          showAlert('Could not upload all session logs');
        }
      })
      .finally(() => {
        setShowActivityIndicator(false);
      });
  }, [logTracker, showAlert]);

  /**
   * @function deleteCurrentSessionLogs - Function to delete current session logs.
   * @returns {void}
   */
  const deleteCurrentSessionLogs: () => void = useCallback(() => {
    setShowActivityIndicator(true);
    const currentSessionId = logTracker.getSessionId();
    logTracker
      .clearTrackingLogsOfSession(currentSessionId)
      .then(() => {
        logTracker.createNewSession();
        showAlert('Current session logs deleted successfully.');
      })
      .catch(() => {
        showAlert('Could not delete current session logs.');
      })
      .finally(() => {
        setShowActivityIndicator(false);
      });
  }, [logTracker, showAlert]);

  /**
   * @function deleteAllLogs - Function to delete all session logs.
   * @returns {void}
   */
  const deleteAllLogs: () => void = useCallback(() => {
    setShowActivityIndicator(true);
    logTracker
      .deleteAllLogs()
      .then(() => {
        logTracker.createNewSession();
        showAlert('All session logs deleted successfully.');
      })
      .catch(() => {
        showAlert('Could not delete all session logs.');
      })
      .finally(() => {
        setShowActivityIndicator(false);
      });
  }, [logTracker, showAlert]);

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
    showActivityIndicator,
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
