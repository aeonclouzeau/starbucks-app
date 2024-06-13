import { Alert, Text, StyleSheet, View } from "react-native";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { setDoc, doc, onSnapshot } from "firebase/firestore";

import Button from "../components/controls/Button";
import FormItem from "../components/controls/FormItem";
import { Content, Header, Wrapper } from "../components/layout";

import { db, app } from "../firebase-config";

import { TailwindProvider } from "nativewind";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    full_name: "",
    phone: "",
    age: "",
  });
  const auth = getAuth(app);

  useEffect(() => {
    // Creamos una suscripción para traernos la información extra del usuario
    const subscriber = onSnapshot(
      doc(db, "users", auth.currentUser?.uid || ""),
      (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setData((prev) => ({
            ...prev,
            full_name: userData.full_name,
            age: userData.age,
            phone: userData.phone,
          }));
        }
      }
    );
    return subscriber;
  }, [auth]);

  /**
   * Se encarga de actualizar los datos del usuario
   */
  const updateUser = async () => {
    setLoading(true);
    if (auth.currentUser) {
      try {
        await setDoc(doc(db, "users", auth.currentUser.uid), data, {
          merge: true,
        });
      } catch (error) {
        console.error(error);
        Alert.alert("Error", JSON.stringify(error));
      }
    }
    setLoading(false);
  };

  return (
    <Wrapper>
      <Header
        title={`Hola ${data.full_name}`}
        showBack={true}
        showCart={false}
      />
      <Content>
        <Text style={styles.title}>Información personal</Text>
        <FormItem
          value={data.full_name}
          label="Nombre completo"
          onChange={(value) =>
            setData((prev) => ({ ...prev, full_name: value }))
          }
        ></FormItem>
        <FormItem
          value={data.phone}
          label="Telefóno"
          keyboardType="phone-pad"
          onChange={(value) => setData((prev) => ({ ...prev, phone: value }))}
        ></FormItem>
        <FormItem
          value={data.age}
          label="Edad"
          keyboardType="number-pad"
          onChange={(value) => setData((prev) => ({ ...prev, age: value }))}
        ></FormItem>
        <Text style={styles.title}>Datos Bancarios</Text>
        <FormItem value={""} label="Cuenta"></FormItem>
        <View style={styles.container}>
          <FormItem
            value={""}
            label="Fecha de vencimiento"
            isInFlex={true}
          ></FormItem>
          <FormItem value={""} label="CVV" isInFlex={true}></FormItem>
        </View>
        <View style={styles.container}>
          <Button
            onPress={updateUser}
            label={"Actualizar"}
            isLoading={loading}
          />
          <Button
            onPress={""}
            label={"Cancelar"}
            isLoading={loading}
            isPrimary={false}
          />
        </View>
      </Content>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
});
