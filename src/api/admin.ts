import { http } from '@/config/axios';
import { API_ENDPOINTS } from '@/constants/api';
import type { OkResponse } from '@/models/common/api';

export const checkHealth = () =>
    http.get<OkResponse>(API_ENDPOINTS.HEALTH);

export interface ResetRequest {
    password: string;
}

export const resetData = (password: string) =>
    http.post<OkResponse>(API_ENDPOINTS.RESET, { password } as ResetRequest);
