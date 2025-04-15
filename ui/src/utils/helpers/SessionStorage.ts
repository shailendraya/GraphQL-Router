// Session storage helper
export class SessionStorage {
  getData(key: string) {
    return sessionStorage.getItem(key);
  }
  setData(key: string, value: unknown) {
    return sessionStorage.setItem(
      key,
      typeof value === "string" ? value : JSON.stringify(value),
    );
  }
  removeItem(key: string) {
    sessionStorage.removeItem(key);
  }

  removeData() {
    sessionStorage.clear();
  }
}
