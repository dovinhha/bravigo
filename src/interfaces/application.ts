export interface Application {
  name: string;
  lastUpdate: string;
  notes: string;
  createdAt: string;
  iconUrl: string;
  fileUrl: string;
  type: number;
  version: string;
  packageName: string;
  unInstallRequired: boolean;
}

export interface ApplicationGroup {
  type: number;
  value: Application[];
}
