import axios from '../base';

const getUserProfile = (walletAddress) =>
  axios.get(`/user/getUserProfile?walletAddress=${walletAddress}`);

const getProfileForUsername = (username) =>
  axios.get(`/User/GetProfileForUsername?username=${username}`);

const updateConnectedUserProfile = (formData) =>
  axios.post(`/user/onPostUpload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=' + formData._boundary,
    },
  });

export default {
  getUserProfile,
  updateConnectedUserProfile,
  getProfileForUsername,
};
