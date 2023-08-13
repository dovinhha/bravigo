import {useApplication} from '@contexts/application';
import {Application} from '@interfaces/application';
import {Box, Center, FlatList} from 'native-base';
import React, {memo, useMemo} from 'react';
import {SafeAreaView} from 'react-native';
import {Chase} from 'react-native-animated-spinkit';

const Main = () => {
  const {apps, isLoading} = useApplication();
  const renderApplications = useMemo(() => {
    return (
      <FlatList
        horizontal
        // initialNumToRender={24}
        onScrollEndDrag={() => {}}
        showsHorizontalScrollIndicator={true}
        data={
          isLoading && apps.length === 0
            ? [
                [null, null, null],
                [null, null, null],
              ]
            : apps
        }
        renderItem={(value: any) => renderApplication(value)}
        keyExtractor={(__: any, index: number) => index.toString()}
        ListFooterComponent={() => {
          return isLoading ? (
            <Center flex={1} p={3}>
              <Chase size={48} color={'#790100'} />
            </Center>
          ) : null;
        }}
      />
    );
  }, [isLoading, apps]);

  const renderApplication = (value: {
    item: Application[] | any[];
    index: number;
  }) => {};

  return (
    <Box p={4} flex={1} bg="#790100">
      <SafeAreaView style={{flex: 1}}>
        <Box flex={1} bg="#FFF" borderRadius={'30px'} shadow={3}></Box>
      </SafeAreaView>
    </Box>
  );
};

export default memo(Main);
