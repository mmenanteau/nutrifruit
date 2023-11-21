import { Link, Stack } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { fetchFruits, fruitsSelector } from "@/features/fruits/fruitsSlice";
import { AppDispatch } from "@/store";
import { Fruit } from "@/types/Fruit";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: fruits, isLoading, error } = useSelector(fruitsSelector);

  const sortFruitsByName = (fruits: Fruit[]): Fruit[] => {
    return [...fruits].sort((a, b) => a.name.localeCompare(b.name));
  };

  useEffect(() => {
    dispatch(fetchFruits());
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "NutriFruit" }} />

      {isLoading && <ActivityIndicator size="large" />}

      {error && <Text>No fruit has been found. Please try again.</Text>}

      {fruits.length > 0 && (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listScroll}
          data={sortFruitsByName(fruits)}
          renderItem={({ item }) => {
            return (
              <Link href={`/fruit/${item.id}`} style={styles.item}>
                {item.name}
              </Link>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    alignSelf: "flex-start",
    width: "100%",
  },
  listScroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 15,
  },
  item: {
    paddingVertical: 5,
  },
});
