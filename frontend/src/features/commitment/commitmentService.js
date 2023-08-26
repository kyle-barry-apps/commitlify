import axios from "axios";

const API_URL = "http://localhost:8000/api/commitments/";

const fetchCommitments = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

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

const updateCommitment = async (id, data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + id, data, config);

  return response.data;
};

const deleteCommitment = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + id, config);

  return response.data;
};

const commitmentService = {
  fetchCommitments,
  createCommitment,
  updateCommitment,
  deleteCommitment,
};

export default commitmentService;
