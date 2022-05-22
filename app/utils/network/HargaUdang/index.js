import {API_CALL} from '../requestHelper';

export const getHargaUdang = async (limit, page) => {
  try {
    const option = {
      method: 'get',
      url: `shrimp_prices?per_page=' + ${limit} + '&page=' + ${page} + '&with=region,creator&region_id=`,
    };
    let response = await API_CALL(option);

    return response;
  } catch (error) {
    return;
  }
};
