import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
// import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
// import { Platform } from "react-native";

export default function TabsLayout() {
//   if (Platform.OS === "ios") {
//     return (
//       <NativeTabs>
//         <NativeTabs.Trigger name="index">
//           <Icon sf="house.fill" drawable="custom_android_drawable" />
//           <Label>Home</Label>
//         </NativeTabs.Trigger>

//         <NativeTabs.Trigger name="quran">
//           <Icon sf="book.fill" />
//           <Label>Qurʼon</Label>
//         </NativeTabs.Trigger>

//         <NativeTabs.Trigger name="settings">
//           <Icon sf="gear" drawable="custom_settings_drawable" />
//           <Label>Settings</Label>
//         </NativeTabs.Trigger>
//       </NativeTabs>
//     );
//   }
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="quran"
        options={{
          title: "Qurʼon",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="quran/_layout"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
