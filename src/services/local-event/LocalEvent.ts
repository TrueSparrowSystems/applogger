import EventEmitter from 'eventemitter3';

/**
 * Instance of the event emitter.
 */
export const LocalEvent = new EventEmitter();

/**
 * @function triggerEvent Function to trigger an event of type `eventType` with data `data`.
 * @public
 * @param eventType Type of event to be triggered.
 * @param data Data to be send to the subscriber of the event.
 * @returns {void}
 */
export function triggerEvent(eventType: string, ...data: any[]): void {
  LocalEvent.emit(eventType, data);
}
