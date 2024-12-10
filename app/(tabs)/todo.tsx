import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '@/lib/supabase';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTodos = async () => {
    setLoading(true); // 로딩 상태 시작
    try {
      let { data: todos, error } = await supabase.from('todos').select('*');

      if (error) {
        console.error('Error fetching todos:', error.message);
        return;
      }

      setTodos(todos || []);
    } catch (error) {
      console.error('Error fetching todos:', error.message);
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getTodos();
    }, []),
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Todo List</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
}
