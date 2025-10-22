// Kafka Events API models

export interface KafkaEventDTO {
  id: number;
  topic: string;
  partition: number;
  offset: number;
  message_id: string;
  payload: any; // JSON payload
  received_at: string;
}

export interface KafkaDLQDTO {
  id: number;
  topic: string;
  key: string;
  payload: any; // JSON payload with error context
  error: string;
  received_at: string;
}

export interface GetEventsResponse {
  items: KafkaEventDTO[];
}

export interface GetDLQResponse {
  items: KafkaDLQDTO[];
}
