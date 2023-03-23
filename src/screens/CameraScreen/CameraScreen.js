import {Linking} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {Camera} from 'react-native-vision-camera';
import CustomCamera from '../../components/CustomCamera';
import LoadingIndicator from '../../components/LoadingIndicator';

function CameraScreen({navigation}) {
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState('not-determined');
  const [permissionGranted, setPermissionGranted] = useState(false);

  // check permission status
  useEffect(() => {
    const fetchPermissions = async () => {
      const cameraStatus = await Camera.getCameraPermissionStatus();

      if (cameraStatus !== 'authorized') {
        await requestCameraPermission();
      }

      setCameraPermissionStatus(cameraStatus);
    };
    fetchPermissions();
  }, [requestCameraPermission]);

  const requestCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();

    if (permission === 'denied') {
      await Linking.openSettings();
    }
    setCameraPermissionStatus(permission);
  }, []);

  useEffect(() => {
    if (cameraPermissionStatus === 'authorized') {
      setPermissionGranted(true);
    }
  }, [cameraPermissionStatus, navigation]);

  const renderCustomCamera = () => {
    return <CustomCamera />;
  };

  return permissionGranted ? renderCustomCamera() : <LoadingIndicator />;
}

export default CameraScreen;
