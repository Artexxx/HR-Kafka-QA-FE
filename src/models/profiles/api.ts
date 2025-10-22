// Employee Profiles API models

export interface EmployeeProfileDTO {
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string;
  title: string;
  department: string;
  grade: string;
  effective_from: string;
  updated_at?: string;
}

export interface GetProfilesResponse {
  items: EmployeeProfileDTO[];
}

export interface CreateProfileRequest extends Omit<EmployeeProfileDTO, 'updated_at'> {}

export interface UpdateProfileRequest extends Partial<CreateProfileRequest> {}
