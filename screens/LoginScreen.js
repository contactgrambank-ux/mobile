import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { api_url } from "../config";

const LoginScreen = ({ navigation }) => {
  const [pin, setPin] = useState("");
  const [aadhaar, setAadhaar] = useState("");

  useEffect(() => {
  const initLogin = async () => {
    const storedAadhaar = await AsyncStorage.getItem("aadhaarNumber");

    // if (!storedAadhaar) {
    //   navigation.navigate("SignupStep1");
    //   return;
    // }

    setAadhaar(storedAadhaar);

    // Try biometric automatically
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !enrolled) return;

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login with Fingerprint",
        fallbackLabel: "Use MPIN",
        cancelLabel: "Cancel",
      });

      if (result.success) {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          navigation.replace("Dashboard");
        }
      }

    } catch (err) {
      console.log("Biometric error", err);
    }
  };

  initLogin();
}, []);


  const handlePinLogin = async () => {
    if (!aadhaar || !pin) return Alert.alert("Error", "Enter Aadhaar & MPIN");

    try {
      const res = await axios.post(`${api_url}/users/login`, {
        aadhaarNumber: aadhaar,
        mpin: pin,
      });

      const { token, user } = res.data;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("accountNumber", user.accountNumber);

      Alert.alert("🎉 Welcome", user.name);
      navigation.replace("Dashboard");
    } catch (err) {
      Alert.alert(
        "Login Failed",
        err.response?.data?.error || "Invalid credentials"
      );
    }
  };

  const handleBiometricAuth = async () => {
    const hardware = await LocalAuthentication.hasHardwareAsync();
    if (!hardware) return Alert.alert("Error", "No biometric hardware");

    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) return Alert.alert("Error", "No biometrics enrolled");

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login with Fingerprint",
      fallbackLabel: "Enter MPIN",
    });

    if (!result.success)
      return Alert.alert("Authentication Failed", "Try again.");

    const storedToken = await AsyncStorage.getItem("token");
    if (storedToken) navigation.replace("Dashboard");
    else Alert.alert("Login Required", "Login with MPIN once first.");
  };

  return (
    <View style={styles.main}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appName}>GramBank</Text>
        <Text style={styles.headerTitle}>Welcome Back</Text>
        <Text style={styles.headerSub}>
          Secure & fast access to your bank
        </Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
        />

        <Text style={styles.sectionTitle}>Login to Continue</Text>

        <TextInput
          style={styles.input}
          placeholder="Aadhaar Number"
          keyboardType="numeric"
          maxLength={12}
          value={aadhaar}
          onChangeText={setAadhaar}
          placeholderTextColor="#777"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter 4-Digit MPIN"
          keyboardType="numeric"
          secureTextEntry
          maxLength={4}
          value={pin}
          onChangeText={setPin}
          placeholderTextColor="#777"
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handlePinLogin}>
          <Text style={styles.loginText}>Login ➜</Text>
        </TouchableOpacity>

        <Text style={styles.or}>OR</Text>

        <TouchableOpacity
          style={styles.fingerprintBtn}
          onPress={handleBiometricAuth}
        >
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/10074/10074023.png",
            }}
            style={styles.fingerprintIcon}
          />
          <Text style={styles.fpText}>Login with Fingerprint</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("SignupStep1")}
        >
          <Text style={styles.signupText}>
            📝 New user? Create Account
          </Text>
        </TouchableOpacity>

        <View style={styles.languageContainer}>
          <Text style={styles.languageText}>🌐 Select Language</Text>
          <Text style={styles.languages}>
            English | ಕನ್ನಡ | తెలుగు | தமிழ் | हिंदी
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#5e2ced",
  },

  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 25,
  },

  appName: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    marginTop: 6,
    fontWeight: "600",
  },

  headerSub: {
    color: "#ddd",
    marginTop: 3,
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 22,
  },

  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
  },

  sectionTitle: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "bold",
    color: "#5e2ced",
  },

  input: {
    backgroundColor: "#f3f1ff",
    borderRadius: 12,
    padding: 14,
    fontSize: 17,
    marginBottom: 12,
    textAlign: "center",
    color: "#000",
  },

  loginBtn: {
    backgroundColor: "#5e2ced",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 5,
  },

  loginText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },

  or: {
    textAlign: "center",
    marginVertical: 10,
    color: "#888",
  },

  fingerprintBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#5e2ced",
    borderRadius: 14,
    padding: 12,
  },

  fingerprintIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },

  fpText: {
    color: "#5e2ced",
    fontSize: 15,
    fontWeight: "bold",
  },

  signupText: {
    textAlign: "center",
    marginTop: 20,
    color: "#5e2ced",
    fontWeight: "bold",
  },

  languageContainer: {
    marginTop: 25,
    alignItems: "center",
  },

  languageText: {
    color: "#555",
  },

  languages: {
    marginTop: 5,
    color: "#5e2ced",
    fontWeight: "bold",
  },
});

export default LoginScreen;
