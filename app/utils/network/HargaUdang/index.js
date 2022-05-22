import {API_CALL} from '../requestHelper';

export const getHargaUdang = async (limit, page) => {
  try {
    const option = {
      method: 'get',
      url: `api/shrimp_prices?per_page=' + ${limit} + '&page=' + ${page} + '&with=region,creator&region_id=`,
    };
    let response = await API_CALL(option);

    return response;
  } catch (error) {
    return;
  }
};

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

export const getPenyakit = async (limit, page) => {
  try {
    const option = {
      method: 'get',
      url: `api/diseases?per_page=' + ${limit} + '&page=' + ${page} + '&with=creator`,
    };
    let response = await API_CALL(option);

    return response;
  } catch (error) {
    return;
  }
};
