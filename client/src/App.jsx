import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { LanguageProvider } from './context/LanguageContext';
import { SettingsProvider } from './context/SettingsContext';

function App() {
  return (
    <SettingsProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-bg-cream flex flex-col">
          <AppRoutes />
        </div>
      </LanguageProvider>
    </SettingsProvider>
  );
}

export default App;
