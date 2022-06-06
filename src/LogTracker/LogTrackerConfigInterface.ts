export interface LogTrackerConfigInterface {
  writeFrequencyInSeconds: number;
  uploadLogs?: (
    sessionLogFilePaths: string[],
    onUploadComplete: Function,
  ) => Promise<boolean>;
  clearStorageOnLogUpload: boolean;
  isTrackingDisabled?: boolean;
  logRotateDurationInHours?: number;
  sensitiveDataKeywords?: string[];
}
