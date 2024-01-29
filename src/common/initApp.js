import { initPlatformApi } from '../base/global.js';
import { initGlobalParams } from './global/global.js';

export const initApp = () => {
  initPlatformApi();
  initGlobalParams();
};
