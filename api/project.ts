import { supabase } from '@/api';

// 프로젝트 목록 가져오기
export const fetchProjects = async (userId: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    throw new Error(`프로젝트를 가져오는 중 오류 발생: ${error.message}`);
  }

  return data;
};

// 프로젝트 생성
export const createProject = async (payload: {
  name: string;
  userId: string;
}) => {
  const { data, error } = await supabase.from('projects').insert([payload]);

  if (error) {
    throw new Error(`프로젝트를 추가하는 중 오류 발생: ${error.message}`);
  }

  return data;
};
