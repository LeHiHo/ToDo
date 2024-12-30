import { supabase } from '@/api';

export const getUser = async () => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw new Error(`Error fetching session: ${error.message}`);
    }

    if (!session || !session.user) {
      return null; // 로그인된 사용자가 없는 경우
    }

    return session.user; // 사용자 정보 반환
  } catch (error) {
    console.error('Error getting user:', error);
    return null; // 에러 발생 시 null 반환
  }
};
