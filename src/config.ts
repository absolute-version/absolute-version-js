import { AbsoluteVersionConfig } from './types';

export const applyDefaults = (
  config?: Partial<AbsoluteVersionConfig>
): AbsoluteVersionConfig => ({
  tagGlob: 'v[0-9]*',
  ...(config || {}),
});
