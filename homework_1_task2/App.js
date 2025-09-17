import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5') 
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.text}>User id: {item.userId}</Text>
      <Text style={styles.text}>Id: {item.id}</Text>
      <Text style={styles.text}>Title: {item.title}</Text>
      <Text style={styles.text}>Completed: {item.completed ? 'true' : 'false'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="purple" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 50,
  },
  card: {
    backgroundColor: '#dba46f',
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 4,
    borderColor: '#000',
    height: 200, 
    justifyContent: 'center',
    alignItems: 'center', 
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
});
