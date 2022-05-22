import {API_CALL} from '../requestHelper';


export const getKabarUdang = async (limit, page) => {
  try {
    const option = {
      method: 'get',
      url: `api/posts?per_page=' + ${limit} + '&page=' + ${page} + '&with=creator`,
    };
    let response = await API_CALL(option);

    return response;
  } catch (error) {
    return;
  }
};
