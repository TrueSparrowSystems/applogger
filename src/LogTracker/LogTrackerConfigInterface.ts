interface UploaderFunc {
  (zipFilePath: string): Promise<boolean>;
}

export interface LogTrackerConfigInterface {
  writeFrequencyInSeconds: number;
  uploadLogs: UploaderFunc;
}
