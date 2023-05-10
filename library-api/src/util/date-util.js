const timeToLocaleTime = (data, property) => {
  const time = Date.parse(data[property]);
  const date = new Date(time);
  return date.toLocaleString("ID-id");
};

export default timeToLocaleTime;
