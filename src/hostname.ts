import { hostname } from 'os';

export const getHostnameString = (): string => {
  const str = hostname();
  const firstDot = str.indexOf('.');
  return firstDot !== -1 ? str.substring(0, firstDot) : str;
};
