import { constant } from "../constant/constant";

export const validateImageFile = (imageName: string) => {
  const lowerImageName = imageName.toLowerCase();
  return (
    lowerImageName.endsWith(".png") ||
    lowerImageName.endsWith(".jpg") ||
    lowerImageName.endsWith(".jpeg") ||
    lowerImageName.endsWith(".gif")
  );
};

export const queryHelper = (query: any) => {
  let obj = {};
  if (query.sortBy && query.sort) {
    obj = {
      ...obj,
      sort: {
        [query.sortBy]: query.sort == constant.sortType.ASC ? 1 : -1, // 1: ASC ? -1: DESC
      },
    };
  }
  if (query.limit) {
    obj = {
      ...obj,
      limit: query.limit,
    };
  }

  


  return obj;
};

