import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Fruit } from '@/types/Fruit';
import { fetchFruits } from '@/api/fruits';

export default function App() {
  const [fruits, setFruits] = useState<Fruit[]>([]);

  useEffect(() => {
    fetchFruits().then(setFruits);
  }, []);

  return (
    <View style={styles.container}>
      <Text>{fruits.length} fruits</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
