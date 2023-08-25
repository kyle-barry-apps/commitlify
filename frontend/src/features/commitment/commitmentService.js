import axios from "axios";

const API_URL = "http://localhost:8000/api/commitments/";

const fetchCommitments = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  console.log(response.data);

  return response.data;
};

const createCommitment = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, data, config);

  return response.data;
};

const commitmentService = {
  fetchCommitments,
  createCommitment,
};

export default commitmentService;
