import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as Contacts from "expo-contacts";
import { Platform } from "react-native";


const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function PayMobile({ navigation }) {
  const [sections, setSections] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const listRef = useRef(null);

  useEffect(() => {
    loadContacts();
  }, []);

 const loadContacts = async () => {
  let data = [];

  if (Platform.OS !== "web") {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const res = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      data = res.data;
    }
  }

  // ---------- DUMMY CONTACTS FOR WEB ----------
  if (!data || data.length === 0) {
    data = [
      { name: "Amit Sharma", phoneNumbers: [{ number: "9876543210" }] },
      { name: "Anjali Verma", phoneNumbers: [{ number: "9988776655" }] },
      { name: "Bharath Kumar", phoneNumbers: [{ number: "7012345678" }] },
      { name: "Chandru Yadav", phoneNumbers: [{ number: "9090909090" }] },
      { name: "David Miller", phoneNumbers: [{ number: "8080808080" }] },
      { name: "Ganesh Rao", phoneNumbers: [{ number: "7000123456" }] },
      { name: "Harsh Patel", phoneNumbers: [{ number: "9812345678" }] },
      { name: "Ishita Singh", phoneNumbers: [{ number: "9123456789" }] },
      { name: "Karan Mehta", phoneNumbers: [{ number: "9300000000" }] },
      { name: "Rahul Gupta", phoneNumbers: [{ number: "7894561230" }] },
      { name: "Rohit Sharma", phoneNumbers: [{ number: "9999999999" }] },
      { name: "Sanjay Rao", phoneNumbers: [{ number: "8888888888" }] },
      { name: "Virat Kohli", phoneNumbers: [{ number: "7777777777" }] },
    ];
  }

  let valid = data
    .filter(c => c.phoneNumbers?.length > 0)
    .map(c => ({
      name: c.name || "Unknown",
      number: c.phoneNumbers[0]?.number?.replace(/\s/g, ""),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const grouped = letters
    .map(l => ({
      title: l,
      data: valid.filter(c => c.name?.toUpperCase().startsWith(l)),
    }))
    .filter(s => s.data.length > 0);

  setSections(grouped);
  setFiltered(grouped);
};


  const search = (txt) => {
    if (!txt) return setFiltered(sections);

    const newData = sections
      .map(section => ({
        title: section.title,
        data: section.data.filter(
          c =>
            c.name.toLowerCase().includes(txt.toLowerCase()) ||
            c.number.includes(txt)
        ),
      }))
      .filter(s => s.data.length > 0);

    setFiltered(newData);
  };

 const selectContact = (number, name) => {
  const cleaned = number.replace(/\D/g, "");   // remove spaces + symbols
  const upi = `${cleaned}@ybl`;

  navigation.replace("UPIPaymentScreen", {
    upiId: upi,
    name: name
  });
};

  const scrollToLetter = (letter) => {
    const index = filtered.findIndex(s => s.title === letter);
    if (index !== -1)
      listRef.current.scrollToLocation({ sectionIndex: index, itemIndex: 0 });
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Select Contact</Text>

        <View style={{ width: 25 }} /> 
      </View>

      {/* SEARCH */}
      <TextInput
        placeholder="Search name or mobile number"
        placeholderTextColor="#aaa"
        style={styles.search}
        onChangeText={search}
      />

      {/* CONTACT LIST */}
      <SectionList
        ref={listRef}
        sections={filtered}
        keyExtractor={(item, index) => index.toString()}
        stickySectionHeadersEnabled
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row}onPress={() => selectContact(item.number, item.name)}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name[0]}</Text>
            </View>

            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.number}>{item.number}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* A-Z RIGHT SCROLL */}
      <View style={styles.alphaBar}>
        {letters.map(l => (
          <TouchableOpacity key={l} onPress={() => scrollToLetter(l)}>
            <Text style={styles.alphaText}>{l}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1c1c23" },

  header: {
    height: 55,
    backgroundColor: "#1c1c23",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  backArrow: { color: "#fff", fontSize: 26 },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  search: {
    margin: 12,
    backgroundColor: "#2b2b36",
    borderRadius: 10,
    color: "#fff",
    padding: 12,
  },

  sectionHeader: {
    backgroundColor: "#2b2b36",
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  sectionText: { color: "#bfbfbf", fontSize: 13 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 0.4,
    borderColor: "#333",
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: "#7C4DFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: { color: "#fff", fontWeight: "bold", fontSize: 18 },

  name: { color: "#fff", fontSize: 16, fontWeight: "600" },
  number: { color: "#bbb", marginTop: 2 },

  alphaBar: {
    position: "absolute",
    right: 5,
    top: 110,
  },
  alphaText: {
    color: "#9a9a9a",
    paddingVertical: 2,
    fontSize: 12,
  },
});
