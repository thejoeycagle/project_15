import { useState, useCallback } from 'react';
import SynthFlowService from '../services/synthflow';
import { SynthFlowConfig, CallRequest, CallResponse } from '../types/synthflow';

export const useSynthFlow = (config: SynthFlowConfig) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const synthFlow = new SynthFlowService(config);

  const makeCall = useCallback(async (request: CallRequest) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await synthFlow.initiateCall(request);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to make call'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [synthFlow]);

  const getCallStatus = useCallback(async (callId: string) => {
    try {
      return await synthFlow.getCallStatus(callId);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to get call status'));
      throw err;
    }
  }, [synthFlow]);

  const endCall = useCallback(async (callId: string) => {
    try {
      return await synthFlow.endCall(callId);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to end call'));
      throw err;
    }
  }, [synthFlow]);

  const getRecording = useCallback(async (callId: string) => {
    try {
      return await synthFlow.getRecording(callId);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to get recording'));
      throw err;
    }
  }, [synthFlow]);

  const getTranscript = useCallback(async (callId: string) => {
    try {
      return await synthFlow.getTranscript(callId);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to get transcript'));
      throw err;
    }
  }, [synthFlow]);

  const testConnection = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await synthFlow.testConnection();
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to test connection'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [synthFlow]);

  return {
    makeCall,
    getCallStatus,
    endCall,
    getRecording,
    getTranscript,
    testConnection,
    isLoading,
    error
  };
};