export const removeListDuplicate = <T>(list: T[], key: keyof T): T[] => {
  return list.reduce((acc: T[], cur) => (acc.find((data: T) => data[key] === cur[key]) ? [...acc] : [...acc, cur]), []);
};
