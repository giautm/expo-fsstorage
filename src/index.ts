import { FileSystem } from 'expo';

import {
  resolvePath,
  withCallback,
} from './utils';

export const DocumentDir = FileSystem.documentDirectory;
export const CacheDir = FileSystem.cacheDirectory;

export class FSStorage {
  private baseFolder: string;

  constructor(
    location: string = DocumentDir,
    folder: string = 'expo-fsstorage',
  ) {
    this.baseFolder = resolvePath(location, folder);
  }

  protected pathForKey(key: string) {
    return resolvePath(this.baseFolder, encodeURIComponent(key));
  }

  setItem(
    key: string,
    value: string,
    callback?: (error?: Error) => void,
  ): Promise<void> {
    return withCallback(callback, async () => {
      await FileSystem.makeDirectoryAsync(this.baseFolder, {
        intermediates: true,
      });
      await FileSystem.writeAsStringAsync(this.pathForKey(key), value);
    });
  }

  getItem (
    key: string,
    callback?: (error?: Error, result?: string) => void,
  ): Promise<string> {
    return withCallback<string>(callback, async () => {
      const pathKey = this.pathForKey(key);
      const { exists } = await FileSystem.getInfoAsync(pathKey);
      if (exists) {
        return await FileSystem.readAsStringAsync(pathKey);
      }
    });
  }

  removeItem(
    key: string,
    callback?: (error: Error) => void,
  ): Promise<void> {
    return withCallback(callback, async () => {
      await FileSystem.deleteAsync(this.pathForKey(key), {
        idempotent: true,
      });
    });
  }

  getAllKeys(
    callback?: (error?: Error, keys?: Array<string>) => void,
  ): Promise<Array<string>> {
    return withCallback<Array<string>>(callback, async () => {
      await FileSystem.makeDirectoryAsync(this.baseFolder, {
        intermediates: true,
      });
      const baseFolderLength = this.baseFolder.length;
      const files = await FileSystem.readDirectoryAsync(this.baseFolder);
      return files.map(fileUri =>
        decodeURIComponent(fileUri.substring(baseFolderLength)),
      );
    });
  }
}
