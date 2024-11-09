export interface SynthFlowConfig {
  apiKey: string;
  organizationId: string;
  region?: string;
  modelId?: string;
}

export interface SynthFlowResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  response?: {
    answer: string;
    call_id: string;
  };
}

export interface CallRequest {
  phoneNumber: string;
  modelId?: string;
  script?: string;
  maxDuration?: number;
  recordCall?: boolean;
  transcribe?: boolean;
  language?: string;
  voice?: {
    id: string;
    settings?: {
      speed?: number;
      pitch?: number;
      volume?: number;
    };
  };
  compliance?: {
    maxAttempts?: number;
    retryDelay?: number;
    allowedTimeRanges?: {
      start: string;
      end: string;
      timezone: string;
    }[];
  };
  webhook?: {
    url: string;
    events?: string[];
    headers?: Record<string, string>;
  };
  metadata?: Record<string, any>;
}

export interface CallResponse {
  success: boolean;
  data?: {
    callId: string;
    status: CallStatus;
    duration: number;
    startTime: string;
    endTime?: string;
    recordingUrl?: string;
    transcriptUrl?: string;
    cost?: number;
    events?: CallEvent[];
    response?: {
      answer: string;
      call_id: string;
    };
  };
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export type CallStatus = 
  | 'initializing'
  | 'in-progress'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'no-answer'
  | 'busy'
  | 'voicemail';

export interface CallEvent {
  type: string;
  timestamp: string;
  data?: any;
}