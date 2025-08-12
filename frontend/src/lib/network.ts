export const getCurrentOnlineStatus = () =>
  typeof navigator !== "undefined" ? navigator.onLine : true;
