import { http } from '@/config/axios';
import { API_ENDPOINTS } from '@/constants/api';
import type {
  EmployeeProfileDTO,
  CreateProfileRequest,
  UpdateProfileRequest,
} from '@/models/profiles/api';
import type { OkResponse } from '@/models/common/api';

export const getProfiles = () =>
  http.get<EmployeeProfileDTO[]>(API_ENDPOINTS.PROFILES);

export const getProfileById = (employeeId: string) =>
  http.get<EmployeeProfileDTO>(API_ENDPOINTS.PROFILE_BY_ID(employeeId));

export const createProfile = (data: CreateProfileRequest) =>
  http.post<OkResponse>(API_ENDPOINTS.PROFILES, data);

export const updateProfile = (employeeId: string, data: UpdateProfileRequest) =>
  http.put<OkResponse>(API_ENDPOINTS.PROFILE_BY_ID(employeeId), data);

export const deleteProfile = (employeeId: string) =>
  http.delete<OkResponse>(API_ENDPOINTS.PROFILE_BY_ID(employeeId));
