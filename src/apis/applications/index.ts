import {GET} from '@configs/axiosBases';
import urls from '@configs/urls';

const getApplications = async () => {
  try {
    return await GET(urls.applications);
  } catch (error) {
    return null;
  }
};

export default {
  getApplications,
};
