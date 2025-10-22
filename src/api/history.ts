import { http } from '@/config/axios';
import { API_ENDPOINTS } from '@/constants/api';
import type {
  EmploymentHistoryDTO,
  CreateHistoryRequest,
  UpdateHistoryRequest,
} from '@/models/history/api';
import type { OkResponse } from '@/models/common/api';

export const getHistoryByEmployee = (employeeId: string) =>
  http.get<EmploymentHistoryDTO[]>(API_ENDPOINTS.HISTORY_BY_EMPLOYEE(employeeId));

export const createHistory = (data: CreateHistoryRequest) =>
  http.post<OkResponse>(API_ENDPOINTS.HISTORY, data);

export const updateHistory = (id: number, data: UpdateHistoryRequest) =>
  http.put<OkResponse>(API_ENDPOINTS.HISTORY_BY_ID(id), data);

export const deleteHistory = (id: number) =>
  http.delete<OkResponse>(API_ENDPOINTS.HISTORY_BY_ID(id));
