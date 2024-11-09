// Encryption key should be stored securely in production
const STORAGE_KEY = 'integration_settings';

export const saveIntegrationSettings = (integrationId: string, settings: Record<string, string>) => {
  try {
    // Get existing settings
    const existingData = localStorage.getItem(STORAGE_KEY);
    const allSettings = existingData ? JSON.parse(existingData) : {};
    
    // Update settings for this integration
    allSettings[integrationId] = settings;
    
    // Save back to storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allSettings));
    return true;
  } catch (error) {
    console.error('Failed to save integration settings:', error);
    return false;
  }
};

export const getIntegrationSettings = (integrationId: string): Record<string, string> | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    
    const allSettings = JSON.parse(data);
    return allSettings[integrationId] || null;
  } catch (error) {
    console.error('Failed to get integration settings:', error);
    return null;
  }
};

export const getAllIntegrationSettings = (): Record<string, Record<string, string>> => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Failed to get all integration settings:', error);
    return {};
  }
};