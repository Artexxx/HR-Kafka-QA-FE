// Kafka-related constants

export const KAFKA_TOPICS = {
  PERSONAL: 'hr.personal',
  POSITIONS: 'hr.positions',
  HISTORY: 'hr.history',
} as const;

export const KAFKA_TOPIC_OPTIONS = [
  { value: KAFKA_TOPICS.PERSONAL, label: 'HR Personal' },
  { value: KAFKA_TOPICS.POSITIONS, label: 'HR Positions' },
  { value: KAFKA_TOPICS.HISTORY, label: 'HR History' },
];

export const GRADE_OPTIONS = [
  { value: 'Junior', label: 'Junior' },
  { value: 'Middle', label: 'Middle' },
  { value: 'Senior', label: 'Senior' },
  { value: 'Lead', label: 'Lead' },
  { value: 'Principal', label: 'Principal' },
];

export const DEPARTMENT_OPTIONS = [
  { value: 'Engineering', label: 'Engineering' },
  { value: 'QA', label: 'Quality Assurance' },
  { value: 'Product', label: 'Product Management' },
  { value: 'Design', label: 'Design' },
  { value: 'DevOps', label: 'DevOps' },
];
