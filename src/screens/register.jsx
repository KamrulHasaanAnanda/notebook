import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React, { useReducer } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { auth, db } from "../../App";
import Button from "../components/button";
import Input from "../components/input";

const Register = ({ navigation }) => {
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
    const result = await createUserWithEmailAndPassword(
      auth,
      state.email,
      state.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user :>> ", user);
        const docref = addDoc(collection(db, "user"), {
          name: state.name,
          email: state.email,
          age: state.age,
          gender: state.gender,
          uid: user.uid,
        });
        showMessage({
          message: "Success",
          type: "success",
        });
      })
      .catch((err) => {
        console.log("err :>> ", err);
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
          placeholder="Enter email"
          onChangeText={(text) => setState({ email: text })}
        />
        <Input
          placeholder="Enter password"
          secureTextEntry
          onChangeText={(text) => setState({ password: text })}
        />
        <Input
          placeholder="Enter full name"
          onChangeText={(text) => setState({ name: text })}
        />

        <Input
          placeholder="Enter age"
          onChangeText={(text) => setState({ age: text })}
        />
        <Pressable
          style={styles.radioDiv}
          onPress={() => setState({ gender: "male" })}
        >
          <View
            style={[
              styles.outCircle,
              state.gender === "male" && styles.selectedOuterCircle,
            ]}
          >
            <View
              style={[
                styles.inCircle,
                state.gender === "male" && styles.selectedInnerCircle,
              ]}
            ></View>
          </View>
          <Text style={styles.radioText}>Male</Text>
        </Pressable>
        <Pressable
          style={styles.radioDiv}
          onPress={() => setState({ gender: "female" })}
        >
          <View
            style={[
              styles.outCircle,
              state.gender === "female" && styles.selectedOuterCircle,
            ]}
          >
            <View
              style={[
                styles.inCircle,
                state.gender === "female" && styles.selectedInnerCircle,
              ]}
            ></View>
          </View>
          <Text style={styles.radioText}>Female</Text>
        </Pressable>
        {/* <Pressable > */}
        <Button
          title={"Sign up"}
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
            navigation.navigate("Login");
          }}
        >
          <Text>
            Already have an account?{" "}
            <Text style={{ fontWeight: "bold", color: "green" }}>Sign in</Text>{" "}
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

export default Register;
