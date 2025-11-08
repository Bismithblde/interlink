import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from "react-native";
import { useUser } from "@/src/contexts/UserContext";

export default function NotebookPage({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { user, loading } = useUser();

  return (
    <ImageBackground
      source={require("../../../assets/images/notebook.png")}
      style={styles.bg}
      resizeMode="stretch"
    >
      <ScrollView style={styles.inner}>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : user ? (
          <View style={styles.profileContainer}>
            <Text style={styles.title}>Profile</Text>

            <View style={styles.section}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{user.email}</Text>
            </View>

            {user.age && (
              <View style={styles.section}>
                <Text style={styles.label}>Age:</Text>
                <Text style={styles.value}>{user.age}</Text>
              </View>
            )}

            {user.gender && (
              <View style={styles.section}>
                <Text style={styles.label}>Gender:</Text>
                <Text style={styles.value}>{user.gender}</Text>
              </View>
            )}

            {user.major && (
              <View style={styles.section}>
                <Text style={styles.label}>Major:</Text>
                <Text style={styles.value}>{user.major}</Text>
              </View>
            )}

            {user.hobbies && user.hobbies.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.label}>Hobbies:</Text>
                <Text style={styles.value}>{user.hobbies.join(", ")}</Text>
              </View>
            )}

            {user.classSchedule && user.classSchedule.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.label}>Class Schedule:</Text>
                {user.classSchedule.map((schedule, index) => (
                  <Text key={index} style={styles.scheduleItem}>
                    {schedule.day}: {schedule.startTime} - {schedule.endTime}
                    {schedule.courseName && ` (${schedule.courseName})`}
                  </Text>
                ))}
              </View>
            )}

            {!user.age && !user.gender && !user.major && (
              <Text style={styles.incompleteText}>
                Complete your questionnaire to see more profile information!
              </Text>
            )}
          </View>
        ) : (
          <View style={styles.profileContainer}>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.loadingText}>
              Please log in to view your profile
            </Text>
          </View>
        )}
        {children}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, width: "100%", height: "100%" },
  inner: { flex: 1, padding: 90 },
  profileContainer: {
    paddingTop: 0,
    paddingLeft: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1a1a1a",
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4a4a4a",
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    color: "#1a1a1a",
    lineHeight: 24,
  },
  scheduleItem: {
    fontSize: 16,
    color: "#1a1a1a",
    marginLeft: 10,
    marginTop: 4,
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 50,
  },
  incompleteText: {
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
    marginTop: 20,
  },
});
