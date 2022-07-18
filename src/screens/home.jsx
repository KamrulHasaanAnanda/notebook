import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { db } from "../../App";
import { MainStyle } from "../../assets/css/mainStyle";
import Button from "../components/button";

const Home = ({ navigation, user }) => {
  const [list, setlist] = useState();
  useEffect(() => {
    const q = query(collection(db, "password"), where("uid", "==", user.uid));
    const passList = onSnapshot(q, (QuerySnapshot) => {
      const list = [];
      QuerySnapshot.forEach((element) => {
        list.push(element.data());
      });
      setlist(list);
    });
    return passList;
  }, []);
  console.log("list :>> ", list);
  const renderItem = ({ item }) => {
    return (
      <View style={styles.passwordContain}>
        <View>
          <Text style={[{}, styles.titleText]}>{item.email}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "baseline" }}>
          <Text style={styles.titleText}>Password for:</Text>
          <Text style={styles.semiText}>{item.name}</Text>
        </View>
      </View>
    );
  };
  return (
    <ScrollView style={[MainStyle.container]}>
      <Text
        style={{
          textAlign: "center",
          marginVertical: 20,
          fontSize: 20,
          fontWeight: "bold",
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
        }}
      >
        Passwords{" "}
      </Text>
      <Button
        title={"Add password"}
        customStyle={{ alignSelf: "flex-end", marginHorizontal: 20 }}
        onPress={() => {
          navigation.navigate("Create");
        }}
      />
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => item.uid}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  passwordContain: {
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 120,
    // shadowColor: "#171717",
    // shadowOffset: { width: -2, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    elevation: 15,
    shadowColor: "grey",
    // shadowColor: "#52006A",
    // width: "50%",
    // alignItems: "center",
    // justifyContent: "center",
  },
  titleText: {
    fontSize: 20,
    color: "black",
    // backgroundColor: "red",
    // paddingVertical: 20,
    // paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,

    // width: 75,
    // alignSelf: "center",
    fontWeight: "bold",
  },
  semiText: {
    color: "red",
    fontSize: 18,

    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Home;
