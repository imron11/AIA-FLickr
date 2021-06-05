import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalStorageService {
  public static async save(key: string, value: any) {
    return AsyncStorage.setItem(key, JSON.stringify(value)).then(() => value);
  }

  public static async saveString(key: string, value: any) {
    return AsyncStorage.setItem(key, value).then(() => value);
  }

  public static get<T = any>(key: string): Promise<T> {
    return AsyncStorage.getItem(key).then((retrievedItem) => JSON.parse(retrievedItem));
  }

  public static getString(key: string): Promise<string> {
    return AsyncStorage.getItem(key);
  }

  public static async remove(key: string) {
    return AsyncStorage.removeItem(key).then(() => true);
  }
}

export default LocalStorageService;