import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

const Settings = ({ navigation }) => {
  const [language, setLanguage] = useState("English");

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    Alert.alert("🌐 Language Updated", `App language set to ${lang}`);
  };

  return (
    <View style={styles.main}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.container}>
        {/* Language */}
        <Text style={styles.sectionTitle}>Language Preference</Text>

        <View style={styles.languageContainer}>
          {["English", "हिन्दी", "తెలుగు", "ಕನ್ನಡ", "தமிழ்"].map((lang) => (
            <TouchableOpacity
              key={lang}
              style={[
                styles.languageButton,
                language === lang && styles.languageSelected,
              ]}
              onPress={() => handleLanguageChange(lang)}
            >
              <Text
                style={[
                  styles.languageText,
                  language === lang && styles.languageTextActive,
                ]}
              >
                {lang}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* About App */}
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>About GramBank</Text>
          <Text style={styles.aboutText}>
            GramBank ensures safe and secure banking for rural areas using
            advanced fraud detection and secure authentication features.
          </Text>

          <Text style={styles.version}>Version 1.0.0</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#F1E9FF",
  },

  header: {
    backgroundColor: "#5E2CED",
    paddingTop: 50,
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backArrow: { color: "#fff", fontSize: 26, marginRight: 10 },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },

  languageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  languageButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    width: "47%",
    alignItems: "center",
  },

  languageSelected: {
    borderColor: "#5E2CED",
    backgroundColor: "#EDE7F6",
  },

  languageText: {
    color: "#333",
    fontWeight: "600",
  },
  languageTextActive: {
    color: "#5E2CED",
  },

  aboutSection: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
  },

  aboutTitle: {
    fontWeight: "bold",
    color: "#5E2CED",
    fontSize: 16,
    marginBottom: 5,
  },

  aboutText: {
    color: "#555",
    fontSize: 14,
    marginBottom: 10,
  },

  version: {
    color: "#999",
    fontSize: 13,
    textAlign: "right",
  },
});

export default Settings;
