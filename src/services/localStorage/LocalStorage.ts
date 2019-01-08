class LocalStorage {
  public static isEmpty(): boolean {
    return !localStorage.length;
  }

  public static saveData<T extends {} = {}>(key: string, data: T): void {
    localStorage.setItem(name, this.prepareSaveData(JSON.stringify(data)));
  }

  public static readData<T>(key: string): T {
    const data = localStorage.getItem(key);
    return (data) ? JSON.parse(this.prepareLoadData(data)) : null;
  }

  public static hydrateComponentState<T extends {} = {}>(component: React.Component) {
    for (let key in component.state) {
      if (!component.state.hasOwnProperty(key)) {
        continue;
      }

      const data: T = this.readData<T>(key);

      if (data) {
        component.setState({ [key]: data });
      }
    }
  }

  public static prepareSaveData(rawDataString: string): string {
    return btoa(rawDataString);
  }

  public static prepareLoadData(encodedDataString: string): string {
    return atob(encodedDataString);
  }
}

export default LocalStorage;
