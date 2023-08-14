export interface Application {
  name: string;
  lastUpdate: string;
  notes: string;
  createdAt: string;
  iconUrl: string;
  fileUrl: string;
  type: number;
}

export interface ApplicationGroup {
  type: number;
  value: Application[];
}
