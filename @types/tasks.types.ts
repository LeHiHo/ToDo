export interface TasksData {
  id: number; // Task ID (Primary Key)
  taskName: string; // Task 이름
  description: string; // Task 설명
  dueDate: string; // 마감일 (ISO 형식)
  insertedAt: string; // 생성일 (ISO 형식)
  updatedAt: string; // 수정일 (ISO 형식)
  priority: number; // 우선순위 (e.g., 1, 2, 3)
  status: 'pending' | 'in_progress' | 'completed'; // 작업 상태
  userId: string; // 사용자 ID (UUID)
  projectId: string; // 프로젝트 ID (UUID)
  parentTaskId: number | null; // 부모 Task ID (nullable)
}
