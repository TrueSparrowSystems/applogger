class Cache {
  // A map which will store the cached values.
  cache: Record<string, any> = {};

  /**
   * @constructor
   */
  constructor() {
    this.bindFunctions();
  }

  /**
   * @private Function to bind the `this` instance.
   * @returns {void}
   */
  private bindFunctions(): void {
    this.setValue.bind(this);
    this.getValue.bind(this);
    this.removeValue.bind(this);
    this.clearAll.bind(this);
  }

  /**
   * @public Function which will be called to store the value in cache.
   * @param {string} key: Key for the cache.
   * @param {any} value: Value for that key.
   * @returns {void}
   */
  public setValue(key: string, value: any): void {
    this.cache[key] = value;
  }

  /**
   * @public Function to get the cached value.
   * @param {string} key: Key for which the value if needed.
   * @returns {any} Cached value stored against that key.
   */
  public getValue(key: string): any {
    return this.cache[key];
  }

  /**
   * Function to remove the cached value.
   * @param {string} key: Key for which the value if needed.
   * @returns {void}
   */
  public removeValue(key: string): void {
    delete this.cache[key];
  }

  /**
   * Function which will clear all the values from the cache.
   * @returns {void}
   */
  public clearAll(): void {
    this.cache = {};
  }
}
export default new Cache();
