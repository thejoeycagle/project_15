import React from 'react';

interface HeatMapProps {
  data: Array<{ [key: string]: any }>;
  valueKey: string;
  labelKey: string;
}

const HeatMap: React.FC<HeatMapProps> = ({ data, valueKey, labelKey }) => {
  const getColor = (value: number) => {
    // Color scale from red to green based on value
    const hue = ((value - 0) * 120) / 100;
    return `hsl(${hue}, 70%, 50%)`;
  };

  const getOpacity = (value: number) => {
    return (value / 100) * 0.8 + 0.2; // Minimum opacity of 0.2
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      {data.map((item, index) => (
        <div key={index} className="flex items-center">
          <div className="w-24 text-gray-400 text-sm">{item[labelKey]}</div>
          <div className="flex-1 h-8 relative">
            <div
              className="absolute inset-0 rounded"
              style={{
                backgroundColor: getColor(item[valueKey]),
                opacity: getOpacity(item[valueKey])
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium">
              {item[valueKey]}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeatMap;