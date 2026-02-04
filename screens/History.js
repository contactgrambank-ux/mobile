import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { api_url } from "../config";
import BottomToolbar from "./bottomToolBar";

const History = ({ navigation }) => {
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(`${api_url}/txns/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTxns(res.data);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to load transaction history");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#7C4DFF" />
        <BottomToolbar navigation={navigation} active="Home" />

      </View>
    );

  const renderItem = ({ item }) => {
    const isCredit = item?.type === "CREDIT";
    return (
      <View style={styles.txnCard}>
        <View style={styles.row}>
          <View style={[styles.iconCircle, { backgroundColor: isCredit ? "#36C964" : "#FF5757" }]}>
            <Text style={styles.iconText}>{isCredit ? "+" : "-"}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.amountText}>
              {isCredit ? "Received" : "Paid"} • ₹{item.amount}
            </Text>

            <Text style={styles.txnId}>{item.txn_id}</Text>

            <Text style={styles.date}>
              {new Date(item.createdAt).toLocaleString()}
            </Text>
          </View>

          {item.is_fraud && (
            <View style={styles.fraudTag}>
              <Text style={styles.fraudText}>FRAUD</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction History</Text>
      </View>

      <View style={styles.container}>
        {txns.length === 0 ? (
          <View style={styles.center}>
            <Text style={{ color: "#777" }}>No Transactions yet</Text>
          </View>
        ) : (
          <FlatList
            data={txns}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <BottomToolbar navigation={navigation} active="Home" />

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
  },
  backArrow: { color: "#fff", fontSize: 26, marginRight: 10 },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  container: {
    paddingHorizontal: 18,
    paddingTop: 10,
    flex: 1,
  },

  txnCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iconText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },

  amountText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000",
  },

  txnId: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },

  date: {
    color: "#666",
    marginTop: 5,
    fontSize: 12,
  },

  fraudTag: {
    backgroundColor: "#FFD7D7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  fraudText: {
    color: "#B80000",
    fontWeight: "bold",
    fontSize: 10,
  },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default History;
