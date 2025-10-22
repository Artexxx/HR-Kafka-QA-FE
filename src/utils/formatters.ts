import { format, parseISO } from 'date-fns';

export const formatDate = (dateString: string): string => {
  try {
    return format(parseISO(dateString), 'dd.MM.yyyy');
  } catch {
    return dateString;
  }
};

export const formatDateTime = (dateString: string): string => {
  try {
    return format(parseISO(dateString), 'dd.MM.yyyy HH:mm:ss');
  } catch {
    return dateString;
  }
};

export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const decodePayload = (payload: number[]): string => {
  try {
    const text = new TextDecoder().decode(new Uint8Array(payload));
    return JSON.stringify(JSON.parse(text), null, 2);
  } catch {
    return String.fromCharCode(...payload);
  }
};
