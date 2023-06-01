import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { v4 as uuid } from 'uuid';


export default function App() {
  const [openCamera, setOpenCamera] = useState(false);

  const handleOpenCamera = () => {
    setOpenCamera(true);
  };

  return (
    <View style={styles.container}>
      {openCamera ? (
        <CameraScreen onCloseCamera={() => setOpenCamera(false)} />
      ) : (
        <View style={styles.home}>
          <Button title="Open Camera" onPress={handleOpenCamera} />
        </View>
      )}
    </View>
  );
}

function CameraScreen({ onCloseCamera }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      try {
        const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
        if (cameraStatus !== 'granted') {
          throw new Error('Camera permission not granted');
        }
  
        const { status: libraryStatus } = await MediaLibrary.requestPermissionsAsync();
        if (libraryStatus !== 'granted') {
          throw new Error('Media library permission not granted');
        }
  
        const photo = await camera.takePictureAsync();
  
        const currentDate = new Date();
        const year = currentDate.getFullYear().toString();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
  
        const path = `${FileSystem.documentDirectory}photo-app/${year}/${month}/${day}`;
  
        await FileSystem.makeDirectoryAsync(path, { intermediates: true });
        const newUri = `${path}/${uuid()}.jpg`;
        await FileSystem.moveAsync({
          from: photo.uri,
          to: newUri,
        });
  
        await MediaLibrary.saveToLibraryAsync(newUri);
        setPhoto(newUri);
  
        alert('Imagen guardada en: ' + path);
      } catch (error) {
        console.error('Failed to take picture:', error);
      }
    }
  };
  

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={(ref) => setCamera(ref)}>
        <View style={styles.buttonContainer}>
          <Button
            title="Flip"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          />
          <Button title="Take Picture" onPress={takePicture} />
          <Button title="Close Camera" onPress={onCloseCamera} />
        </View>
      </Camera>
      {photo && <Text>{photo}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: 'transparent',
  },
  home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
