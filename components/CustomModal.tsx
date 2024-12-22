import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';

interface CustomModalProps {
  visible: boolean; // 모달 표시 여부
  onClose: () => void; // 모달 닫기 함수
  onSave: (data: string) => void; // 저장 시 동작
  title?: string; // 모달 제목
  placeholder?: string; // 입력 필드 플레이스홀더
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  onSave,
  title = '모달 제목',
  placeholder = '내용을 입력하세요',
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSave = () => {
    onSave(inputValue); // 부모 컴포넌트로 입력값 전달
    setInputValue(''); // 입력 필드 초기화
    onClose(); // 모달 닫기
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-red-500">
        <View className="bg-white w-4/5 p-6 rounded-lg">
          <Text className="text-lg font-bold mb-4">{title}</Text>
          <TextInput
            className="border border-gray-300 rounded-md px-4 py-2 mb-4"
            placeholder={placeholder}
            value={inputValue}
            onChangeText={setInputValue}
          />
          <View className="flex-row justify-end space-x-4">
            <TouchableOpacity
              className="px-4 py-2 rounded-md bg-gray-200"
              onPress={onClose}>
              <Text className="text-white">취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-4 py-2 rounded-md bg-blue-500"
              onPress={handleSave}>
              <Text className="text-white">저장</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
