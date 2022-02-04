const constructImageQuery = (imagePath) => {
  if (!imagePath) {
    return undefined;
  }

  return `${process.env.NEXT_PUBLIC_API_URL}/media/getImage?path=${imagePath}`;
};

export default constructImageQuery;
