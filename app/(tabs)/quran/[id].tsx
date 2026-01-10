import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
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

export default function SurahDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log(id);
  

  const { data, isLoading, isError, error, refetch } = useQuery<Surah[]>({
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
          <Text style={styles.title}>Yuklanmoqda...</Text>
          <View style={{ width: 24 }} />
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          {Array.from({ length: 5 }).map((_, idx) => (
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
          <Text style={styles.title}>Xatolik</Text>
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

  const surah = data?.find((s) => s.id === Number(id));

  if (!surah) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loading}>Surah topilmadi...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.title}>{surah.transliteration}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.arab}>{surah.name}</Text>
        <Text style={styles.type}>
          {surah.type} | {surah.total_verses} oyat
        </Text>

        {surah.verses.map((verse) => (
          <View key={verse.id} style={styles.verseCard}>
            <Text style={styles.verseNumber}>{verse.id}-oyat</Text>
            <Text style={styles.verseText}>{verse.text}</Text>
          </View>
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
  back: { color: "#FACC15", fontSize: 24, fontWeight: "700" },
  title: { color: "#fff", fontSize: 20, fontWeight: "700" },
  arab: {
    color: "#FBBF24",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "right",
    marginVertical: 8,
  },
  type: { color: "#94a3b8", fontSize: 14, marginBottom: 12 },
  verseCard: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  verseNumber: { color: "#FACC15", fontWeight: "700", marginBottom: 4 },
  verseText: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 28,
    textAlign: "right",
  },
  loading: { color: "#fff", textAlign: "center", marginTop: 20 },

  skeletonCard: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
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
  errorText: {
    color: "#99adcb",
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#FACC15",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  retryText: { color: "#0F1B2B", fontWeight: "700" },
});
