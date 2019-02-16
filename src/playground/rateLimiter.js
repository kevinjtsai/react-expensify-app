rateLimiter = (f, t) => {
  return (...args) => {
    result = f(...args);
    return result;
  }
}

logLimiter = (console.log);
logLimiter("hello");