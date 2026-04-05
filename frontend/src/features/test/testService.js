import api from '../../api/axios';

// Get 
const getTest = async () => {
  const response = await api.get('/test');
  return response.data; 
};


//Create Service 
const createTest = async (testData) => {
  const response = await api.post('/test', testData);
  return response.data; 
};

const testService = { getTest, createTest };
export default testService;