import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Fruit } from '@/types/Fruit';
import { fetchFruits } from '@/api/fruits';

export default function App() {
  const [fruits, setFruits] = useState<Fruit[]>([]);

  const sortFruitsByName = (fruits: Fruit[]): Fruit[] => {
    return fruits.sort((a, b) => a.name.localeCompare(b.name.toString()));
  };

  useEffect(() => {
    fetchFruits().then(sortFruitsByName).then(setFruits);
  }, []);

  return (
    <View style={styles.container}>
      <Text>{fruits.length} fruits</Text>
      <FlatList data={fruits} renderItem={({ item }) => {
        return <Text>{item.name}</Text>
      }} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
