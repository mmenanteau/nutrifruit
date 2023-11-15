import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectFruitById } from "@/features/fruits/fruitsSlice";
import { RootState } from "@/store";
import { Fruit } from "@/types/Fruit";

export default function FruitDetailsScreen() {
  const { id } = useLocalSearchParams();
  const fruit: Fruit | undefined = useSelector((state: RootState) => {
    const fruitId = Number(id);
    return !isNaN(fruitId) ? selectFruitById(state, fruitId) : undefined;
  })

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Fruit" }} />
      <Text>ID: {fruit?.id.toString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
