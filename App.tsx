/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import {ApplicationProvider} from '@contexts/application';
// import Main from '@screens/Main';
import {INativebaseConfig, NativeBaseProvider} from 'native-base';
import React from 'react';

import {StatusBar} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const config: INativebaseConfig = {
  strictMode: 'off',
};

function App(): JSX.Element {
  return (
    // <SafeAreaView style={{backgroundColor: '#790100'}}>
    <NativeBaseProvider config={config}>
      {/* <ApplicationProvider> */}
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.red} />
      {/* <Main /> */}
      {/* </ApplicationProvider> */}
    </NativeBaseProvider>
    // </SafeAreaView>
  );
}

export default App;
