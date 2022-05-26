export interface LogTrackerConfigInterface {
  writeFrequencyInSeconds: number;
}

export enum LogType {
  Unknown = 'log_type_unknown',
  Action = 'log_type_action',
}
