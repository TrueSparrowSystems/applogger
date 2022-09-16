import {isArray, isEmpty, isNull, isUndefined} from 'lodash';
import moment from 'moment';
import {Share} from 'react-native';
import deviceInfoModule from 'react-native-device-info';
import {getLogTracker} from '../LogTracker';
import {DataParser} from '../LogTracker/DataParser';
import {LogTrackerConfigInterface} from '../LogTracker/LogTrackerConfigInterface';
import {sessionDash} from '../pages/sessionDashboard';
import {
  devLogDiv,
  emptyUserActionSteps,
  sessionDetails,
  userActionDiv,
} from '../pages/sessionDetails';

var httpBridge = require('react-native-http-bridge');

export const URL_PARAM_DELIMITER: string = '$';

export const DEFAULT_SERVER_PORT = 5561;
class WebServerHelper {
  port: number | undefined;
  loggerConfig: LogTrackerConfigInterface | undefined;
  logTracker;

  constructor(loggerConfig?: LogTrackerConfigInterface) {
    this.loggerConfig = loggerConfig;
    this.logTracker = getLogTracker(this.loggerConfig);
  }
  /**
   * @public Function which starts a web server on a given `port`.
   * @param port Port on which the web server will start.
   */
  startWebServer(port: number = DEFAULT_SERVER_PORT) {
    this.port = port;
    httpBridge.start(this.port, 'http_service', (request: any) => {
      this.onStart(request);
    });
  }

  /**
   * @public Function to stop the running web server.
   */
  stopWebServer() {
    httpBridge.stop();
  }

  /**
   * @public Function which prepares the Log tracker UI URL.
   * @returns {Promise<string>} A promise which resolves to URL string.
   */
  getUIUrl(): Promise<string> {
    return new Promise((resolve, reject) => {
      deviceInfoModule
        .getIpAddress()
        .then(ipAddr => {
          const uiUrl = `http://${ipAddr}:${this.port}/session`;
          resolve(uiUrl);
        })
        .catch(reject);
    });
  }

  /**
   * @public Function which opens the native share dialog.
   */
  shareUIUrl() {
    this.getUIUrl().then((url: string) => {
      const shareContent = {
        title: 'Log Tracker UI URL',
        url: url,
        message: url,
      };

      Share.share(shareContent).catch(() => {});
    });
  }

  getPaginationComponent(
    baseUrl: string,
    numberOfPages: number,
    currentIndex: number,
  ) {
    function saveNextPage(pageNum: number): string {
      return `onclick="return saveCurrentPageNumber(${pageNum});"`;
    }

    const leftArrow = `<svg width="11" height="21" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 19.5L1 10.5L10 1.5" stroke="#36415F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>`;

    const rightArrow = `<svg width="11" height="21" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1.5L10 10.5L1 19.5" stroke="#36415F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>`;

    const leftArrowComponent = ` <a href="${baseUrl}${
      currentIndex - 1
    }" class="${
      currentIndex === 1 ? 'disabled' : ''
    } pagination-arrows" ${saveNextPage(currentIndex - 1)}>
                                      ${leftArrow}
                                  </a>`;

    const firstPageButtonComponent = `<a href="${baseUrl}1" ${saveNextPage(
      1,
    )}>1</a>`;

    const paginationListSeparatorComponent = ` <div class="pagination-list-separator" >
                                                ...
                                                </div>`;

    const lastPageButtonComponent = `<a href="${baseUrl}${numberOfPages}" ${saveNextPage(
      numberOfPages,
    )}>${numberOfPages}</a>`;

    const rightArrowComponent = ` <a href="${baseUrl}${
      currentIndex + 1
    }" class="${
      currentIndex === numberOfPages ? 'disabled' : ''
    } pagination-arrows" ${saveNextPage(currentIndex + 1)}>
      ${rightArrow}
  </a>`;

    const renderMiddlePageButtons = () => {
      if (numberOfPages <= 5) {
        return [...Array(numberOfPages).keys()].map(val => {
          const finalValue = val + 1;
          return `<a href="${baseUrl}${finalValue}" class="${
            finalValue === currentIndex ? 'active' : ''
          }" ${saveNextPage(finalValue)}>${finalValue}</a>`;
        });
      } else {
        const isEndIndices = currentIndex + 2 >= numberOfPages;
        const isStartIndices = currentIndex <= 2;

        const values = [
          isEndIndices ? numberOfPages - 2 : isStartIndices ? 1 : currentIndex,
          isEndIndices
            ? numberOfPages - 1
            : isStartIndices
            ? 2
            : currentIndex + 1,
          isEndIndices ? numberOfPages : isStartIndices ? 3 : currentIndex + 2,
        ];

        if (currentIndex === numberOfPages - 3) {
          values.push(numberOfPages);
        }

        return values.map(val => {
          return `<a href="${baseUrl}${val}" class="${
            val === currentIndex ? 'active' : ''
          }" ${saveNextPage(val)}>${val}</a>`;
        });
      }
    };

    return `<div class="pagination">
                ${leftArrowComponent}

                ${
                  currentIndex >= 3 && numberOfPages > 5
                    ? firstPageButtonComponent
                    : ''
                }

                ${
                  currentIndex >= 3 && numberOfPages > 5
                    ? paginationListSeparatorComponent
                    : ''
                }

                ${renderMiddlePageButtons()}

                ${
                  currentIndex < numberOfPages - 3 && numberOfPages > 5
                    ? paginationListSeparatorComponent
                    : ''
                }

                ${
                  currentIndex < numberOfPages - 3 && numberOfPages > 5
                    ? lastPageButtonComponent
                    : ''
                }

                ${rightArrowComponent}
            </div>`;
  }

  /**
   * @param  {string} string
   * @param  {Record<string} replaceObject
   * @param  {} any>
   * @returns string
   */
  replace(string: string, replaceObject: Record<string, any>): string {
    let result: string = string;
    if (replaceObject && !!string) {
      Object.entries(replaceObject).forEach(([key, value]) => {
        if (!!key && !isNull(value) && !isUndefined(value)) {
          result = result.replace(`{{${key}}}`, value);
        }
      });
    }

    return result;
  }
  /**
   * @public Function which runs on webserver start
   * @param  {any} request object
   */
  onStart(request: any) {
    const requestUrlComponents = request.url.split('/');

    const urlParamsArray: string[] =
      requestUrlComponents[2]?.split?.(URL_PARAM_DELIMITER) || [];

    const sessionId = urlParamsArray?.[0];

    if (request.type === 'POST' && requestUrlComponents[3] === 'download') {
      if (sessionId) {
        this.logTracker
          .getSessionDetails(sessionId)
          .then(res => {
            return httpBridge.respond(
              request.requestId,
              200,
              'application/json',
              JSON.stringify(res),
            );
          })
          .catch(() => {
            httpBridge.respond(
              request.requestId,
              500,
              'application/json',
              '{"message": "Bad Request"}',
            );
          });
      }
    } else if (
      request.type === 'POST' &&
      requestUrlComponents[3] === 'logBug'
    ) {
      if (sessionId) {
        this.logTracker
          .toggleBugStatusBySessionId(sessionId)
          .then(() => {
            return httpBridge.respond(request.requestId, 200);
          })
          .catch(() => {
            httpBridge.respond(request.requestId, 500);
          });
      }
    }

    // you can use request.url, request.type and request.postData here
    else if (
      request.type === 'GET' &&
      requestUrlComponents[1].includes('session')
    ) {
      //URL params for Session Dashboard route.
      const urlParamsArrayForSessionDashboard: string[] =
        requestUrlComponents[1]?.split?.(URL_PARAM_DELIMITER);
      if (urlParamsArrayForSessionDashboard[0] === 'session') {
        if (requestUrlComponents.length >= 3 && sessionId) {
          this.logTracker.getSessionDetails(sessionId).then(sessionData => {
            const deviceInfo: any = this.logTracker.getDeviceInfo();
            const deviceInfoData: string[] = [];
            const deviceName = deviceInfo.deviceName;
            if (deviceInfo) {
              for (const key in deviceInfo) {
                if (Object.prototype.hasOwnProperty.call(deviceInfo, key)) {
                  let infoValue = deviceInfo[key];
                  if (key !== 'uniqueId') {
                    if (typeof infoValue === 'object' && !isArray(infoValue)) {
                      const dataArray: Array<string> = [];
                      Object.keys(infoValue).map(objectKey => {
                        dataArray.push(
                          `${objectKey}: <span style="font-weight: 400;">${infoValue[objectKey]}</span>`,
                        );
                      });
                      infoValue = '<br/>' + dataArray.join('<br/>');
                    }
                    const infoKey = key.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ');
                    deviceInfoData.push(`
                                        
                     <div class="device-info-text">${infoKey}: &nbsp; <span style="font-weight: 700;">${infoValue}</span></div>
                    `);
                  }
                }
              }
            }
            const isBug = this.logTracker.getBugStatusBySessionId(sessionId);
            const bugButton = `
              <div onclick="toggleBug()" class="action-button">
                  <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:${
                    isBug ? 'block' : 'none'
                  };">
                      <path d="M18.7718 4.15615C18.7245 3.24599 18.9562 1.03558 21.2541 1.03558" stroke="white" stroke-width="1.56029" stroke-linejoin="round"/>
                      <path d="M13.4823 4.10856C13.5296 3.20175 13.298 0.999512 11.0003 0.999512" stroke="white" stroke-width="1.56029" stroke-linejoin="round"/>
                      <circle cx="16.1064" cy="7.52381" r="4.96454" fill="#F2F2F2"/>
                      <path d="M21.0705 7.52381C21.0705 10.2657 18.8478 12.4884 16.106 12.4884C16.106 10.5569 16.106 10.2657 16.106 7.52381C16.106 4.78197 16.1061 3.72143 16.106 2.55927C18.8478 2.55927 21.0705 4.78197 21.0705 7.52381Z" fill="#CECECE"/>
                      <path d="M25.468 12.8088L28.8014 11.8869L30.8226 7.59607" stroke="white" stroke-width="1.20567" stroke-linejoin="round"/>
                      <path d="M6.67407 12.7734L3.34074 11.8703L1.31946 7.66705" stroke="white" stroke-width="1.20567" stroke-linejoin="round"/>
                      <path d="M25.1141 22.7745L28.4475 23.7028L30.4688 28.0228" stroke="white" stroke-width="1.20567" stroke-linejoin="round"/>
                      <path d="M7.02893 22.7733L3.69559 23.689L1.67432 27.9506" stroke="white" stroke-width="1.20567" stroke-linejoin="round"/>
                      <path d="M25.0071 17.1705H27.9149L31 20.2556" stroke="white" stroke-width="1.20567" stroke-linejoin="round"/>
                      <path d="M6.99292 17.1705H4.08512L1.00001 20.2727" stroke="white" stroke-width="1.20567" stroke-linejoin="round"/>
                      <circle cx="16.071" cy="19.9712" r="9.60994" fill="#FFA900"/>
                      <path d="M25.681 19.9712C25.681 25.2786 21.3785 29.5811 16.0711 29.5811C16.071 27.6457 16.0711 25.2786 16.0711 19.9712C16.0711 14.6638 16.0711 13.0887 16.0711 10.3613C21.3785 10.3613 25.681 14.6638 25.681 19.9712Z" fill="#E47700"/>
                      <mask id="path-13-inside-1_576_1171" fill="white">
                      <path d="M6.46106 7.87891H25.6809V20.0066H6.46106V7.87891Z"/>
                      </mask>
                      <path d="M6.46106 7.87891H25.6809V20.0066H6.46106V7.87891Z" fill="#FFA900"/>
                      <path d="M6.46106 7.87891V6.67323H5.25538V7.87891H6.46106ZM25.6809 7.87891H26.8866V6.67323H25.6809V7.87891ZM25.6809 20.0066V21.2123H26.8866V20.0066H25.6809ZM6.46106 20.0066H5.25538V21.2123H6.46106V20.0066ZM6.46106 9.08458H25.6809V6.67323H6.46106V9.08458ZM24.4753 7.87891V20.0066H26.8866V7.87891H24.4753ZM25.6809 18.8009H6.46106V21.2123H25.6809V18.8009ZM7.66673 20.0066V7.87891H5.25538V20.0066H7.66673Z" fill="#FFA900" mask="url(#path-13-inside-1_576_1171)"/>
                      <path d="M16.1267 7.87891H25.6811V20.0066H16.1267V7.87891Z" fill="#E47700"/>
                  </svg>
                  <svg width="32" height="30.316" viewBox="0 0 32 30.316" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:${
                    !isBug ? 'block' : 'none'
                  }">
                  <path d="M25.036 12.953L28.217 12.073L30.147 7.978" stroke="white" stroke-width="1.1506778947368421" stroke-linejoin="round"/>
                  <path d="M7.1 12.92L3.918 12.058L1.989 8.046" stroke="white" stroke-width="1.1506778947368421" stroke-linejoin="round"/>
                  <path d="M24.698 22.463L27.879 23.349L29.808 27.472" stroke="white" stroke-width="1.1506778947368421" stroke-linejoin="round"/>
                  <path d="M7.438 22.463L4.256 23.337L2.327 27.404" stroke="white" stroke-width="1.1506778947368421" stroke-linejoin="round"/>
                  <mask id="path-5-inside-1_523_344" fill="white">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.828 8.249C20.836 8.137 20.84 8.024 20.84 7.91C20.84 5.294 18.718 3.172 16.101 3.172C13.485 3.172 11.363 5.294 11.363 7.91C11.363 8.024 11.367 8.137 11.375 8.249H6.896V19.824H6.896C6.915 24.874 11.014 28.962 16.068 28.962C21.133 28.962 25.24 24.855 25.24 19.79L25.239 19.731V8.249H20.828Z"/>
                  </mask>
                  <path d="M20.828 8.249L19.68 8.168L19.593 9.4H20.828V8.249ZM11.375 8.249V9.4H12.61L12.523 8.168L11.375 8.249ZM6.896 8.249V7.099H5.745V8.249H6.896ZM6.896 19.824H5.745V20.974H6.896V19.824ZM6.896 19.824L8.047 19.82L8.043 18.673H6.896V19.824ZM25.24 19.79H26.39L26.39 19.786L25.24 19.79ZM25.239 19.731H24.089L24.089 19.734L25.239 19.731ZM25.239 8.249H26.39V7.099H25.239V8.249ZM19.689 7.91C19.689 7.997 19.686 8.083 19.68 8.168L21.975 8.33C21.985 8.191 21.99 8.051 21.99 7.91H19.689ZM16.101 4.323C18.083 4.323 19.689 5.929 19.689 7.91H21.99C21.99 4.658 19.354 2.022 16.101 2.022V4.323ZM12.514 7.91C12.514 5.929 14.12 4.323 16.101 4.323V2.022C12.849 2.022 10.213 4.658 10.213 7.91H12.514ZM12.523 8.168C12.517 8.083 12.514 7.997 12.514 7.91H10.213C10.213 8.051 10.218 8.191 10.228 8.33L12.523 8.168ZM11.375 7.099H6.896V9.4H11.375V7.099ZM5.745 8.249V19.824H8.047V8.249H5.745ZM6.896 20.974H6.896V18.673H6.896V20.974ZM5.746 19.828C5.766 25.511 10.38 30.112 16.068 30.112V27.811C11.648 27.811 8.063 24.236 8.047 19.82L5.746 19.828ZM16.068 30.112C21.769 30.112 26.39 25.491 26.39 19.79H24.089C24.089 24.22 20.498 27.811 16.068 27.811V30.112ZM26.39 19.786L26.39 19.727L24.089 19.734L24.089 19.794L26.39 19.786ZM26.39 19.731V8.249H24.089V19.731H26.39ZM25.239 7.099H20.828V9.4H25.239V7.099Z" fill="white" mask="url(#path-5-inside-1_523_344)"/>
                  <path d="M24.596 17.116H27.371L30.316 20.06" stroke="white" stroke-width="1.1506778947368421" stroke-linejoin="round"/>
                  <path d="M7.404 17.116H4.629L1.684 20.077" stroke="white" stroke-width="1.1506778947368421" stroke-linejoin="round"/>
                  <path d="M18.645 4.695C18.599 3.827 18.821 1.717 21.014 1.717" stroke="white" stroke-width="1.4891132631578947" stroke-linejoin="round"/>
                  <path d="M13.597 4.651C13.642 3.786 13.421 1.684 11.228 1.684" stroke="white" stroke-width="1.4891132631578947" stroke-linejoin="round"/>
                </svg>
                
             </div>`;

            let paginationComponent = '';
            const totalNumberOfSteps = DataParser.getTotalSteps(sessionData);
            const numberOfPages = Math.ceil(totalNumberOfSteps / 10);
            const currentIndex = parseInt(urlParamsArray?.[1], 10) || 1;
            if (numberOfPages > 1) {
              const baseUrl = `${sessionId}${URL_PARAM_DELIMITER}`;
              paginationComponent = this.getPaginationComponent(
                baseUrl,
                numberOfPages,
                currentIndex,
              );
            }

            const userActionsSteps = DataParser.getUserActionData(sessionData);
            const devLogSteps = DataParser.getDevLogs(
              sessionData,
              currentIndex,
            );

            let responseHtml = this.replace(sessionDetails, {
              user_actions: isEmpty(userActionsSteps)
                ? emptyUserActionSteps
                : this.replace(userActionDiv, {
                    user_action_steps: userActionsSteps,
                  }),
              dev_logs: isEmpty(devLogSteps)
                ? ''
                : this.replace(devLogDiv, {
                    dev_log_steps: devLogSteps,
                    pagination_component: paginationComponent,
                  }),
              device_info: deviceInfoData.join(''),
              device_name: deviceName,
              sessionId: sessionId,
              bug_button: bugButton,
            });
            httpBridge.respond(
              request.requestId,
              200,
              'text/html',
              responseHtml,
            );
          });
        } else {
          const currentIndex =
            parseInt(urlParamsArrayForSessionDashboard[1], 10) || 1;
          if (currentIndex === 0) {
            httpBridge.respond(
              request.requestId,
              400,
              'application/json',
              '{"message": "Bad Request"}',
            );
          } else {
            // const sessionData = [];
            let totalNumberOfSteps = 0;
            const allSessions: Record<string, any> =
              this.logTracker.getAllSessions();
            if (allSessions) {
              const allKeys = Object.keys(allSessions);
              allKeys.reverse();
              const numberOfPages = Math.ceil(allKeys.length / 10);
              let sessionDataMap: Record<string, Array<string>> = {};
              for (let index = 0; index < allKeys.length; index++) {
                const pageNumber = Math.floor(index / 10) + 1;
                const key = allKeys[index];
                this.logTracker
                  .getSessionDetails(key)
                  .then(currentSessionData => {
                    let numberOfSteps = 0;
                    if (Array.isArray(currentSessionData)) {
                      for (
                        let currentSessionDataIndex = 0;
                        currentSessionDataIndex < currentSessionData.length;
                        currentSessionDataIndex++
                      ) {
                        const dataChunk =
                          currentSessionData[currentSessionDataIndex];
                        const chunkValue = Object.values(dataChunk);
                        numberOfSteps += chunkValue.length;
                      }
                    }
                    totalNumberOfSteps += numberOfSteps;
                    if (
                      index >= (currentIndex - 1) * 10 &&
                      index < currentIndex * 10
                    ) {
                      const isBug =
                        this.logTracker.getBugStatusBySessionId(key);
                      const sessionDataArray = sessionDataMap[pageNumber] || [];
                      if (
                        Object.prototype.hasOwnProperty.call(allSessions, key)
                      ) {
                        const ts = allSessions[key];
                        sessionDataArray.push(`
                                  <div class="div-table-row">
                                  <div class="div-table-col0">
                                      <div class="div-download-button" onclick="toggleBug('${key.toString()}')" >
                                           <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:${
                                             !isBug ? 'block' : 'none'
                                           };">
                                              <path d="M14.8652 7.69099L16.7541 7.16853L17.8995 4.73709" stroke="white" stroke-width="0.683215" stroke-linejoin="round"/>
                                              <path d="M4.21533 7.67096L2.32644 7.15916L1.18105 4.77734" stroke="white" stroke-width="0.683215" stroke-linejoin="round"/>
                                              <path d="M14.6643 13.3376L16.5532 13.8636L17.6986 16.3116" stroke="white" stroke-width="0.683215" stroke-linejoin="round"/>
                                              <path d="M4.41614 13.3376L2.52725 13.8565L1.38186 16.2714" stroke="white" stroke-width="0.683215" stroke-linejoin="round"/>
                                              <mask id="path-5-inside-1_523_344" fill="white">
                                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3664 4.89801C12.3711 4.83154 12.3735 4.76444 12.3735 4.69678C12.3735 3.14307 11.114 1.88354 9.56026 1.88354C8.00655 1.88354 6.74702 3.14307 6.74702 4.69678C6.74702 4.76444 6.74941 4.83154 6.75411 4.89801H4.0946V11.7703H4.09475C4.10553 14.7687 6.53947 17.196 9.54034 17.196C12.5479 17.196 14.986 14.7579 14.986 11.7504L14.9859 11.715V4.89801H12.3664Z"/>
                                              </mask>
                                              <path d="M12.3664 4.89801L11.6849 4.84984L11.6332 5.58122H12.3664V4.89801ZM6.75411 4.89801V5.58122H7.48731L7.43562 4.84984L6.75411 4.89801ZM4.0946 4.89801V4.21479H3.41139V4.89801H4.0946ZM4.0946 11.7703H3.41139V12.4536H4.0946V11.7703ZM4.09475 11.7703L4.77796 11.7679L4.77552 11.0871H4.09475V11.7703ZM14.986 11.7504H15.6692L15.6692 11.7482L14.986 11.7504ZM14.9859 11.715H14.3026L14.3026 11.7171L14.9859 11.715ZM14.9859 4.89801H15.6691V4.21479H14.9859V4.89801ZM11.6903 4.69678C11.6903 4.74835 11.6885 4.79939 11.6849 4.84984L13.0479 4.94617C13.0538 4.86369 13.0567 4.78053 13.0567 4.69678H11.6903ZM9.56026 2.56676C10.7366 2.56676 11.6903 3.5204 11.6903 4.69678H13.0567C13.0567 2.76575 11.4913 1.20033 9.56026 1.20033V2.56676ZM7.43024 4.69678C7.43024 3.5204 8.38388 2.56676 9.56026 2.56676V1.20033C7.62922 1.20033 6.06381 2.76575 6.06381 4.69678H7.43024ZM7.43562 4.84984C7.43206 4.79939 7.43024 4.74836 7.43024 4.69678H6.06381C6.06381 4.78053 6.06676 4.86369 6.07259 4.94617L7.43562 4.84984ZM6.75411 4.21479H4.0946V5.58122H6.75411V4.21479ZM3.41139 4.89801V11.7703H4.77782V4.89801H3.41139ZM4.0946 12.4536H4.09475V11.0871H4.0946V12.4536ZM3.41154 11.7728C3.42367 15.1474 6.16297 17.8792 9.54034 17.8792V16.5128C6.91598 16.5128 4.78739 14.39 4.77796 11.7679L3.41154 11.7728ZM9.54034 17.8792C12.9252 17.8792 15.6692 15.1352 15.6692 11.7504H14.3028C14.3028 14.3806 12.1706 16.5128 9.54034 16.5128V17.8792ZM15.6692 11.7482L15.6691 11.7128L14.3026 11.7171L14.3028 11.7525L15.6692 11.7482ZM15.6691 11.715V4.89801H14.3026V11.715H15.6691ZM14.9859 4.21479H12.3664V5.58122H14.9859V4.21479Z" fill="white" mask="url(#path-5-inside-1_523_344)"/>
                                              <path d="M14.604 10.1626H16.2518L18 11.9109" stroke="white" stroke-width="0.683215" stroke-linejoin="round"/>
                                              <path d="M4.396 10.1626H2.74824L1.00002 11.9205" stroke="white" stroke-width="0.683215" stroke-linejoin="round"/>
                                              <path d="M11.0702 2.78794C11.0434 2.27218 11.1747 1.01962 12.4768 1.01962" stroke="white" stroke-width="0.884161" stroke-linejoin="round"/>
                                              <path d="M8.0731 2.76164C8.09989 2.24778 7.96861 0.999847 6.66662 0.999847" stroke="white" stroke-width="0.884161" stroke-linejoin="round"/>
                                          </svg>
                                          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:${
                                            isBug ? 'block' : 'none'
                                          };">
                                              <path d="M11.0707 2.7885C11.0439 2.27273 11.1752 1.02017 12.4773 1.02017" stroke="white" stroke-width="0.884162" stroke-linejoin="round"/>
                                              <path d="M8.07334 2.76155C8.10013 2.24769 7.96885 0.999756 6.66686 0.999756" stroke="white" stroke-width="0.884162" stroke-linejoin="round"/>
                                              <circle cx="9.56031" cy="4.69682" r="2.81324" fill="#F2F2F2"/>
                                              <path d="M12.3733 4.69682C12.3733 6.25053 11.1138 7.51006 9.56006 7.51006C9.56006 6.41556 9.56006 6.25053 9.56006 4.69682C9.56006 3.14311 9.56014 2.54214 9.56006 1.88358C11.1138 1.88358 12.3733 3.14311 12.3733 4.69682Z" fill="#CECECE"/>
                                              <path d="M14.8652 7.69167L16.7541 7.16921L17.8995 4.73776" stroke="white" stroke-width="0.683216" stroke-linejoin="round"/>
                                              <path d="M4.21533 7.67164L2.32644 7.15984L1.18105 4.77802" stroke="white" stroke-width="0.683216" stroke-linejoin="round"/>
                                              <path d="M14.6647 13.3389L16.5536 13.8649L17.699 16.3129" stroke="white" stroke-width="0.683216" stroke-linejoin="round"/>
                                              <path d="M4.41638 13.3382L2.52749 13.8571L1.3821 16.272" stroke="white" stroke-width="0.683216" stroke-linejoin="round"/>
                                              <path d="M14.604 10.1633H16.2518L18 11.9115" stroke="white" stroke-width="0.683216" stroke-linejoin="round"/>
                                              <path d="M4.396 10.1633H2.74824L1.00001 11.9212" stroke="white" stroke-width="0.683216" stroke-linejoin="round"/>
                                              <circle cx="9.54024" cy="11.7503" r="5.44563" fill="#FFA900"/>
                                              <path d="M14.9859 11.7503C14.9859 14.7579 12.5478 17.196 9.5403 17.196C9.54026 16.0992 9.54029 14.7579 9.54029 11.7503C9.54029 8.74281 9.5403 7.85026 9.5403 6.30472C12.5478 6.30472 14.9859 8.74281 14.9859 11.7503Z" fill="#E47700"/>
                                              <mask id="path-13-inside-1_523_460" fill="white">
                                                  <path d="M4.0946 4.89804H14.9859V11.7704H4.0946V4.89804Z"/>
                                              </mask>
                                              <path d="M4.0946 4.89804H14.9859V11.7704H4.0946V4.89804Z" fill="#FFA900"/>
                                              <path d="M4.0946 4.89804V4.21482H3.41139V4.89804H4.0946ZM14.9859 4.89804H15.6691V4.21482H14.9859V4.89804ZM14.9859 11.7704V12.4536H15.6691V11.7704H14.9859ZM4.0946 11.7704H3.41139V12.4536H4.0946V11.7704ZM4.0946 5.58126H14.9859V4.21482H4.0946V5.58126ZM14.3027 4.89804V11.7704H15.6691V4.89804H14.3027ZM14.9859 11.0872H4.0946V12.4536H14.9859V11.0872ZM4.77782 11.7704V4.89804H3.41139V11.7704H4.77782Z" fill="#FFA900" mask="url(#path-13-inside-1_523_460)"/>
                                              <path d="M9.57178 4.89804H14.9859V11.7704H9.57178V4.89804Z" fill="#E47700"/>
                                          </svg>
                                      </div>
                                  </div>
                                      <div class="div-table-col1"><div class="text"><a class="link-text" href="/session/${key}">${key}</a></div></div>
                                      <div class="div-table-col2"><div class="text">${moment(
                                        ts,
                                      ).format(
                                        'DD MMM YYYY hh:mm:ss',
                                      )}</div></div>
                                      <div class="div-table-col3"><div class="text">${numberOfSteps}</div></div>

                                      <div class="div-table-col4">
                                      <div onclick="downloadLogs('${key.toString()}')" class="div-download-button">
                                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M1 13L1 14C1 15.6569 2.34315 17 4 17L14 17C15.6569 17 17 15.6569 17 14L17 13M13 9L9 13M9 13L5 9M9 13L9 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                      </svg>
                                      </div> 
                                      </div> 
                                  </div>
                              `);
                        sessionDataMap[pageNumber] = sessionDataArray;
                      }
                    }
                    let paginationComponent = '';
                    if (numberOfPages > 1) {
                      const baseUrl = `session${URL_PARAM_DELIMITER}`;
                      paginationComponent = this.getPaginationComponent(
                        baseUrl,
                        numberOfPages,
                        currentIndex,
                      );
                    }

                    if (index === allKeys.length - 1) {
                      const replacedText = this.replace(sessionDash, {
                        session_data: sessionDataMap[currentIndex].join(''),
                        session_count: allKeys.length,
                        bugs_count: this.logTracker.getBugCount(),
                        steps_count: totalNumberOfSteps,
                        pagination_component: paginationComponent,
                      });
                      httpBridge.respond(
                        request.requestId,
                        200,
                        'text/html',
                        replacedText,
                      );
                    }
                  });
              }
            } else {
              httpBridge.respond(
                request.requestId,
                204,
                'application/json',
                '{"message": "No data Found"}',
              );
            }
          }
        }
      } else {
        httpBridge.respond(
          request.requestId,
          400,
          'application/json',
          '{"message": "Bad Request"}',
        );
      }
    } else {
      httpBridge.respond(
        request.requestId,
        400,
        'application/json',
        '{"message": "Bad Request"}',
      );
    }
  }
}

let _webServerHelper: WebServerHelper;
const getWebServerHelperInstance = (config?: LogTrackerConfigInterface) => {
  if (!_webServerHelper) {
    _webServerHelper = new WebServerHelper(config);
  }
  return _webServerHelper;
};
export {getWebServerHelperInstance};
