import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Button from "./controls/Button";

const Item = ({ imageSource, title, description, price, addToCart }) => {
	const onPress = () => {
		const item = { imageSource, title, description, price };
		addToCart(item);
	};

	return (
		<View style={styles.container}>
			<View style={styles.leftColumn}>
				<Image source={imageSource} style={styles.image} resizeMode="contain" />
			</View>
			<View style={styles.rightColumn}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.description}>{description}</Text>
				<Text style={styles.price}>${price}</Text>
				<Button
					label="Agregar"
					onPress={() => addToCart({ imageSource, title, price })}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	leftColumn: {
		flex: 1,
		marginRight: 10,
	},
	rightColumn: {
		flex: 2,
	},
	image: {
		width: 100,
		height: 100,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
	},
	description: {
		fontSize: 16,
		marginTop: 5,
	},
	price: {
		fontSize: 16,
		fontWeight: "bold",
		marginTop: 10,
		marginBottom: 10,
	},
});

export default Item;
