import { Link, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { AppDispatch } from '@/store';
import { Fruit } from '@/types/Fruit';
import { fetchFruits, fruitsSelector } from '@/features/fruits/fruitsSlice';

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

      {isLoading && <ActivityIndicator size="large" style={styles.loader} />}

      {error && <Text>No fruit has been found. Please try again.</Text>}

      {fruits.length > 0 && <>
        <Text>{fruits.length} fruits</Text>
        <FlatList data={sortFruitsByName(fruits)} renderItem={({ item }) => {
          return <Link href={`/fruit/${item.id}`}>{item.name}</Link>
        }} />
      </>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
