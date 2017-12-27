
export const resolvePath = (...paths: Array<string>) =>
  paths
    .join('/')
    .split('/')
    .filter(part => part && part !== '.')
    .join('/');

// Wrap function to support both Promise and callback
export const withCallback = async<R>(
  callback?: (error?: Error, result?: R | void) => void,
  func?: () => Promise<R>,
): Promise<R> => {
  try {
    const result = await func();
    if (callback) {
      callback(null, result);
    }
    return result;
  } catch (err) {
    if (callback) {
      callback(err);
    } else {
      throw err;
    }
  }
}