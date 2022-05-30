class NetworkHelper {
  ipAddress: string | null = null;

  setDeviceIpAddress(ip: string) {
    this.ipAddress = ip;
  }

  getDeviceIpAddress(): string | null {
    return this.ipAddress;
  }
}
export default new NetworkHelper();
