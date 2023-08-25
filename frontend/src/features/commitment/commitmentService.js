import axios from "axios";

const API_URL = "http://localhost:8000/api/commitments";

const fetchCommitments = async (token) => {
  const response = await axios.get(API_URL);

  if (response.data) {
    return response.data;
  }
};

const commitmentService = {
  fetchCommitments,
};

export default commitmentService;
