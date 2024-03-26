import { useState, useEffect } from "react";
import {
	FlatList,
	ScrollView,
	Alert,
	View,
	StyleSheet,
	Image,
	Text,
} from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import {
	collection,
	query,
	orderBy,
	onSnapshot,
	doc,
	deleteDoc,
} from "firebase/firestore";

import { Content, Header, Wrapper } from "../components/layout";
import State from "../components/controls/State";
import Button from "../components/controls/Button";
import StateModal from "../components/modals/StateModal";
import Item from "../components/Item";

import { auth, db } from "../firebase-config";
import { logoutAuth } from "../services/firebase";

import { useAppState } from "../App";

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	leftColumn: {
		flex: 1,
		marginRight: 10,
	},
	rightColumn: {
		flex: 1,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
	},
	description: {
		fontSize: 14,
		textAlign: "center",
		marginTop: 5,
	},
	image: {
		width: 100,
		height: 100,
		resizeMode: "cover",
	},
});

export default function Home({ navigation }) {
	const [visible, setVisible] = useState(false);
	const [selected, setSelected] = useState({
		key: "",
		name: "",
		code: "",
		status: false,
	});
	const [data, setData] = useState([]);

	useEffect(() => {
		const subscriber = onSnapshot(
			query(collection(db, "states"), orderBy("name")),
			(querySnapshot) => {
				const states = [];
				querySnapshot.forEach((doc) => {
					states.push({
						...doc.data(),
						key: doc.id,
					});
				});
				setData(states);
			}
		);
		return subscriber;
	}, []);

	useEffect(() => {
		const subscriber = onAuthStateChanged(auth, (response) => {
			if (!response) {
				navigation.navigate("Login");
			}
		});
		return subscriber;
	}, [auth]);

	const logout = async () => {
		await logoutAuth();
	};

	const toggleModal = () => {
		// setVisible(!visible); MALA PRACTICA, EL ESTADO PUEDE QUE NO ESTE ECTUALIZADO AL LLAMAR LA FUNCION
		setVisible((prev) => !prev); // se encarga de crear una copia del estado en el que se llama la funcion para evitar errores
	};

	const { cartItems, setCartItems } = useAppState();

	const addToCart = (itemData) => {
		setCartItems([...cartItems, itemData]);
		Alert.alert("Agregado", `${itemData.title} fue agregado al carrito.`);
	};

	const goToCart = () => {
		navigation.navigate("Cart");
		console.log("Cart items:", cartItems, "Set cart items:", setCartItems);
	};

	return (
		<Wrapper>
			<StateModal
				selected={selected}
				setSelected={setSelected}
				visible={visible}
				onClose={toggleModal}
			/>
			<Header title="STARBUCKS" showCart={true} onCartPress={goToCart} />
			<Content>
				<ScrollView vertical={true} style={{ width: "100%" }}>
					<Item
						imageSource={require("../assets/frappe-caramelo.png")}
						title="Caramel Frappe"
						description="Delicioso frappe de caramelo, con cubierta de crema batida y topping de caramelo."
						price={45}
						addToCart={addToCart}
					/>
					<Item
						imageSource={require("../assets/frappe-matcha.png")}
						title="Matcha Frappe"
						description="Delicioso frappe de matcha, con cubierta de crema batida y jarabe de matcha."
						price={55}
						addToCart={addToCart}
					/>
					<Item
						imageSource={require("../assets/frappe-chocolate.png")}
						title="Chocolate Frappe"
						description="Delicioso frappe de chocolate, con cubierta de crema batida y jarabe de chocolate."
						price={40}
						addToCart={addToCart}
					/>
				</ScrollView>
				<Button label="Cerrar sesión" onPress={logout} />
			</Content>
		</Wrapper>
	);
}
