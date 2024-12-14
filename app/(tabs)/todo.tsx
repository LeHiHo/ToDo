import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '@/lib/supabase';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);

    try {
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', 'ea085556-d21f-4682-8f68-744d4edadef0');

      if (projectsError) throw projectsError;
      setProjects(projectsData);

      const { data: tasksData, error: tasksError } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', 'ea085556-d21f-4682-8f68-744d4edadef0');

      if (tasksError) throw tasksError;
      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg font-bold">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">Projects</Text>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="p-4 bg-gray-100 rounded-lg mb-2 shadow">
            <Text className="text-xl font-semibold">{item.project_name}</Text>
            <Text className="text-gray-600">{item.description}</Text>
          </View>
        )}
      />

      <Text className="text-2xl font-bold mt-6 mb-4">Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="p-4 bg-gray-100 rounded-lg mb-2 shadow">
            <Text className="text-lg font-semibold">{item.task_name}</Text>
            <Text className="text-gray-600">{item.description}</Text>
            <Text className="text-sm text-gray-500">Status: {item.status}</Text>
            <Text className="text-sm text-gray-500">
              Priority: {item.priority}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
