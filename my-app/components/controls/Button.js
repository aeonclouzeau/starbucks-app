import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

export default function Button({
  label,
  type = "black",
  onPress,
  isLoading = false,
  isPrimary = true,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        !isPrimary && styles.secondaryButton,
        type === "white" && styles.containerWhite,
        isLoading && styles.disableButton,
      ]}
      disabled={isLoading}
    >
      {isLoading && (
        <ActivityIndicator style={styles.activity} color={Colors.white} />
      )}
      <Text style={[styles.text, !isPrimary && styles.secondaryButtonText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  activity: {
    marginRight: 10,
  },
  container: {
    alignItems: "center",
    backgroundColor: Colors.black,
    justifyContent: "center",
    borderRadius: 25,
    flexDirection: "row",
    paddingVertical: 15,
    marginBottom: 20,
    width: "50%",
  },
  containerWhite: {
    borderColor: Colors.white,
    borderRadius: 25,
    borderWidth: 2,
  },
  disableButton: {
    opacity: 0.75,
  },
  text: {
    color: Colors.white,
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.normal,
  },
  secondaryButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
  },
  secondaryButtonText: {
    color: Colors.black,
  },
});
