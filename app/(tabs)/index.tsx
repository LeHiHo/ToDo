import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { supabase } from '@/api';

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
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-lg font-bold text-white">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black px-4 py-6">
      {/* 검색바 */}
      <TextInput
        className="bg-gray-800 text-white px-4 py-2 rounded-lg mb-6"
        placeholder="검색"
        placeholderTextColor="#aaa"
      />

      {/* 카드 그룹 */}
      <View className="flex-row flex-wrap justify-between gap-4">
        {/* Projects 카드 */}
        <View className="bg-gray-800 rounded-lg p-4 w-[48%] flex items-center justify-between">
          <Text className="text-blue-400 text-lg font-bold">Projects</Text>
          <Text className="text-white text-xl">{projects.length}</Text>
        </View>

        {/* Tasks 카드 */}
        <View className="bg-gray-800 rounded-lg p-4 w-[48%] flex items-center justify-between">
          <Text className="text-green-400 text-lg font-bold">Tasks</Text>
          <Text className="text-white text-xl">{tasks.length}</Text>
        </View>
      </View>

      {/* 리스트 */}
      <View className="mt-8">
        <Text className="text-white text-lg font-bold mb-4">나의 목록</Text>

        {/* 최근 프로젝트 */}
        <TouchableOpacity className="bg-gray-800 rounded-lg p-4 flex flex-row items-center justify-between mb-4">
          <Text className="text-white">최근 프로젝트</Text>
          <Text className="text-white">{projects.length}</Text>
        </TouchableOpacity>

        {/* 최근 작업 */}
        <TouchableOpacity className="bg-gray-800 rounded-lg p-4 flex flex-row items-center justify-between">
          <Text className="text-white">최근 작업</Text>
          <Text className="text-white">{tasks.length}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
