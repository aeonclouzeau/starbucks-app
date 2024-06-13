import { View, Image, Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get("window").width;

export function Logo({ type = "black", width }) {
  const image = import("../../assets/starbucks-logo.png");
  const size = width || windowWidth * 0.6;
  const height = (550 * size) / 1150;

  return (
    <View style={styles.container}>
      <Image
        style={{
          height,
          width: size,
          resizeMode: "contain",
        }}
        source={image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    paddingTop: 20,
  },
});
