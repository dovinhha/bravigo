export interface ApplicationType {
  label: string;
  value: number;
}

const types: ApplicationType[] = [{label: 'Tiện ích', value: 0}];

const primaryColor = '#790100';

export default {
  types,
  primaryColor,
};
