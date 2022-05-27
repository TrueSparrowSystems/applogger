import {TrackInterface} from './TrackInterface';

export class DataParser {
  static getUserActionData(sessionLogs: any) {
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

  static getDevLogs(sessionLogs: any) {
    const steps: string[] = [];
    let stepCount = 0;

    for (let index = 0; index < sessionLogs.length; index++) {
      const dataChunk = sessionLogs[index];

      const chunkValue = Object.values(dataChunk);
      for (let subIndex = 0; subIndex < chunkValue.length; subIndex++) {
        const log = chunkValue[subIndex] as TrackInterface;
        stepCount++;
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
                <div class="text" style="font-family: monospace; max-width: 30vw;">${JSON.stringify(
                  log.params,
                )}</div>
              </div>
            </div>
          `,
        );
      }
    }
    return steps.join('');
  }
}
