// Producer API models

export interface PersonalProduceRequest {
  message_id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string;
}

export interface PositionProduceRequest {
  message_id: string;
  employee_id: string;
  title: string;
  department: string;
  grade: string;
  effective_from: string;
}

export interface HistoryProduceRequest {
  message_id: string;
  employee_id: string;
  company: string;
  position: string;
  period_from: string;
  period_to: string;
  stack: string[];
}
