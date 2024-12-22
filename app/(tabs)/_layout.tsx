import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView, View } from 'react-native';

export default function TabLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            tabBarStyle: {
              backgroundColor: '#000', // 하단 네비게이터 색상 설정 (블랙)
              borderTopWidth: 0, // 테두리 제거 (선택 사항)
            },
            tabBarActiveTintColor: '#fff', // 활성 탭 아이콘 색상 (흰색)
            tabBarInactiveTintColor: '#888', // 비활성 탭 아이콘 색상 (회색)
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              headerShown: false, // 헤더를 숨김
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? 'home-sharp' : 'home-outline'}
                  color={color}
                  size={24}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="about"
            options={{
              title: 'About',
              headerShown: false, // 헤더를 숨김
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={
                    focused
                      ? 'information-circle'
                      : 'information-circle-outline'
                  }
                  color={color}
                  size={24}
                />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </View>
  );
}
