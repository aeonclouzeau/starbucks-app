import React from "react";
import {
	View,
	Content,
	Text,
	FlatList,
	Image,
	StyleSheet,
	TouchableOpacity,
	Alert,
} from "react-native";
import Button from "../components/controls/Button";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome from react-native-vector-icons

import { useAppState } from "../App";

const Cart = ({ route }) => {
	const { cartItems, setCartItems } = useAppState();

	const removeFromCart = async (index) => {
		setCartItems((prev) => prev.filter((_, i) => i !== index));
		navigation.navigate("Cart", { cartItems, setCartItems, removeFromCart });
		Alert.alert("Eliminado");
	};

	const handleBuy = () => {
		console.log("Comprar fue activado");
		Alert.alert(
			"Confirmar compra",
			"¿Estás seguro de que deseas comprar estos productos?",
			[
				{
					text: "Cancelar",
					style: "cancel",
				},
				{
					text: "Confirmar",
					onPress: () => {
						setCartItems([]); // Vacia el carrito
						console.log("Cart items after emptying:", cartItems); // Log the cart items after emptying
						Alert.alert("Compra realizada", "¡Gracias por tu compra!");
					},
				},
			],
			{ cancelable: false }
		);
	};

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<FlatList
				data={cartItems}
				renderItem={({ item: { imageSource, title, price }, index }) => (
					<View style={styles.container}>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								marginBottom: 20,
							}}
						>
							<Image
								source={imageSource}
								style={{
									width: 100,
									height: 100,
									marginRight: 10,
									resizeMode: "contain",
								}}
							/>
							<View>
								<Text style={styles.title}>{title}</Text>
								<Text style={{ fontSize: 18 }}>${price}</Text>
							</View>
							<TouchableOpacity onPress={() => removeFromCart(index)}>
								<FontAwesome
									name="trash"
									size={24}
									color="red"
									marginLeft={20}
								/>
							</TouchableOpacity>
						</View>
					</View>
				)}
				keyExtractor={(item, index) => index.toString()}
			/>
			<View
				style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
			>
				<Text style={{ fontSize: 18, marginEnd: 10 }}>Total:</Text>
				<Text style={styles.price}>
					${cartItems.reduce((acc, item) => acc + item.price, 0)}
				</Text>
			</View>
			<Button label="Comprar" onPress={handleBuy} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		marginBottom: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
	},
	price: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 10,
		marginBottom: 10,
	},
});

export default Cart;
