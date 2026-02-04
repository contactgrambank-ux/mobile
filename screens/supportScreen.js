import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomToolbar from "./bottomToolBar";

/* =========================================================
   SUPPORT SCREEN
========================================================= */

const SupportScreen = ({ navigation }) => {
  const SupportCard = ({ icon, title, subtitle, action, onPress }) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardLeft}>
        <View style={styles.iconWrap}>
          <Ionicons name={icon} size={22} color="#1E3A8A" />
        </View>
        <View>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSub}>{subtitle}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
    </TouchableOpacity>
  );

  const ListItem = ({ title }) => (
    <TouchableOpacity style={styles.listItem}>
      <Text style={styles.listText}>{title}</Text>
      <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.root}>

      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <Text style={styles.headerSub}>We’re here to help you</Text>
      </View>

      {/* ================= CONTENT ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* CONTACT US */}
        <Text style={styles.section}>Contact Us</Text>

        <SupportCard
          icon="call-outline"
          title="Call Support"
          subtitle="Available 24/7 for urgent issues"
        />

        <SupportCard
          icon="chatbubble-ellipses-outline"
          title="Live Chat"
          subtitle="Chat with our support team"
        />

        <SupportCard
          icon="mail-outline"
          title="Email Support"
          subtitle="Response within 24 hours"
          onPress={()=> navigation.navigate('EmailSupportScreen')}
        />

        <SupportCard
          icon="help-circle-outline"
          title="FAQs"
          subtitle="Find answers to common questions"
        />

        {/* QUICK LINKS */}
        <Text style={styles.section}>Quick Links</Text>

        <View style={styles.list}>
          <ListItem title="Report a Problem" />
          <ListItem title="Transaction Dispute" />
          <ListItem title="Account Statement" />
          <ListItem title="Update KYC" />
          <ListItem title="Block Card" />
          <ListItem title="Update Mobile Number" />
        </View>
      </ScrollView>

      {/* ================= BOTTOM TOOLBAR ================= */}
      <BottomToolbar navigation={navigation} active="Support" />

    </SafeAreaView>
  );
};

export default SupportScreen;

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  /* HEADER */
  header: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#F5F7FB",
    borderBottomWidth: 0.5,
    borderColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },
  headerSub: {
    marginTop: 4,
    color: "#64748B",
  },

  /* SCROLL */
  scroll: {
    paddingBottom: 110, // space for bottom toolbar
  },

  /* SECTIONS */
  section: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
  },

  /* CONTACT CARDS */
  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  cardSub: {
    marginTop: 2,
    fontSize: 12,
    color: "#64748B",
  },

  /* QUICK LINKS LIST */
  list: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    borderRadius: 14,
    overflow: "hidden",
  },
  listItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listText: {
    fontSize: 14,
    color: "#0F172A",
  },
});
