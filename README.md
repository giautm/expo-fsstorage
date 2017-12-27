# Expo FS Storage

[Expo Persist](https://github.com/rt2zz/redux-persist/) storage engine for React Native file system

### Install

```
yarn add expo-fsstorage
```

### Usage

```js
import { persistStore } from 'redux-persist'
import { FSStorage } from 'expo-fsstorage';

const persistor = persistStore(store, {
  storage: FSStorage(),
});
```

The default storage location is a folder called `expo-fsstorage` in the document directory for your app on the device. You can specify folder for persistor:

```js
import { persistStore } from 'redux-persist'
import { FSStorage, CacheDir } from 'expo-fsstorage';

const cachePersistor = persistStore(store, {
  storage: FSStorage(CacheDir, 'myApp'),
});
```

This will create `myApp` folder in cache storage for iOS and Android devices. You may create multiple persistors on different directories.
