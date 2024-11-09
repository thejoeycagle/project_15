import { useState, useEffect } from 'react';
import { integrationService } from '../lib/database';

export interface BlandSettings {
  apiKey: string;
  pathwayId: string;
  fromNumber: string;
  model: string;
  voice: string;
  maxDuration: number;
  record: boolean;
}

const defaultSettings: BlandSettings = {
  apiKey: '',
  pathwayId: '',
  fromNumber: '',
  model: 'enhanced',
  voice: 'nat',
  maxDuration: 300,
  record: false
};

export const useBlandSettings = () => {
  const [settings, setSettings] = useState<BlandSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await integrationService.getBlandSettings();
      if (data) {
        setSettings({
          ...defaultSettings,
          ...data
        });
      }
    } catch (err) {
      console.error('Settings fetch error:', err);
      setError('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (newSettings: Partial<BlandSettings>) => {
    try {
      const updatedSettings = {
        ...settings,
        ...newSettings
      };

      const success = await integrationService.saveBlandSettings(updatedSettings);
      if (success) {
        setSettings(updatedSettings);
        return true;
      }
      throw new Error('Failed to save settings');
    } catch (err) {
      console.error('Settings save error:', err);
      setError('Failed to save settings');
      return false;
    }
  };

  return {
    settings,
    loading,
    error,
    saveSettings
  };
};