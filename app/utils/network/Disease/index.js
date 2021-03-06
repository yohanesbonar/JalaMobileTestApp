import {API_CALL} from '../requestHelper';

export const getListDisease = async (limit, page) => {
  try {
    const option = {
      method: 'get',
      url: `api/diseases?per_page=${limit}&page=${page}&with=creator`,
    };
    let response = await API_CALL(option);

    return response;
  } catch (error) {
    return;
  }
};
