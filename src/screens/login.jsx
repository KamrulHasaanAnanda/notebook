import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useReducer } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { auth } from "../../App";
// import { Button } from "react-native-web";
import { showMessage } from "react-native-flash-message";
import { ImageStyle } from "../../assets/css/image";
import { MainStyle } from "../../assets/css/mainStyle";
import Button from "../components/button";
import Input from "../components/input";

const Login = ({ navigation }) => {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      password: "",
      email: "",
    }
  );
  const signIn = () => {
    signInWithEmailAndPassword(auth, state.email, state.password)
      .then((res) => {
        showMessage({
          message: "Successfully signed in",
          type: "success",
        });
      })
      .catch((err) => {
        console.log("err.message :>> ", err.message);
        showMessage({
          message: err.message,
          type: "danger",
        });
      });
  };
  return (
    // <SafeAreaView>
    <>
      <View style={MainStyle.container}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={ImageStyle.bigImage}
            source={require("../../assets/login.png")}
            hei
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 24,
            fontWeight: "bold",
            marginVertical: 20,
          }}
        >
          Never Forget your password
        </Text>
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
          <Button
            title={"Sign in"}
            customStyle={{ alignSelf: "center", marginTop: 30 }}
            onPress={signIn}
          />
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
              navigation.navigate("Register");
            }}
          >
            <Text>
              Don't have an account?{" "}
              <Text style={{ fontWeight: "bold", color: "green" }}>
                Sign up
              </Text>{" "}
            </Text>
          </Pressable>
        </View>
      </View>
    </>

    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Login;
