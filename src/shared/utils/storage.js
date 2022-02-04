const save = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const get = (key) => {
  try {
    const item = localStorage.getItem(key);
    return JSON.parse(item);
  } catch {
    return null;
  }
};

const remove = (key) => {
  localStorage.removeItem(key);
};

export default {
  save,
  get,
  remove,
};
