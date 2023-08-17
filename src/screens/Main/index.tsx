/* eslint-disable react-native/no-inline-styles */
import {Box, Center, FlatList, HStack, Image, Text} from 'native-base';
import React, {memo, useMemo} from 'react';
import {SafeAreaView, useWindowDimensions, TextInput} from 'react-native';
import {Wander} from 'react-native-animated-spinkit';

import {useApplication} from '@contexts/application';
import {Application, ApplicationGroup} from '@interfaces/application';
import CONSTANTS from '../../constants';
import {scaleValue} from 'common';
import ApplicationItem from './components/ApplicationItem';

import logo from '../../assets/images/logo.png';

const Main = () => {
  const {width, height} = useWindowDimensions();
  const scale = scaleValue({currentScreen: {width, height}, desire: 0});

  const {appGroups, isLoading, isRefreshing, handleGetApplications, setName} =
    useApplication();

  const renderApplications = useMemo(() => {
    return (
      <FlatList
        refreshing={isRefreshing}
        onRefresh={() => handleGetApplications(true)}
        contentContainerStyle={{}}
        onScrollEndDrag={() => {}}
        showsHorizontalScrollIndicator={true}
        data={appGroups}
        renderItem={(value: any) => renderApplicationGroup(value)}
        keyExtractor={(__: any, index: number) => index.toString()}
      />
    );
  }, [appGroups, isRefreshing]);

  const renderApplicationGroup = (data: {
    item: ApplicationGroup;
    index: number;
  }) => {
    const {type, value} = data.item;
    const applicationType = CONSTANTS.types.find(item => item.value === type);

    const add = 4 - (value.length % 4);

    return (
      <Box p={4}>
        <Text
          fontWeight={'500'}
          color={CONSTANTS.primaryColor}
          fontSize={`${scale * 16}px`}>
          {applicationType?.label ?? 'Khác'}
        </Text>
        <HStack
          flexWrap={'wrap'}
          alignItems={'center'}
          justifyContent={'center'}>
          {[...value, ...new Array(add).fill(null).map(() => null)].map(
            (app: Application | null, index) => {
              return renderApplication(app, index);
            },
          )}
        </HStack>
      </Box>
    );
  };

  const renderApplication = (app: Application | null, index: number) => {
    return <ApplicationItem item={app} key={index} />;
  };

  return (
    <Box p={4} flex={1} bg={CONSTANTS.primaryColor}>
      <SafeAreaView style={{flex: 1}}>
        <HStack mb={2} space={3} alignItems={'center'}>
          <Image
            source={logo}
            alt={'logo'}
            w={`${120 * scale}px`}
            h={`${30 * scale}px`}
          />
          <TextInput
            placeholder="Nhập tên ứng dụng tìm kiếm"
            style={{
              backgroundColor: '#fff',
              flex: 1,
              height: scale * 36,
              paddingVertical: 0,
              borderRadius: 6,
            }}
            onChangeText={text => {
              setName(text);
            }}
          />
        </HStack>
        <Box flex={1} bg="#FFF" borderRadius={'20px'} shadow={3}>
          {isLoading ? (
            <Center flex={1} p={3}>
              <Wander size={48} color={CONSTANTS.primaryColor} />
            </Center>
          ) : null}
          {renderApplications}
        </Box>
      </SafeAreaView>
    </Box>
  );
};

export default memo(Main);
