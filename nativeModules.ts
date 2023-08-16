import {NativeModules} from 'react-native';
const {AppInfo} = NativeModules;
interface AppInfoInterface {
  getAppVersion(pakageName: string): Promise<any>;
}
export default AppInfo as AppInfoInterface;
