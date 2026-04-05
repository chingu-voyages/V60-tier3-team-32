import api from '../../api/axios';

const getTest = async () => {
  const response = await api.get('/test');
  return response.data; // Just the data, no Redux logic here
};

const testService = {
  getTest,
};

export default testService;