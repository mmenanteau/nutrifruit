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
  });

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: fruit?.name || id?.toString() }} />
      {fruit ? (
        <>
          <Text>Family: {fruit.family}</Text>
          <Text>Order: {fruit.order}</Text>
          <Text>Genus: {fruit.genus}</Text>
          <Text>Calories: {fruit.nutritions.calories}</Text>
          <Text>Fat: {fruit.nutritions.fat}</Text>
          <Text>Sugar: {fruit.nutritions.sugar}</Text>
          <Text>Carbohydrates: {fruit.nutritions.carbohydrates}</Text>
          <Text>Protein: {fruit.nutritions.protein}</Text>
        </>
      ) : (
        <Text>This fruit does not exist.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
