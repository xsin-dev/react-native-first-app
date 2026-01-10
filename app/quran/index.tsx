import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Surah {
  id: number;
  name: string;
  transliteration: string;
  type: string;
  total_verses: number;
  verses: Verse[];
}
interface Verse {
  id: number;
  text: string;
}

export default function QuranList() {
  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Surah[]>({
    queryKey: ["quran-surahs"],
    queryFn: async () => {
      const res = await axios.get<Surah[]>(
        "https://cdn.jsdelivr.net/npm/quran-cloud@1.0.0/dist/quran.json"
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.back}>←</Text>
          </Pressable>

          <Text style={styles.title}>Qurʼon suralari</Text>

          <View style={{ width: 24 }} />
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {Array.from({ length: 10 }).map((_, idx) => (
            <View key={idx} style={styles.skeletonCard}>
              <View style={styles.skeletonLineShort} />
              <View style={styles.skeletonLineMedium} />
              <View style={styles.skeletonLineSmall} />
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (isError) {
    let message = "Noma'lum xatolik yuz berdi!";
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        message = "Internetga ulanganingizni tekshiring 🌐";
      } else {
        message = error.response.data?.message || error.message;
      }
    } else if (error instanceof Error) {
      message = error.message;
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.back}>←</Text>
          </Pressable>
          <Text style={styles.title}>Qurʼon suralari</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{message}</Text>
          <Pressable style={styles.retryButton} onPress={() => refetch()}>
            <Text style={styles.retryText}>Qayta urinib ko‘rish</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </Pressable>

        <Text style={styles.title}>Qurʼon suralari</Text>

        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {data.map((item) => (
          <Pressable
            key={item.id}
            style={styles.card}
            onPress={() => router.push(`/quran/${item.id}`)}
          >
            <View style={styles.cardLeft}>
              <Text style={styles.arab}>{item.name}</Text>
              <Text style={styles.translit}>{item.transliteration}</Text>
              <Text style={styles.ayat}>
                {item.type} | {item.total_verses} oyat
              </Text>
            </View>
            <View style={styles.cardRight}>
              <Text style={styles.id}>{item.id}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F1B2B", paddingHorizontal: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  title: { color: "#fff", fontSize: 22, fontWeight: "700" },
  back: { color: "#FACC15", fontSize: 24, fontWeight: "700" },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardLeft: { flex: 1, paddingRight: 12 },
  cardRight: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FACC15",
    justifyContent: "center",
    alignItems: "center",
  },
  arab: {
    color: "#FBBF24",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "right",
  },
  translit: { color: "#fff", fontSize: 16, fontWeight: "600", marginTop: 2 },
  ayat: { color: "#94a3b8", fontSize: 14, marginTop: 4 },
  id: { color: "#0F1B2B", fontWeight: "700", fontSize: 16 },

  skeletonCard: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  skeletonLineShort: {
    height: 20,
    backgroundColor: "#334155",
    borderRadius: 10,
    marginBottom: 6,
  },
  skeletonLineMedium: {
    height: 16,
    width: "70%",
    backgroundColor: "#334155",
    borderRadius: 10,
    marginBottom: 6,
  },
  skeletonLineSmall: {
    height: 14,
    width: "50%",
    backgroundColor: "#334155",
    borderRadius: 10,
  },

  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "#94a3b8", fontSize: 18, marginBottom: 16 },
  retryButton: {
    backgroundColor: "#FACC15",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  retryText: { color: "#0F1B2B", fontWeight: "700" },
});
