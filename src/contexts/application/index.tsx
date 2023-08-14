import React, {createContext, useContext, useEffect, useState} from 'react';
import _ from 'lodash';
import queryString from 'query-string';
import {Application, ApplicationGroup} from '@interfaces/application';
import applications from '@apis/applications';

interface ApplicationContent {
  apps: Application[];
  appGroups: ApplicationGroup[];
  handleGetApplications: (value: boolean) => void;
  isLoading: boolean;
  isRefreshing: boolean;
}

type ApplicationProviderProps = {
  children: React.ReactNode;
};

const ApplicationContext = createContext<ApplicationContent | string>('');

export const ApplicationProvider = ({children}: ApplicationProviderProps) => {
  const [apps, setApps] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    handleGetApplications(false);
  }, []);

  const handleGetApplications = async (refeshing: boolean) => {
    if (refeshing) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    const res = await applications.getApplications(
      queryString.stringify({
        page: 1,
        limit: 9999,
      }),
    );
    const results = (res?.data.results as Application[]) ?? [];
    setApps(results);
    if (refeshing) {
      setIsRefreshing(false);
    } else {
      setIsLoading(false);
    }
  };

  const appGroups = _.chain(apps)
    .groupBy('type')
    .map((value: Application[], key: string) => ({
      type: Number(key),
      value: value,
    }))
    .value();

  const value = {
    apps,
    appGroups,
    isLoading,
    isRefreshing,
    handleGetApplications,
  };

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
