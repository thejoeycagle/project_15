import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ConsumerPortal from './pages/ConsumerPortal';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/:clientUrl/*" element={<ConsumerPortal />} />
      <Route path="/demo" element={<ConsumerPortal isDemo={true} />} />
      <Route path="/" element={<ConsumerPortal />} />
    </Routes>
  );
};

export default App;