import { StatusBar } from "expo-status-bar";
import {
	useFonts,
	Montserrat_300Light,
	Montserrat_400Regular,
	Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import Navigation from "./navigation";
import { createContext, useState, useContext } from "react";

export const AppStateContext = createContext({
	cartItems: [],
	setCartItems: () => {},
});

export const useAppState = () => useContext(AppStateContext);

export default function App() {
	const [fontLoaded, fontError] = useFonts({
		Montserrat_300Light,
		Montserrat_400Regular,
		Montserrat_700Bold,
	});

	const [cartItems, setCartItems] = useState([]);

	if (!fontLoaded && !fontError) {
		return null;
	}

	return (
		<SafeAreaProvider>
			<AppStateContext.Provider value={{ cartItems, setCartItems }}>
				<StatusBar style="auto" />
				<Navigation />
			</AppStateContext.Provider>
		</SafeAreaProvider>
	);
}
