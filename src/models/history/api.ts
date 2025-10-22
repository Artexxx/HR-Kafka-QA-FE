// Employment History API models

export interface EmploymentHistoryDTO {
  id?: number;
  employee_id: string;
  company: string;
  position: string;
  period_from: string;
  period_to: string;
  stack: string[];
  created_at?: string;
}

export interface GetHistoryResponse {
  items: EmploymentHistoryDTO[];
}

export interface CreateHistoryRequest extends Omit<EmploymentHistoryDTO, 'id' | 'created_at'> {}

export interface UpdateHistoryRequest extends Partial<CreateHistoryRequest> {}
