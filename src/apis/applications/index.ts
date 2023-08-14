import {GET} from '@configs/axiosBases';
import urls from '@configs/urls';

const getApplications = async (query: string) => {
  try {
    return await GET(`${urls.applications}?${query}`);
  } catch (error) {
    console.log('error: ', error);
    return null;
  }
};

export default {
  getApplications,
};
