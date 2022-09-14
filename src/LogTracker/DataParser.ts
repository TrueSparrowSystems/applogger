import {TrackInterface} from './TrackInterface';

export class DataParser {
  /**
   * @static function to get user action data of a session as HTML table
   * @param  {any} sessionLogs
   * @returns string
   */
  static getUserActionData(sessionLogs: any): string {
    const steps: string[] = [];
    let stepCount = 0;
    for (let index = 0; index < sessionLogs.length; index++) {
      const dataChunk = sessionLogs[index];

      const chunkValue = Object.values(dataChunk);
      for (let subIndex = 0; subIndex < chunkValue.length; subIndex++) {
        const log = chunkValue[subIndex] as TrackInterface;
        if (log.description) {
          stepCount++;
          steps.push(
            `
            <div class="div-table-row">
                    <div class="div-table-col1"><div class="text">${stepCount}</div></div>
                    <div class="div-table-col2"><div class="text">${log.description}</div></div>
                  </div>
            `,
          );
        }
      }
    }
    return steps.join('');
  }

  /**
   * @static function to get dev logs of a session as HTML table
   * @param  {any} sessionLogs
   * @returns string
   */
  static getDevLogs(sessionLogs: any, pageNumber: number = 1): string {
    const steps: string[] = [];
    let stepCount = 0;

    for (let index = 0; index < sessionLogs.length; index++) {
      if (stepCount > pageNumber * 10) {
        break;
      }

      const dataChunk = sessionLogs[index];

      const chunkValue = Object.values(dataChunk);
      for (let subIndex = 0; subIndex < chunkValue.length; subIndex++) {
        const log = chunkValue[subIndex] as TrackInterface;
        stepCount++;
        if (stepCount > (pageNumber - 1) * 10 && stepCount <= pageNumber * 10) {
          steps.push(
            `
            <div class="div-table-row-value">
            <div class="div-table-dev-logs-col1">
                  <div class="text">${stepCount}</div>
                </div>
                <div class="div-table-dev-logs-col2">
                  <div class="text">${log.ts}</div>
                </div>
                <div class="div-table-dev-logs-col3"> 
                  <div class="text">${log.type}</div>
                </div>
                <div class="div-table-dev-logs-col4"> 
                  <div class="text" style="font-family: monospace; color: #A1C3FF; max-width: 30vw;">${JSON.stringify(
                    log.params,
                  )}</div>
                </div>
              </div>
          `,
          );
        }
      }
    }
    return steps.join('');
  }

  /**
   * @param  {any} sessionLogs
   * @returns number
   */
  static getTotalSteps(sessionLogs: any): number {
    let totalNumberOfSteps: number = 0;
    for (let index = 0; index < sessionLogs.length; index++) {
      const dataChunk = sessionLogs[index];
      const chunkValue = Object.values(dataChunk);
      totalNumberOfSteps += chunkValue.length;
    }
    return totalNumberOfSteps;
  }
}
