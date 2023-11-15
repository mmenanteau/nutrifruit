import { Link, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { AppDispatch } from '@/store';
import { Fruit } from '@/types/Fruit';
import { fetchFruits, selectFruitsSortedByName } from '@/features/fruits/fruitsSlice';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const fruits: Fruit[] = useSelector(selectFruitsSortedByName);

  useEffect(() => {
    dispatch(fetchFruits());
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "NutriFruit" }} />
      <Text>{fruits.length} fruits</Text>
      <FlatList data={fruits} renderItem={({ item }) => {
        return <Link href={`/fruit/${item.id}`}>{item.name}</Link>
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
