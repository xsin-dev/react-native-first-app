import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tasbix() {
  const [count, setCount] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [headerText, setHeaderText] = useState("Alhamdulillah");
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState(headerText);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? "#1e293bee" : "#d0d4dbee",
        paddingHorizontal: 12,
        paddingTop: 8,
      }}
    >
      {/* top */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 40,
        }}
      >
        <TouchableOpacity>
          <View style={styles.headerButton}>
            <AntDesign name="menu" size={20} color="white" />
          </View>
        </TouchableOpacity>

        <Text
          style={{
            color: isDark ? "white" : "#1e293bee",
            fontSize: 16,
            fontWeight: "500",
          }}
        >
          {headerText}
        </Text>

        <TouchableOpacity>
          <View style={styles.headerButton}>
            <AntDesign name="down" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      {/* center div */}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            width: 280,
            height: 380,
            backgroundColor: "#0F1B2B",
            borderRadius: 60,
            padding: 24,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.4,
            shadowRadius: 15,
            elevation: 12,
            marginTop: 50,
          }}
        >
          {/* count */}
          <View
            style={{
              width: "100%",
              height: 70,
              backgroundColor: "#1e293bee",
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 40,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 24,
                fontWeight: "600",
                letterSpacing: 8,
              }}
            >
              {count}
            </Text>
          </View>

          {/* reload buttonlar */}
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              marginBottom: 30,
            }}
          >
            <TouchableOpacity
              onPress={() => setCount(count - 1)}
              disabled={count === 0}
            >
              <View style={styles.reloadButton}>
                <SimpleLineIcons name="reload" size={24} color="white" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                Alert.alert("Tasdiqlash", "Counterni tozalamoqchimisiz?", [
                  { text: "Bekor qilish", style: "cancel" },
                  { text: "Tozalash", onPress: () => setCount(count * 0) },
                ])
              }
            >
              <View style={styles.reloadButton}>
                <AntDesign name="reload" size={24} color="white" />
              </View>
            </TouchableOpacity>
          </View>

          {/* inc button */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setCount(count + 1)}
          >
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: "#1e293bee",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 2,
                borderColor: "#33415588",
              }}
            >
              <Text
                style={{
                  color: "#94a3b8",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                Bosing
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* bottom divlar */}
      <View
        style={{
          position: "absolute",
          bottom: 40,
          left: 0,
          right: 0,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity>
          <View style={styles.bottomIcon}>
            <AntDesign name="sound" size={28} color="white" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.bottomIcon}>
            <AntDesign name="shake" size={28} color="white" />
          </View>
        </TouchableOpacity>

        {/* ro'yxat */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View
            style={{
              ...styles.bottomIcon,
              width: 110,
              backgroundColor: isDark ? "#eab30833" : "#614a0789",
              borderWidth: 1,
              borderColor: "#eab30888",
            }}
          >
            <Text style={{ color: "#eab308", fontWeight: "600" }}>
              O'zgartirish
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.bottomIcon}>
            <EvilIcons name="question" size={40} color="white" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsDark((prev) => !prev)}>
          <View style={styles.bottomIcon}>
            <AntDesign name="moon" size={28} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      {/* modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View
            style={{
              backgroundColor: isDark ? "#0F1B2B" : "#fff",
              padding: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingBottom: 50,
            }}
          >
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                color: isDark ? "#fff" : "#000",
                backgroundColor: isDark ? "#1e293bee" : "#f0f0f0",
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setHeaderText(inputText);
                setModalVisible(false);
                setCount(0);
              }}
              style={{
                marginTop: 12,
                backgroundColor: "#eab308",
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#000", fontWeight: "600" }}>Saqlash</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#0F1B2B",
    justifyContent: "center",
    alignItems: "center",
  },
  reloadButton: {
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: "#1e293bee",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomButton: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#1e293bee",
    justifyContent: "center",
    alignItems: "center",
  },
});
