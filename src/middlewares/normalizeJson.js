const normalizeJson = (payload = {}) => {
  return Object.fromEntries(
    Object.entries(payload).map(([key, value]) => [
      key,
      value === "" ? null : value,
    ]),
  );
};

export default normalizeJson;
