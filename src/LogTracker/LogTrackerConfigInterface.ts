export interface UploaderFunctionInterface {
  (zipFilePath: string, onUploadComplete: Function): Promise<boolean>;
}

export interface LogTrackerConfigInterface {
  writeFrequencyInSeconds: number;
  uploadLogs: UploaderFunctionInterface;
  clearStorageOnLogUpload: boolean;
  isTrackingDisabled?: boolean;
  logRotateDurationInHours?: number;
}
