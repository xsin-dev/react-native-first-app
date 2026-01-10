import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function SettingItem({
  icon,
  label,
  value,
  onValueChange,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
}) {
  return (
    <View style={styles.settingRow}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={22} color="#FACC15" />
        <Text style={styles.settingText}>{label}</Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={value ? "#FACC15" : "#94a3b8"}
        trackColor={{ false: "#334155", true: "#fde047" }}
      />
    </View>
  );
}

function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [sound, setSound] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sozlamalar</Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.sectionTitle}>Ilova</Text>

        <SettingItem
          icon="moon"
          label="Dark rejim"
          value={darkMode}
          onValueChange={setDarkMode}
        />

        <SettingItem
          icon="notifications"
          label="Ovoz"
          value={sound}
          onValueChange={setSound}
        />

        <SettingItem
          icon="phone-portrait"
          label="Vibratsiya"
          value={vibration}
          onValueChange={setVibration}
        />

        <Text style={styles.sectionTitle}>Tasbih</Text>

        <Pressable style={styles.cardButton}>
          <Ionicons name="refresh" size={22} color="#FACC15" />
          <Text style={styles.cardText}>Hisoblagichni nolga tushirish</Text>
        </Pressable>

        <Pressable style={styles.cardButton}>
          <Ionicons name="color-palette" size={22} color="#FACC15" />
          <Text style={styles.cardText}>Tasbih rangini o‘zgartirish</Text>
        </Pressable>

        <Text style={styles.sectionTitle}>Ilova haqida</Text>

        <Pressable style={styles.cardButton}>
          <Ionicons name="information-circle" size={22} color="#FACC15" />
          <Text style={styles.cardText}>Ilova haqida</Text>
        </Pressable>

        <Pressable style={styles.cardButton}>
          <Ionicons name="star" size={22} color="#FACC15" />
          <Text style={styles.cardText}>Baholash</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1B2B",
    paddingHorizontal: 16,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginVertical: 16,
  },
  sectionTitle: {
    color: "#94a3b8",
    fontSize: 13,
    marginTop: 24,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  settingRow: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  cardButton: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Settings;
