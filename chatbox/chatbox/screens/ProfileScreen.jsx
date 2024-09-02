import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthContext } from "../AuthContext";
import axios from "axios";

const ProfileScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(
    "https://png.pngtree.com/png-clipart/20220124/original/pngtree-avatar-girl-png-image_7193675.png"
  );
  const [name, setName] = useState("");
  const [about, setAbout] = useState("Jay Jinandra");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { setToken, userId } = useContext(AuthContext);

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://192.168.29.155:3000/information/${userId}`
      );
      // console.log(response.data);
      setName(response.data.name);
      setPhoneNumber(response.data.mobile);
      setProfileImage(response.data.image);
    } catch (error) {
      console.log("Error while getting user", error);
    }
  };

  const clearAuthToken = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      setToken("");
      Alert.alert("Logged out", "You have been logged out.");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    clearAuthToken();
    navigation.navigate("login");
  };

  const handleEditProfile = () => {
    navigation.navigate("editprofilescreen", {
      currentName: name,
      currentAbout: about,
      currentPhoneNumber: phoneNumber,
      currentProfileImage: profileImage,
      onSave: (newName, newAbout, newPhoneNumber, newProfileImage) => {
        setName(newName);
        setAbout(newAbout);
        setPhoneNumber(newPhoneNumber);
        setProfileImage(newProfileImage);
      },
    });
  };

  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/free-photo/extreme-close-up-bent-paper-cut-style_23-2148319033.jpg?ga=GA1.1.1929705956.1708626574&semt=ais_user",
      }}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}></Text>
          <TouchableOpacity onPress={handleLogout}>
            <Icon name="sign-out" size={30} color="white" />
            <Text style={{color:"#fff",fontSize:10}}>LogOut</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.profileImage} source={{ uri: profileImage }} />
          </View>
          <Text style={styles.aboutHeader}>Username</Text>
          <TextInput
            style={[styles.nameText, styles.whiteText, styles.rounded]}
            value={name}
            onChangeText={setName}
            editable={false}
          />
          <Text style={styles.aboutHeader}>About</Text>
          <TextInput
            style={[styles.aboutText, styles.whiteText, styles.rounded]}
            value={about}
            onChangeText={setAbout}
            editable={false}
          />
          <Text style={styles.aboutHeader}>Phone Number</Text>
          <TextInput
            style={[styles.phoneText, styles.whiteText, styles.rounded]}
            value={phoneNumber}
            editable={false}
            keyboardType="phone-pad"
          />
          <TouchableOpacity
            style={styles.editIconContainer}
            onPress={handleEditProfile}
          >
            <Icon name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Adjust the opacity here
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  profileContainer: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    borderBottomWidth: 1,
    marginBottom: 10,
    width: "80%",
    textAlign: "center",
    borderBottomColor: "white",
  },
  aboutHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    color: "white",
  },
  aboutText: {
    fontSize: 16,
    fontStyle: "italic",
    borderBottomWidth: 1,
    width: "80%",
    textAlign: "center",
    borderBottomColor: "white",
  },
  phoneText: {
    fontSize: 16,
    borderBottomWidth: 1,
    width: "80%",
    textAlign: "center",
    borderBottomColor: "white",
  },
  whiteText: {
    color: "white",
  },
  rounded: {
    borderRadius: 10,
    padding: 5,
  },
});

export default ProfileScreen;
