import React, {createContext, useContext, useState} from 'react';
import {Application} from '@interfaces/application';

interface ApplicationContent {
  applications: Application[];
}

type ApplicationProviderProps = {
  children: React.ReactNode;
};

const ApplicationContext = createContext<ApplicationContent | string>('');

export const ApplicationProvider = ({children}: ApplicationProviderProps) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const value = {applications};
  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (typeof context === 'string') {
    throw new Error(context);
  }
  return context;
};
