import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { Text } from 'react-native';
import '../global.css';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Pretendard: require('@/assets/fonts/PretendardVariable.ttf'),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  (Text as any).defaultProps = {
    ...(Text as any).defaultProps,
    style: [{ fontFamily: 'Pretendard' }, (Text as any).defaultProps?.style],
  };

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
