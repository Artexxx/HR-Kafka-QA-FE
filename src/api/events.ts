import { http } from '@/config/axios';
import { API_ENDPOINTS } from '@/constants/api';
import type { KafkaEventDTO, KafkaDLQDTO } from '@/models/events/api';

export const getEvents = () =>
  http.get<KafkaEventDTO[]>(API_ENDPOINTS.EVENTS);

export const getDLQ = () =>
  http.get<KafkaDLQDTO[]>(API_ENDPOINTS.DLQ);
