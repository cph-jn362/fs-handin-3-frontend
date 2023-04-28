import { SafeAreaView, Text, Pressable, Image, View } from "react-native";
import { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export function Picture(props) {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  const uploadImage = async (newPhoto) => {
    const fileToUpload = newPhoto.base64;
    const data = new FormData();
    data.append("file", fileToUpload);
    try {
      const ip = "192.168.1.94";
      let res = await fetch("https://" + ip + ":problem/image", {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "multipart/form-data;",
        },
      });
      let responseJson = await res.json();
      console.log(responseJson);
    } catch (error) {}
  };

  let takePic = async () => {
    let options = {
      quality: 0.7,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    props.setPhotoToDisplay(newPhoto);
    setPhoto(newPhoto);
  };

  if (photo) {
    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
        props.setCamera(false);
      });
    };

    return (
      <SafeAreaView>
        {hasMediaLibraryPermission ? (
          <Pressable onPress={savePhoto}>
            <Text>Save</Text>
          </Pressable>
        ) : undefined}
        <Pressable onPress={() => setPhoto(undefined)}>
          <Text>Save</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <Camera ref={cameraRef} style={{alignSelf: 'stretch', height: 480}}>
      <View>
        <Pressable onPress={takePic}>
          <Text style={{backgroundColor: '#ccc', textAlign: 'center', padding: 15, position: "relative", top: 480}}>Take Picture</Text>
        </Pressable>
      </View>
    </Camera>
  );
}
