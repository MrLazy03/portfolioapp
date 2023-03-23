import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
// import {PressableOpacity} from 'react-native-pressable-opacity';

// import Reanimated, {
//   useAnimatedStyle,
//   withSpring,
//   useSharedValue,
// } from 'react-native-reanimated';
import {CAPTURE_BUTTON_SIZE} from '../../constants/constants';

const BORDER_WIDTH = CAPTURE_BUTTON_SIZE * 0.1;

const CaptureButton = ({
  camera,
  onMediaCaptured,
  flash,
  enabled,
  //   setIsPressingButton,
  style,
  isImage,
  ...props
}) => {
  //   const [isRecording, setIsRecording] = useState(false);
  //   const isPressingButton = useSharedValue(false);

  //   const shadowStyle = useAnimatedStyle(
  //     () => ({
  //       transform: [
  //         {
  //           scale: withSpring(isPressingButton.value ? 1 : 0, {
  //             mass: 1,
  //             damping: 35,
  //             stiffness: 300,
  //           }),
  //         },
  //       ],
  //     }),
  //     [isPressingButton],
  //   );

  const takePhotoOptions = useMemo(
    () => ({
      photoCodec: 'jpeg',
      qualityPrioritization: 'speed',
      flash: flash,
      quality: 90,
      skipMetadata: true,
    }),
    [flash],
  );

  const hanldeImageCapture = useCallback(async () => {
    try {
      if (camera.current == null) {
        throw new Error('Camera ref is null!');
      }

      const photo = await camera.current.takePhoto(takePhotoOptions);
      onMediaCaptured(photo, 'photo');
    } catch (e) {
      // TODO : Show tpast ,essage
    }
  }, [camera, onMediaCaptured, takePhotoOptions]);

  const handleMediacapture = async () => {
    await hanldeImageCapture();
  };

  return (
    <TouchableOpacity
      style={style}
      onPress={enabled && handleMediacapture}
      disabledOpacity={0.4}
    />
  );
};

export default CaptureButton;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  shadow: {
    position: 'absolute',
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    backgroundColor: '#e34077',
  },
  startRecordingButton: {
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    borderWidth: BORDER_WIDTH,
    borderColor: 'white',
  },
  stopRecordingButton: {
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    borderWidth: BORDER_WIDTH,
    borderColor: 'red',
  },
});
