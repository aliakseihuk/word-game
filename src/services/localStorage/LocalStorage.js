class LocalStorage {
  static isEmpty() {
    return !localStorage.length;
  }

  static saveData(name, data) {
    localStorage.setItem(name, this.prepareSaveData(JSON.stringify(data)));
  }

  static readData(name) {
    const data = localStorage.getItem(name);
    return JSON.parse(this.prepareLoadData(data));
  }

  static hydrateComponentState(component) {
    for (let key in component.state) {
      if (!component.state.hasOwnProperty(key)) {
        continue;
      }

      const data = this.readData(key);

      if (data) {
        component.setState({ [key]: data });
      }
    }
  }

  static prepareSaveData(data) {
    return btoa(data);
  }

  static prepareLoadData(data) {
    return atob(data);
  }
}

export default LocalStorage;
