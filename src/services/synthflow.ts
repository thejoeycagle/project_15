import { SynthFlowConfig, SynthFlowResponse, CallRequest, CallResponse } from '../types/synthflow';

class SynthFlowService {
  async initiateCall(request: CallRequest): Promise<CallResponse> {
    try {
      console.log('Initiating call with request:', request);

      // Simulate successful API call for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response: CallResponse = {
        success: true,
        data: {
          callId: `${Date.now()}x${Math.random().toString().slice(2)}`,
          status: 'initializing',
          duration: 0,
          startTime: new Date().toISOString(),
          response: {
            answer: "ok",
            call_id: `${Date.now()}x${Math.random().toString().slice(2)}`
          }
        }
      };

      console.log('Call response:', response);
      return response;
    } catch (error) {
      console.error('Failed to initiate call:', error);
      const errorResponse: CallResponse = {
        success: false,
        error: {
          code: 'CALL_FAILED',
          message: error instanceof Error ? error.message : 'Failed to initiate call'
        }
      };
      console.log('Error response:', errorResponse);
      return errorResponse;
    }
  }

  async testConnection(): Promise<SynthFlowResponse> {
    try {
      console.log('Testing SynthFlow connection...');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = {
        success: true,
        message: 'Connection successful',
        response: {
          answer: "ok",
          call_id: `${Date.now()}x${Math.random().toString().slice(2)}`
        }
      };

      console.log('Connection test response:', response);
      return response;
    } catch (error) {
      console.error('Connection test failed:', error);
      const errorResponse = {
        success: false,
        error: {
          code: 'CONNECTION_FAILED',
          message: error instanceof Error ? error.message : 'Failed to connect to SynthFlow'
        }
      };
      console.log('Error response:', errorResponse);
      return errorResponse;
    }
  }

  async getCallStatus(callId: string): Promise<SynthFlowResponse> {
    try {
      console.log('Getting call status for:', callId);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const response = {
        success: true,
        data: {
          callId,
          status: 'completed',
          duration: 45,
          response: {
            answer: "ok",
            call_id: callId
          }
        }
      };

      console.log('Call status response:', response);
      return response;
    } catch (error) {
      console.error('Failed to get call status:', error);
      return {
        success: false,
        error: {
          code: 'STATUS_FAILED',
          message: error instanceof Error ? error.message : 'Failed to get call status'
        }
      };
    }
  }
}

export const synthFlow = new SynthFlowService();