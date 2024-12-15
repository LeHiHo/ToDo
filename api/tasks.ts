import { supabase } from '@/api';

// 모든 작업(Task) 가져오기
export const fetchTasks = async (userId: string) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    throw new Error(`작업을 가져오는 중 오류 발생: ${error.message}`);
  }

  return data;
};

// 작업 상태 업데이트
export const updateTaskStatus = async (taskId: number, completed: boolean) => {
  const { data, error } = await supabase
    .from('tasks')
    .update({ completed })
    .eq('id', taskId);

  if (error) {
    throw new Error(`작업 상태를 업데이트하는 중 오류 발생: ${error.message}`);
  }

  return data;
};
