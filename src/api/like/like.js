import axios from '../base';

const getTokenLikesCount = (params) =>
  axios.get('/like/countLikes', { params });

const getLikeForToken = (params) => axios.get('/like/getLikes', { params });

const toggleLikeForToken = (params) => axios.post('like/like', { ...params });

export default {
  getTokenLikesCount,
  getLikeForToken,
  toggleLikeForToken,
};
