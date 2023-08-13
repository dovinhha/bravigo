import React, {createContext, useContext, useEffect, useState} from 'react';
import {Application} from '@interfaces/application';
import applications from '@apis/applications';

interface ApplicationContent {
  apps: Application[];
  handleGetApplications: () => void;
  isLoading: boolean;
}

type ApplicationProviderProps = {
  children: React.ReactNode;
};

const ApplicationContext = createContext<ApplicationContent | string>('');

export const ApplicationProvider = ({children}: ApplicationProviderProps) => {
  const [apps, setApps] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleGetApplications();
  }, []);

  const handleGetApplications = async () => {
    setIsLoading(true);
    const res = await applications.getApplications();
    const results = (res?.data.results as Application[]) ?? [];
    setApps(results);
    setIsLoading(false);
  };

  const value = {apps, isLoading, handleGetApplications};

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
