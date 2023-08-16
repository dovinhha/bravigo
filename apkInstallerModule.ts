import {NativeModules} from 'react-native';
const {ApkInstaller} = NativeModules;
interface AppInfoInterface {
  installApk(pakageName: string): Promise<any>;
}
export default ApkInstaller as AppInfoInterface;
