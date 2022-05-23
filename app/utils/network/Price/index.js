import {API_CALL} from '../requestHelper';

export const getListPrice = async (limit, page) => {
  try {
    const option = {
      method: 'get',
      url: `api/shrimp_prices?per_page=${limit}&page=${page}&with=region,creator&region_id=`,
    };
    let response = await API_CALL(option);

    return response;
  } catch (error) {
    return;
  }
};

export const getListRegion = async (page, search) => {
  search = search ? search : '';
  try {
    const option = {
      method: 'get',
      url: `api/regions?has=shrimp_prices&page= ${page}&search=${search}`,
    };
    let response = await API_CALL(option);

    return response;
  } catch (error) {
    return;
  }
};
