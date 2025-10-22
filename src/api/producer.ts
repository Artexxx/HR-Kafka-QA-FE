import { http } from '@/config/axios';
import { API_ENDPOINTS } from '@/constants/api';
import type {
  PersonalProduceRequest,
  PositionProduceRequest,
  HistoryProduceRequest,
} from '@/models/producer/api';
import type { OkResponse } from '@/models/common/api';

export const producePersonal = (data: PersonalProduceRequest) =>
  http.post<OkResponse>(API_ENDPOINTS.PRODUCER_PERSONAL, data);

export const producePosition = (data: PositionProduceRequest) =>
  http.post<OkResponse>(API_ENDPOINTS.PRODUCER_POSITION, data);

export const produceHistory = (data: HistoryProduceRequest) =>
  http.post<OkResponse>(API_ENDPOINTS.PRODUCER_HISTORY, data);
