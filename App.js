import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

import { ActivityIndicator, StyleSheet, View } from "react-native";
import FlashMessage from "react-native-flash-message";
import Create from "./src/screens/create";
import Home from "./src/screens/home";
import Login from "./src/screens/login";
import Register from "./src/screens/register";

const firebaseConfig = {
  apiKey: "AIzaSyA0BNJ6c4KhEsmrjIEzApn9aKJyUKp0N40",
  authDomain: "mobile-password-5302b.firebaseapp.com",
  projectId: "mobile-password-5302b",
  storageBucket: "mobile-password-5302b.appspot.com",
  messagingSenderId: "163393973101",
  appId: "1:163393973101:web:94d67155b49485d5360864",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    backgroundColor: "#fff",
  },
};
const Stack = createNativeStackNavigator();
export default function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  // signOut(auth)
  // }, []);
  useEffect(() => {
    const authenticated = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false)
      } else {
        setUser(null);
        setLoading(false)

      }
      return authenticated;
    });
  }, []);

  if(loading){
    return(
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <ActivityIndicator color={"red"} size="large"/>
      </View>
    )
  }
  return (
    //  <SafeAreaView>
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>
        {user ?
        
          <>
        <Stack.Screen name="Home" options={{ headerShown:false }}>
          {(props)=><Home {...props} user={user}/>}
        </Stack.Screen>
        
         <Stack.Screen name="Create">
          {(props)=><Create {...props} user={user}/>}
        </Stack.Screen> 


          </>
        :
        <>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Register" component={Register} />
        </>
        }
        
        
      </Stack.Navigator>
      <FlashMessage position="bottom" />
    </NavigationContainer>
    //  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
