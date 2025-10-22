// Common API models

export interface OkResponse {
  status: string;
  msg: string;
}

export interface ErrorResponse {
  code: string;
  message: string;
}

export interface FileDTO {
  id: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
}
