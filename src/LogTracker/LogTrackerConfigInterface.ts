export interface UploaderFunc {
  (zipFilePath: string, onUploadComplete: Function): Promise<boolean>;
}

export interface LogTrackerConfigInterface {
  writeFrequencyInSeconds: number;
  uploadLogs: UploaderFunc;
  clearStorageOnLogUpload: boolean;
}
