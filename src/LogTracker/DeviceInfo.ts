import deviceInfoModule from 'react-native-device-info';

export class DeviceInfo {
  appName = deviceInfoModule.getApplicationName();
  brand = deviceInfoModule.getBrand();
  buildNumber = deviceInfoModule.getBuildNumber();
  bundleId = deviceInfoModule.getBundleId();
  deviceId = deviceInfoModule.getDeviceId();
  model = deviceInfoModule.getModel();
  readableVersion = deviceInfoModule.getReadableVersion();
  systemName = deviceInfoModule.getSystemName();
  systemVersion = deviceInfoModule.getSystemVersion();
  uniqueId = deviceInfoModule.getUniqueId();
  version = deviceInfoModule.getVersion();
  isKeyboardConnected = JSON.stringify(deviceInfoModule.isKeyboardConnected());
  isTablet = JSON.stringify(deviceInfoModule.isTablet());
  isTabletMode = JSON.stringify(deviceInfoModule.isTabletMode());
  isMouseConnected = JSON.stringify(deviceInfoModule.isMouseConnected());
  hasNotch = deviceInfoModule.hasNotch();
  type = deviceInfoModule.getDeviceType();
  apiLevel?: number;
  androidId?: string;
  baseOs?: string;
  batteryLevel?: number;
  bootloader?: string;
  isCameraPresent?: boolean;
  carrier?: string;
  codename?: string;
  device?: string;
  display?: string;
  deviceName?: string;
  deviceToken?: string;
  firstInstallTime?: number;
  fingerprint?: string;
  fontScale?: number;
  freeDiskStorage?: number;
  hardware?: string;
  host?: string;
  ip?: string;
  incremental?: string;
  installerPackageName?: string;
  installReferrer?: string;
  instanceId?: string;
  lastUpdateTime?: number;
  macAddress?: string;
  manufacturer?: string;
  maxMemory?: number;
  phoneNumber?: string;
  powerState?: any;
  product?: string;
  previewSdkInt?: number;
  serialNumber?: string;
  securityPatch?: string;
  buildId?: string;
  tags?: string;
  totalDiskCapacity?: number;
  totalDiskCapacityOld?: number;
  totalMemory?: number;
  syncUniqueId?: string;
  usedMemory?: number;
  userAgent?: string;
  airplaneModeOn?: boolean;
  isCharging?: boolean;
  isEmulator?: boolean;
  isPinOrFingerprintSet?: boolean;
  isLandscape?: boolean;
  hasGms?: boolean;
  hasHms?: boolean;
  supported32BitAbis?: string[];
  supported64BitAbis?: string[];
  supportedAbis?: string[];
  systemFeatures?: string[];
  isLocationEnabled?: boolean;
  isHeadphonesConnected?: boolean;
  locationProviders?: any;
  brightness?: number;

  constructor() {
    deviceInfoModule.getApiLevel().then(apiLevel => {
      this.apiLevel = apiLevel;
    });
    deviceInfoModule.getAndroidId().then(androidId => {
      this.androidId = androidId;
    });
    deviceInfoModule.getBaseOs().then(baseOs => {
      this.baseOs = baseOs;
    });
    deviceInfoModule.getBatteryLevel().then(batteryLevel => {
      this.batteryLevel = batteryLevel;
    });
    deviceInfoModule.getBootloader().then(bootloader => {
      this.bootloader = bootloader;
      // "mw8998-002.0069.00"
    });

    deviceInfoModule
      .isCameraPresent()
      .then(isCameraPresent => {
        this.isCameraPresent = isCameraPresent;
      })
      .catch(() => {
        // is thrown if a camera device could not be queried or opened by the CameraManager on Android
      });

    deviceInfoModule.getCarrier().then(carrier => {
      this.carrier = carrier;
    });

    deviceInfoModule.getCodename().then(codename => {
      this.codename = codename;
    });

    deviceInfoModule.getDevice().then(device => {
      this.device = device;
    });

    deviceInfoModule.getDisplay().then(display => {
      this.display = display;
    });

    deviceInfoModule.getDeviceName().then(deviceName => {
      this.deviceName = deviceName;
    });

    deviceInfoModule.getDeviceToken().then(deviceToken => {
      this.deviceToken = deviceToken;
    });

    deviceInfoModule.getFirstInstallTime().then(firstInstallTime => {
      this.firstInstallTime = firstInstallTime;
    });

    deviceInfoModule.getFingerprint().then(fingerprint => {
      this.fingerprint = fingerprint;
    });

    deviceInfoModule.getFontScale().then(fontScale => {
      this.fontScale = fontScale;
    });

    deviceInfoModule.getFreeDiskStorage().then(freeDiskStorage => {
      this.freeDiskStorage = freeDiskStorage;
    });

    deviceInfoModule.getFreeDiskStorageOld().then(freeDiskStorage => {
      this.freeDiskStorage = freeDiskStorage;
    });

    deviceInfoModule.getHardware().then(hardware => {
      this.hardware = hardware;
    });

    deviceInfoModule.getHost().then(host => {
      this.host = host;
    });

    deviceInfoModule.getIpAddress().then(ip => {
      this.ip = ip;
    });

    deviceInfoModule.getIncremental().then(incremental => {
      this.incremental = incremental;
    });

    deviceInfoModule.getInstallerPackageName().then(installerPackageName => {
      this.installerPackageName = installerPackageName;
    });

    deviceInfoModule.getInstallReferrer().then(installReferrer => {
      this.installReferrer = installReferrer;
    });

    deviceInfoModule.getInstanceId().then(instanceId => {
      this.instanceId = instanceId;
    });

    deviceInfoModule.getLastUpdateTime().then(lastUpdateTime => {
      this.lastUpdateTime = lastUpdateTime;
    });

    deviceInfoModule.getMacAddress().then(mac => {
      this.macAddress = mac;
    });

    deviceInfoModule.getManufacturer().then(manufacturer => {
      this.manufacturer = manufacturer;
    });

    deviceInfoModule.getMaxMemory().then(maxMemory => {
      this.maxMemory = maxMemory;
    });

    deviceInfoModule.getPhoneNumber().then(phoneNumber => {
      this.phoneNumber = phoneNumber;
    });

    deviceInfoModule.getPowerState().then(state => {
      this.powerState = JSON.stringify(state);
    });

    deviceInfoModule.getProduct().then(product => {
      this.product = product;
    });

    deviceInfoModule.getPreviewSdkInt().then(previewSdkInt => {
      this.previewSdkInt = previewSdkInt;
    });

    deviceInfoModule.getSerialNumber().then(serialNumber => {
      this.serialNumber = serialNumber;
    });

    deviceInfoModule.getSecurityPatch().then(securityPatch => {
      this.securityPatch = securityPatch;
    });

    deviceInfoModule.getBuildId().then(buildId => {
      this.buildId = buildId;
    });

    deviceInfoModule.getTags().then(tags => {
      this.tags = tags;
    });

    deviceInfoModule.getType().then(type => {
      this.type = type;
    });

    deviceInfoModule.getTotalDiskCapacity().then(capacity => {
      this.totalDiskCapacity = capacity;
    });

    deviceInfoModule.getTotalDiskCapacityOld().then(capacity => {
      this.totalDiskCapacityOld = capacity;
    });

    deviceInfoModule.getTotalMemory().then(totalMemory => {
      this.totalMemory = totalMemory;
    });

    deviceInfoModule.syncUniqueId().then(uniqueId => {
      this.syncUniqueId = uniqueId;
    });

    deviceInfoModule.getUsedMemory().then(usedMemory => {
      this.usedMemory = usedMemory;
    });

    deviceInfoModule.getUserAgent().then(userAgent => {
      this.userAgent = userAgent;
    });

    deviceInfoModule.isAirplaneMode().then(airplaneModeOn => {
      this.airplaneModeOn = airplaneModeOn;
    });

    deviceInfoModule.isBatteryCharging().then(isCharging => {
      this.isCharging = isCharging;
    });

    deviceInfoModule.isEmulator().then(isEmulator => {
      this.isEmulator = isEmulator;
    });

    deviceInfoModule.isPinOrFingerprintSet().then(isPinOrFingerprintSet => {
      this.isPinOrFingerprintSet = isPinOrFingerprintSet;
    });

    deviceInfoModule.isLandscape().then(isLandscape => {
      this.isLandscape = isLandscape;
    });

    deviceInfoModule.hasGms().then(hasGms => {
      this.hasGms = hasGms;
    });

    deviceInfoModule.hasHms().then(hasHms => {
      this.hasHms = hasHms;
    });

    deviceInfoModule.supported32BitAbis().then(abis => {
      this.supported32BitAbis = abis;
    });

    deviceInfoModule.supported64BitAbis().then(abis => {
      this.supported64BitAbis = abis;
    });

    deviceInfoModule.supportedAbis().then(abis => {
      this.supportedAbis = abis;
    });

    deviceInfoModule.getSystemAvailableFeatures().then(features => {
      this.systemFeatures = features;
    });

    deviceInfoModule.isLocationEnabled().then(enabled => {
      this.isLocationEnabled = enabled;
    });

    deviceInfoModule.isHeadphonesConnected().then(enabled => {
      this.isHeadphonesConnected = enabled;
    });

    deviceInfoModule.getAvailableLocationProviders().then(providers => {
      this.locationProviders = JSON.stringify(providers);
    });

    deviceInfoModule.getBrightness().then(brightness => {
      this.brightness = brightness;
    });
  }

  get() {
    return {
      appName: this.appName,
      brand: this.brand,
      buildNumber: this.buildNumber,
      bundleId: this.bundleId,
      deviceId: this.deviceId,
      model: this.model,
      readableVersion: this.readableVersion,
      systemName: this.systemName,
      systemVersion: this.systemVersion,
      uniqueId: this.uniqueId,
      version: this.version,
      isKeyboardConnected: this.isKeyboardConnected,
      isTablet: this.isTablet,
      isTabletMode: this.isTabletMode,
      isMouseConnected: this.isMouseConnected,
      hasNotch: this.hasNotch,
      type: this.type,
      apiLevel: this.apiLevel,
      androidId: this.androidId,
      baseOs: this.baseOs,
      batteryLevel: this.batteryLevel,
      bootloader: this.bootloader,
      isCameraPresent: this.isCameraPresent,
      carrier: this.carrier,
      codename: this.codename,
      device: this.device,
      display: this.display,
      deviceName: this.deviceName,
      deviceToken: this.deviceToken,
      firstInstallTime: this.firstInstallTime,
      fingerprint: this.fingerprint,
      fontScale: this.fontScale,
      freeDiskStorage: this.freeDiskStorage,
      hardware: this.hardware,
      host: this.host,
      ip: this.ip,
      incremental: this.incremental,
      installerPackageName: this.installerPackageName,
      installReferrer: this.installReferrer,
      instanceId: this.instanceId,
      lastUpdateTime: this.lastUpdateTime,
      macAddress: this.macAddress,
      manufacturer: this.manufacturer,
      maxMemory: this.maxMemory,
      phoneNumber: this.phoneNumber,
      powerState: this.powerState,
      product: this.product,
      previewSdkInt: this.previewSdkInt,
      serialNumber: this.serialNumber,
      securityPatch: this.securityPatch,
      buildId: this.buildId,
      tags: this.tags,
      totalDiskCapacity: this.totalDiskCapacity,
      totalDiskCapacityOld: this.totalDiskCapacityOld,
      totalMemory: this.totalMemory,
      syncUniqueId: this.syncUniqueId,
      usedMemory: this.usedMemory,
      userAgent: this.userAgent,
      airplaneModeOn: this.airplaneModeOn,
      isCharging: this.isCharging,
      isEmulator: this.isEmulator,
      isPinOrFingerprintSet: this.isPinOrFingerprintSet,
      isLandscape: this.isLandscape,
      hasGms: this.hasGms,
      hasHms: this.hasHms,
      supported32BitAbis: this.supported32BitAbis,
      supported64BitAbis: this.supported64BitAbis,
      supportedAbis: this.supportedAbis,
      systemFeatures: this.systemFeatures,
      isLocationEnabled: this.isLocationEnabled,
      isHeadphonesConnected: this.isHeadphonesConnected,
      locationProviders: this.locationProviders,
      brightness: this.brightness,
    };
  }
}
