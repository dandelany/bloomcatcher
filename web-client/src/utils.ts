// export const baseUrl = process.env && process.env.NODE_ENV === "development" ? "http://localhost:3939" : "";

const {port, protocol, hostname} = document.location
console.log('hostname', hostname);
export const baseUrl = (port === '3940') ?
  `${protocol}//${hostname}:3939`
  : "";

