import {
  SafeAreaView,
  Text,
  TextInput,
  Pressable,
  View,
  Image,
} from "react-native";
import { Picture } from "./Picture";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { RootState, AppDispatch } from "../../store";
import { createProblem, fetchAllProblems } from "./ProblemSlice";
import { ProblemEntity } from "./ProblemEntity";
import * as ImagePicker from "expo-image-picker";
import { CameraRoll } from "@react-native-camera-roll/camera-roll"

export default function ProblemScreen() {
  const problem: ProblemEntity[] = useSelector((state: RootState) => state.problem.problem
);
  const [camera, setCamera] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const [photoToDisplay, setPhotoToDisplay] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(`subject: ${subject}, description: ${description}`);

    dispatch(createProblem(new ProblemEntity(subject, description, photoToDisplay)));
  };

  useEffect(() => {}, []);

  return (
    <View style={{ margin: 20 }}>
      {camera ? 
        <Picture
          setCamera={setCamera}
          setPhotoToDisplay={setPhotoToDisplay}
        ></Picture>
     : 
        <>
          <Text
            style={{
              flex: 0,
              marginTop: 50,
              color: "#101828",
              fontWeight: "600",
              fontSize: 25,
            }}
          >
            Problems
          </Text>
          <Text style={{ marginTop: 50, color: "#101828", fontWeight: "500" }}>
            Subject
          </Text>
          <TextInput
            placeholder="Enter a subject"
            style={{
              marginTop: 10,
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 15,
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "#D0D5DD",
              borderRadius: 5,
            }}
            onChangeText={setSubject}
            value={subject}
          />
          <Text style={{ marginTop: 20, color: "#101828", fontWeight: "500" }}>
            Description
          </Text>
          <TextInput
            placeholder="Enter a description"
            style={{
              marginTop: 10,
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 15,
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "#D0D5DD",
              borderRadius: 5,
            }}
            onChangeText={setDescription}
            value={description}
          />
          <Pressable
            style={{
              marginTop: 30,
              paddingTop: 15,
              paddingBottom: 15,
              backgroundColor: "#101828",
              borderRadius: 5,
            }}
            onPress={() => setCamera(true)}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
             Open Camera
            </Text>
          </Pressable>
          <Pressable
            style={{
              marginTop: 30,
              paddingTop: 15,
              paddingBottom: 15,
              backgroundColor: "#101828",
              borderRadius: 5,
            }}
            onPress={handleSubmit}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              create problem
            </Text>
          </Pressable>
        </>
      }
    </View>
  );
}
