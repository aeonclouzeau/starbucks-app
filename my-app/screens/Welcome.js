import { Content, Wrapper, Title, Logo } from "../components/layout";
import Button from "../components/controls/Button";
import Colors from "../constants/Colors";

export default function Welcome({ navigation }) {
	const goToLogin = () => {
		navigation.navigate("Login");
	};

	const goToRegister = () => {
		navigation.navigate("Register");
	};

	return (
		<Wrapper backgroundColor={Colors.black}>
			<Content>
				<Logo type="white" />
				<Title color={Colors.white} title="Bienvenid@" />
				<Button onPress={goToLogin} label={"Ingresar"} type="white" />
				<Button onPress={goToRegister} label={"Únete"} type="white" />
			</Content>
		</Wrapper>
	);
}
