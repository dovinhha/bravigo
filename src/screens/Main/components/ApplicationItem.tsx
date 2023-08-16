/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Application} from '@interfaces/application';
import {Box, Button, HStack, Image, Text, VStack, useToast} from 'native-base';
import {
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';
import VersionCheck from 'react-native-version-check';

import {scaleValue} from 'common';
import urls from '@configs/urls';
import download from '../../../assets/images/download.png';
import update from '../../../assets/images/update.png';
import CONSTANTS from '../../../constants';
import {Wander} from 'react-native-animated-spinkit';

import AppInfo from '../../../../nativeModules';

type Props = {
  item: Application | null;
};

const ApplicationItem: React.FC<Props> = ({item}) => {
  const {width, height} = useWindowDimensions();
  const toast = useToast();
  const scale = scaleValue({currentScreen: {width, height}, desire: 0});

  const [needUpdate, setNeedUpdate] = useState(false);

  const handleDownloadApk = async (url: string) => {
    handleToast(0);
    const fileUrl = `${urls.BASE_IMAGE_URL}${url}`;
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Cấp quyền truy cập bộ nhớ',
          message: 'Để tải file xuống vui lòng cấp quyền bộ nhớ',
          buttonNegative: 'Huỷ',
          buttonPositive: 'Cho phép',
        },
      );
      if (granted) {
        const {dirs} = RNFetchBlob.fs;
        const dirToSave = `${dirs.DownloadDir}/${url ?? ''}`;

        await RNFetchBlob.config({
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: dirToSave,
            description: '',
          },
        })
          .fetch('GET', fileUrl)
          .then(() => {
            closeAll();
            handleToast(1);
          })
          .catch(() => {
            handleToast(-1);
          });
        return true;
      }
    }
  };

  const closeAll = () => {
    toast.closeAll();
  };

  const handleToast = (type: number) => {
    switch (type) {
      case 0:
        toast.show({
          placement: 'top',
          render: () => {
            return (
              <HStack p={3} space={2} bg="#5196c6" rounded="sm" mb={5}>
                <Wander size={12} color={'#fff'} />
                <Text
                  fontSize={`${10 * scale}px`}
                  color="#FFF"
                  fontWeight={'500'}>
                  Đang tải ứng dụng...
                </Text>
              </HStack>
            );
          },
          duration: 2000,
        });
        break;
      case 1:
        toast.show({
          placement: 'top',
          render: () => {
            return (
              <HStack
                alignItems={'center'}
                p={3}
                space={2}
                bg="#4fc5af"
                rounded="sm"
                mb={5}>
                <Text
                  fontSize={`${10 * scale}px`}
                  color="#fff"
                  fontWeight={'500'}>
                  Tải ứng dụng thành công. Vui lòng vào phần Downloads để tiến
                  hành cài đặt
                </Text>
                <Button
                  _text={{
                    fontSize: `${10 * scale}px`,
                    color: '#FFF',
                  }}
                  size={'sm'}
                  p={1}
                  variant="outline"
                  onPress={() => {
                    closeAll();
                  }}>
                  Đóng
                </Button>
                {/* <Button
                  _text={{
                    fontSize: `${10 * scale}px`,
                    color: '#FFF',
                  }}
                  p={1}
                  bg={CONSTANTS.primaryColor}
                  onPress={() => {
                    Linking.openURL(link).catch(error => {
                      console.log(error);
                    });
                  }}>
                  Đi tới thư mục tải ứng dụng
                </Button> */}
              </HStack>
            );
          },
          duration: null,
        });
        break;
      case -1:
        toast.show({
          placement: 'top',
          render: () => {
            return (
              <HStack p={3} space={2} bg="red.800" rounded="sm" mb={5}>
                <Text
                  fontSize={`${10 * scale}px`}
                  color="#fff"
                  fontWeight={'500'}>
                  Tải ứng dụng lỗi. Vui lòng thử lại sau!
                </Text>
              </HStack>
            );
          },
        });
        break;
    }
  };

  useEffect(() => {
    if (item) {
      AppInfo.getAppVersion(item?.packageName)
        .then(appVersion => {
          VersionCheck.needUpdate({
            depth: 1,
            currentVersion: appVersion,
            latestVersion: item?.version,
          }).then((res: {isNeeded: boolean}) => {
            setNeedUpdate(res.isNeeded);
          });
        })
        .catch(error => {
          console.log('error: ', error);
        });
    }
  }, []);

  return (
    <Box
      my={1}
      mx={2}
      bg={item === null ? 'transparent' : '#fbfbfb'}
      style={
        item === null
          ? {}
          : {
              shadowColor: '#fff',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.1,
              shadowRadius: 1,
              elevation: 1,
            }
      }
      borderWidth={item === null ? 0 : '1px'}
      borderColor={'#f1f1f1'}
      rounded={10}
      w={`${width / 5}px`}
      h={`${height / 5}px`}
      p={1}>
      {item !== null && (
        <>
          <Box flex={1}>
            <HStack space={1}>
              <Image
                source={{
                  uri: `${urls.BASE_IMAGE_URL}${item.iconUrl}`,
                }}
                alt={item.name}
                rounded={10}
                w={`${36 * scale}px`}
                h={`${36 * scale}px`}
              />

              <VStack flex={1}>
                <Text
                  fontSize={`${10 * scale}px`}
                  color="#000"
                  fontWeight={'500'}>
                  {item.name}
                </Text>
                <Text
                  numberOfLines={3}
                  fontSize={`${7 * scale}px`}
                  color="#999"
                  fontWeight={'400'}>
                  {item.notes}
                </Text>
              </VStack>
            </HStack>
          </Box>
          <HStack justifyContent={'space-between'}>
            <Text
              numberOfLines={3}
              fontSize={`${8 * scale}px`}
              color="#999"
              fontWeight={'400'}>
              {item.lastUpdate && moment(item.lastUpdate).format('DD/MM/YY')}
            </Text>
            <TouchableOpacity onPress={() => handleDownloadApk(item.fileUrl)}>
              <HStack alignItems={'center'}>
                <Text
                  numberOfLines={3}
                  fontSize={`${9 * scale}px`}
                  color={CONSTANTS.primaryColor}
                  fontWeight={'500'}>
                  {needUpdate ? 'Cập nhật' : 'Tải xuống'}
                </Text>
                {needUpdate ? (
                  <Image
                    source={update}
                    // mt={0.5}
                    w={`${12 * scale}px`}
                    h={`${12 * scale}px`}
                    alt={'update'}
                  />
                ) : (
                  <Image
                    source={download}
                    // mt={0.5}
                    w={`${12 * scale}px`}
                    h={`${12 * scale}px`}
                    alt={'download'}
                  />
                )}
              </HStack>
            </TouchableOpacity>
          </HStack>
        </>
      )}
    </Box>
  );
};

export default ApplicationItem;
