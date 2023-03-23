import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useRef, useState, useMemo, useCallback} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {CONTENT_SPACING, SAFE_AREA_PADDING} from '../../constants/constants';

import {Camera, useCameraDevices} from 'react-native-vision-camera';
// import {PressableOpacity} from 'react-native-pressable-opacity';

// import Reanimated, {useSharedValue} from 'react-native-reanimated';
import IonIcon from 'react-native-vector-icons/Ionicons';

import LoadingIndicator from '../LoadingIndicator';
import CaptureButton from '../CaptureButton';

// const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
// Reanimated.addWhitelistedNativeProps({
//   zoom: true,
// });
const BUTTON_SIZE = 40;

function CustomCamera() {
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const devices = useCameraDevices();

  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  // const isPressingButton = useSharedValue(false);

  const [cameraPosition, setCameraPosition] = useState('front');
  const [flash, setFlash] = useState('off');
  const [isImage, setIsImage] = useState(true);
  const device = devices[cameraPosition];

  const supportsCameraFlipping = useMemo(
    () => devices.back != null && devices.front != null,
    [devices.back, devices.front],
  );
  const supportsFlash = device?.hasFlash ?? false;

  // const setIsPressingButton = useCallback(
  //   _isPressingButton => {
  //     isPressingButton.value = _isPressingButton;
  //   },
  //   [isPressingButton],
  // );

  const onError = useCallback(error => {
    console.error(error);
  }, []);
  const onInitialized = useCallback(() => {
    console.log('Camera initialized!');
    setIsCameraInitialized(true);
  }, []);

  const onMediaCaptured = useCallback(
    (media, type) => {
      console.log(`Media captured! ${JSON.stringify(media)}`);
      navigation.navigate('AddUserScreen', {
        path: media.path,
        type: type,
      });
    },
    [navigation],
  );

  const onFlipCameraPressed = () => {
    setCameraPosition(p => (p === 'back' ? 'front' : 'back'));
  };

  const onFlashPressed = () => {
    setFlash(f => (f === 'off' ? 'on' : 'off'));
  };

  if (device == null) {
    return <LoadingIndicator />;
  }
  const renderReanimatedCamera = () => {
    return (
      <View style={StyleSheet.absoluteFill}>
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isFocused}
          onInitialized={onInitialized}
          onError={onError}
          enableZoomGesture={false}
          photo={true}
          video={false}
          orientation="portrait"
        />
      </View>
    );
  };

  const renderCaptureButton = () => {
    return (
      <CaptureButton
        style={styles.captureButton}
        camera={cameraRef}
        onMediaCaptured={onMediaCaptured}
        flash={supportsFlash ? flash : 'off'}
        enabled={isCameraInitialized && isFocused}
        // setIsPressingButton={setIsPressingButton}
        isImage={isImage}
      />
    );
  };

  const renderOtherActions = () => {
    return (
      <View style={styles.rightButtonRow}>
        {supportsCameraFlipping && (
          <TouchableOpacity
            style={styles.button}
            onPress={onFlipCameraPressed}
            disabledOpacity={0.4}>
            <IonIcon name="camera-reverse" color="white" size={24} />
          </TouchableOpacity>
        )}
        {supportsFlash && (
          <TouchableOpacity
            style={styles.button}
            onPress={onFlashPressed}
            disabledOpacity={0.4}>
            <IonIcon
              name={flash === 'on' ? 'flash' : 'flash-off'}
              color="white"
              size={24}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderReanimatedCamera()}
      {renderCaptureButton()}
      {renderOtherActions()}
    </View>
  );
}

export default CustomCamera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  captureButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: SAFE_AREA_PADDING.paddingBottom * 2,
    backgroundColor: 'red',
    height: 80,
    width: 80,
    borderRadius: 20,
  },
  button: {
    marginBottom: CONTENT_SPACING,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonRow: {
    position: 'absolute',
    right: SAFE_AREA_PADDING.paddingRight,
    top: SAFE_AREA_PADDING.paddingTop,
  },
  text: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
