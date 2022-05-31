export type DeviceConstants = {
  appName?: string;
  brand?: string;
  buildNumber?: string;
  bundleId?: string;
  deviceId?: string;
  model?: string;
  readableVersion?: string;
  systemName?: string;
  systemVersion?: string;
  uniqueId?: string;
  version?: string;
  type?: string;
  isTablet?: boolean;
  hasNotch?: boolean;
  isKeyboardConnected?: boolean;
  isTabletMode?: boolean;
  isMouseConnected?: boolean;
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
};
export type DeviceConstantKeys = keyof DeviceConstants;