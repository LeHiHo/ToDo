import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { fetchProjects } from '@/api/project';
import { fetchTasks } from '@/api/tasks';
import { ProjectsData } from '@/@types/projects.types';
import { TasksData } from '@/@types/tasks.types';
import CustomModal from '@/components/CustomModal';
import { createProject } from '@/api/project';
import { getUser } from '@/lib/getUser';

export default function App() {
  const [projects, setProjects] = useState<ProjectsData[]>([]);
  const [tasks, setTasks] = useState<TasksData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleSaveProject = async (projectName: string) => {
    try {
      const payload = { project_name: projectName, user_id: userId };

      const data = await createProject(payload);
      setProjects((prevProjects) => [
        ...prevProjects,
        ...(Array.isArray(data) ? data : []),
      ]);
      console.log('프로젝트 생성 성공:', data);
    } catch (error) {
      console.error('프로젝트 생성 중 오류 발생:', error);
    }
  };

  const router = useRouter();

  const fetchData = async () => {
    if (!userId) {
      console.warn('User ID is not available. Skipping fetch.');
      return;
    }

    setLoading(true);
    try {
      // fetchProjects로 프로젝트 데이터 가져오기
      const projectsData = await fetchProjects(userId);
      const tasksData = await fetchTasks(userId);

      setProjects(projectsData);
      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      const user = await getUser();
      if (user?.id) {
        setUserId(user.id); // 사용자 ID 설정
        await fetchData(); // 사용자 ID가 설정된 후에 데이터 가져오기
      } else {
        console.warn('User ID is not available. Skipping fetch.');
      }
    };

    initializeData();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-lg font-bold text-white">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black px-4 py-6">
      {/* 헤더 */}
      <View className="flex justify-center items-end mb-4">
        <TouchableOpacity onPress={() => router.push('/about')}>
          <Ionicons name="person" size={32} color="white" />
        </TouchableOpacity>
      </View>

      {/* 바디 */}
      <View className="flex-1">
        <View className="flex-row flex-wrap justify-between gap-4">
          {(projects || []).map((project) => (
            <View
              key={project.id}
              className="bg-gray-800 rounded-lg p-4 w-[100%] flex items-center justify-between flex-row">
              <View className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center mr-3" />
              <Text className="text-white text-xl font-bold">
                {project.project_name}
              </Text>
              <Text className="text-white text-xl font-bold">
                {tasks.length}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* 푸터 */}
      <View className="flex flex-row py-4 bg-gray-90 justify-between">
        <TouchableOpacity
          onPress={() => {
            console.log('Add new task');
          }}
          className="flex-row items-center justify-center">
          <FontAwesome name="plus-circle" size={32} color="white" />
          <Text className="color-white font-extrabold ml-4">할일 추가</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="flex-row items-center justify-center">
          <Text className="color-white font-extrabold underline">
            프로젝트 추가
          </Text>
        </TouchableOpacity>
        <CustomModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={handleSaveProject}
          title="새 프로젝트 추가"
          placeholder="프로젝트 이름을 입력하세요"
        />
      </View>
    </View>
  );
}
