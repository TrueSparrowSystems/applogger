import {pick} from 'lodash';
import deviceInfoModule from 'react-native-device-info';
import {DeviceConstantKeys, DeviceConstants} from './types';

export class DeviceInfo {
  deviceConstants: DeviceConstants = {
    appName: deviceInfoModule.getApplicationName(),
    brand: deviceInfoModule.getBrand(),
    buildNumber: deviceInfoModule.getBuildNumber(),
    bundleId: deviceInfoModule.getBundleId(),
    deviceId: deviceInfoModule.getDeviceId(),
    model: deviceInfoModule.getModel(),
    readableVersion: deviceInfoModule.getReadableVersion(),
    systemName: deviceInfoModule.getSystemName(),
    systemVersion: deviceInfoModule.getSystemVersion(),
    uniqueId: deviceInfoModule.getUniqueId(),
    version: deviceInfoModule.getVersion(),
    type: deviceInfoModule.getDeviceType(),
    isTablet: deviceInfoModule.isTablet(),
    hasNotch: deviceInfoModule.hasNotch(),
  };
  constructor() {
    deviceInfoModule.isKeyboardConnected().then(isKeyboardConnected => {
      this.deviceConstants.isKeyboardConnected = isKeyboardConnected;
    });
    deviceInfoModule.isTabletMode().then(isTabletMode => {
      this.deviceConstants.isTabletMode = isTabletMode;
    });
    deviceInfoModule.isMouseConnected().then(isMouseConnected => {
      this.deviceConstants.isMouseConnected = isMouseConnected;
    });
    deviceInfoModule.getApiLevel().then(apiLevel => {
      this.deviceConstants.apiLevel = apiLevel;
    });
    deviceInfoModule.getAndroidId().then(androidId => {
      this.deviceConstants.androidId = androidId;
    });
    deviceInfoModule.getBaseOs().then(baseOs => {
      this.deviceConstants.baseOs = baseOs;
    });
    deviceInfoModule.getBatteryLevel().then(batteryLevel => {
      this.deviceConstants.batteryLevel = batteryLevel;
    });
    deviceInfoModule.getBootloader().then(bootloader => {
      this.deviceConstants.bootloader = bootloader;
      // "mw8998-002.0069.00"
    });

    deviceInfoModule
      .isCameraPresent()
      .then(isCameraPresent => {
        this.deviceConstants.isCameraPresent = isCameraPresent;
      })
      .catch(() => {
        // is thrown if a camera device could not be queried or opened by the CameraManager on Android
      });

    deviceInfoModule.getCarrier().then(carrier => {
      this.deviceConstants.carrier = carrier;
    });

    deviceInfoModule.getCodename().then(codename => {
      this.deviceConstants.codename = codename;
    });

    deviceInfoModule.getDevice().then(device => {
      this.deviceConstants.device = device;
    });

    deviceInfoModule.getDisplay().then(display => {
      this.deviceConstants.display = display;
    });

    deviceInfoModule.getDeviceName().then(deviceName => {
      this.deviceConstants.deviceName = deviceName;
    });

    deviceInfoModule.getDeviceToken().then(deviceToken => {
      this.deviceConstants.deviceToken = deviceToken;
    });

    deviceInfoModule.getFirstInstallTime().then(firstInstallTime => {
      this.deviceConstants.firstInstallTime = firstInstallTime;
    });

    deviceInfoModule.getFingerprint().then(fingerprint => {
      this.deviceConstants.fingerprint = fingerprint;
    });

    deviceInfoModule.getFontScale().then(fontScale => {
      this.deviceConstants.fontScale = fontScale;
    });

    deviceInfoModule.getFreeDiskStorage().then(freeDiskStorage => {
      this.deviceConstants.freeDiskStorage = freeDiskStorage;
    });

    deviceInfoModule.getFreeDiskStorageOld().then(freeDiskStorage => {
      this.deviceConstants.freeDiskStorage = freeDiskStorage;
    });

    deviceInfoModule.getHardware().then(hardware => {
      this.deviceConstants.hardware = hardware;
    });

    deviceInfoModule.getHost().then(host => {
      this.deviceConstants.host = host;
    });

    deviceInfoModule.getIpAddress().then(ip => {
      this.deviceConstants.ip = ip;
    });

    deviceInfoModule.getIncremental().then(incremental => {
      this.deviceConstants.incremental = incremental;
    });

    deviceInfoModule.getInstallerPackageName().then(installerPackageName => {
      this.deviceConstants.installerPackageName = installerPackageName;
    });

    deviceInfoModule.getInstallReferrer().then(installReferrer => {
      this.deviceConstants.installReferrer = installReferrer;
    });

    deviceInfoModule.getInstanceId().then(instanceId => {
      this.deviceConstants.instanceId = instanceId;
    });

    deviceInfoModule.getLastUpdateTime().then(lastUpdateTime => {
      this.deviceConstants.lastUpdateTime = lastUpdateTime;
    });

    deviceInfoModule.getMacAddress().then(mac => {
      this.deviceConstants.macAddress = mac;
    });

    deviceInfoModule.getManufacturer().then(manufacturer => {
      this.deviceConstants.manufacturer = manufacturer;
    });

    deviceInfoModule.getMaxMemory().then(maxMemory => {
      this.deviceConstants.maxMemory = maxMemory;
    });

    deviceInfoModule.getPhoneNumber().then(phoneNumber => {
      this.deviceConstants.phoneNumber = phoneNumber;
    });

    deviceInfoModule.getPowerState().then(state => {
      this.deviceConstants.powerState = state;
    });

    deviceInfoModule.getProduct().then(product => {
      this.deviceConstants.product = product;
    });

    deviceInfoModule.getPreviewSdkInt().then(previewSdkInt => {
      this.deviceConstants.previewSdkInt = previewSdkInt;
    });

    deviceInfoModule.getSerialNumber().then(serialNumber => {
      this.deviceConstants.serialNumber = serialNumber;
    });

    deviceInfoModule.getSecurityPatch().then(securityPatch => {
      this.deviceConstants.securityPatch = securityPatch;
    });

    deviceInfoModule.getBuildId().then(buildId => {
      this.deviceConstants.buildId = buildId;
    });

    deviceInfoModule.getTags().then(tags => {
      this.deviceConstants.tags = tags;
    });

    deviceInfoModule.getType().then(type => {
      this.deviceConstants.type = type;
    });

    deviceInfoModule.getTotalDiskCapacity().then(capacity => {
      this.deviceConstants.totalDiskCapacity = capacity;
    });

    deviceInfoModule.getTotalDiskCapacityOld().then(capacity => {
      this.deviceConstants.totalDiskCapacityOld = capacity;
    });

    deviceInfoModule.getTotalMemory().then(totalMemory => {
      this.deviceConstants.totalMemory = totalMemory;
    });

    deviceInfoModule.syncUniqueId().then(uniqueId => {
      this.deviceConstants.syncUniqueId = uniqueId;
    });

    deviceInfoModule.getUsedMemory().then(usedMemory => {
      this.deviceConstants.usedMemory = usedMemory;
    });

    deviceInfoModule.getUserAgent().then(userAgent => {
      this.deviceConstants.userAgent = userAgent;
    });

    deviceInfoModule.isAirplaneMode().then(airplaneModeOn => {
      this.deviceConstants.airplaneModeOn = airplaneModeOn;
    });

    deviceInfoModule.isBatteryCharging().then(isCharging => {
      this.deviceConstants.isCharging = isCharging;
    });

    deviceInfoModule.isEmulator().then(isEmulator => {
      this.deviceConstants.isEmulator = isEmulator;
    });

    deviceInfoModule.isPinOrFingerprintSet().then(isPinOrFingerprintSet => {
      this.deviceConstants.isPinOrFingerprintSet = isPinOrFingerprintSet;
    });

    deviceInfoModule.isLandscape().then(isLandscape => {
      this.deviceConstants.isLandscape = isLandscape;
    });

    deviceInfoModule.hasGms().then(hasGms => {
      this.deviceConstants.hasGms = hasGms;
    });

    deviceInfoModule.hasHms().then(hasHms => {
      this.deviceConstants.hasHms = hasHms;
    });

    deviceInfoModule.supported32BitAbis().then(abis => {
      this.deviceConstants.supported32BitAbis = abis;
    });

    deviceInfoModule.supported64BitAbis().then(abis => {
      this.deviceConstants.supported64BitAbis = abis;
    });

    deviceInfoModule.supportedAbis().then(abis => {
      this.deviceConstants.supportedAbis = abis;
    });

    deviceInfoModule.getSystemAvailableFeatures().then(features => {
      this.deviceConstants.systemFeatures = features;
    });

    deviceInfoModule.isLocationEnabled().then(enabled => {
      this.deviceConstants.isLocationEnabled = enabled;
    });

    deviceInfoModule.isHeadphonesConnected().then(enabled => {
      this.deviceConstants.isHeadphonesConnected = enabled;
    });

    deviceInfoModule.getAvailableLocationProviders().then(providers => {
      this.deviceConstants.locationProviders = providers;
    });

    deviceInfoModule.getBrightness().then(brightness => {
      this.deviceConstants.brightness = brightness;
    });
  }

  /**
   * A function which returns the device values for the provided keys.
   * @param {DeviceConstantKeys[]} keys Array for the keys for which we what the values
   * @returns {Partial<DeviceConstants>} Object containing device information for the provided keys
   */
  getByKeys(keys: DeviceConstantKeys[]): Partial<DeviceConstants> {
    const allValues = this.get();
    return pick<DeviceConstants>(allValues, keys);
  }

  /**
   * Function to get device information.
   * @returns {DeviceConstants} Object container device information.
   */
  get(): DeviceConstants {
    return this.deviceConstants;
  }
}
