import { addDoc, collection } from "firebase/firestore";
import React, { useReducer } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { db } from "../../App";
import Button from "../components/button";
import Input from "../components/input";

const Create = ({ navigation, user }) => {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      selected: false,
      name: "",
      password: "",
      age: "",
      email: "",
      gender: "",
    }
  );

  const signUp = async () => {
    // console.log("object :>> ");
    const docref = await addDoc(collection(db, "password"), {
      name: state.title,
      email: state.password,
      uid: user.uid,
    })
      .then((res) => {
        showMessage({
          message: "Success",
          type: "success",
        });

        navigation.navigate("Home");
      })
      .catch((err) => {
        // console.log("err :>> ", err);
        showMessage({
          message: err.message,
          type: "danger",
        });
      });

    // console.log("result :>> ", result);
  };
  //   const selected = true;
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Input
          placeholder="Enter title"
          onChangeText={(text) => setState({ title: text })}
        />
        <Input
          placeholder="Enter password"
          secureTextEntry
          onChangeText={(text) => setState({ password: text })}
        />

        <Button
          title={"Save"}
          customStyle={{ alignSelf: "center", marginTop: 30 }}
          onPress={signUp}
        />
        {/* </Pressable> */}
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: 25,
        }}
      >
        <Pressable
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text>
            Never forget your password?{" "}
            <Text style={{ fontWeight: "bold", color: "green" }}>Home</Text>{" "}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  radioDiv: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  outCircle: {
    height: 30,
    width: 30,
    borderRadius: 20,
    borderColor: "#ccc",
    marginRight: 10,
    marginLeft: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },
  inCircle: {
    height: 18,
    width: 18,
    borderRadius: 15,
    borderColor: "#ccc",

    marginRight: 10,
    marginLeft: 10,
    borderWidth: 1,
  },
  radioText: {
    fontWeight: "bold",
  },
  selectedOuterCircle: {
    borderColor: "red",
  },
  selectedInnerCircle: {
    backgroundColor: "red",
    borderColor: "red",
  },
});

export default Create;
