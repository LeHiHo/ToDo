import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function AboutScreen() {
  return (
    <View className="flex-1 bg-black px-4 py-6">
      {/* 검색바 */}
      <TextInput
        className="bg-gray-800 text-white px-4 py-2 rounded-lg mb-6"
        placeholder="검색"
        placeholderTextColor="#aaa"
      />

      {/* 카드 그룹 */}
      <View className="grid grid-cols-2 gap-4">
        {/* 카드 */}
        <View className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
          <Text className="text-blue-400 text-lg font-bold">오늘</Text>
          <Text className="text-white text-xl">0</Text>
        </View>

        <View className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
          <Text className="text-gray-400 text-lg font-bold">전체</Text>
          <Text className="text-white text-xl">0</Text>
        </View>

        <View className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
          <Text className="text-blue-400 text-lg font-bold">흐</Text>
          <Text className="text-white text-xl">0</Text>
        </View>

        <View className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
          <Text className="text-blue-400 text-lg font-bold">미리 알림</Text>
          <Text className="text-white text-xl">0</Text>
        </View>

        <View className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
          <Text className="text-green-400 text-lg font-bold">할당</Text>
          <Text className="text-white text-xl">0</Text>
        </View>
      </View>

      {/* 하단 섹션 */}
      <View className="mt-8">
        <Text className="text-white text-lg font-bold mb-4">나의 목록</Text>
        <TouchableOpacity className="bg-gray-800 rounded-lg p-4 flex flex-row items-center justify-between">
          <Text className="text-white">최근 삭제된 항목</Text>
          <Text className="text-white">4</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}