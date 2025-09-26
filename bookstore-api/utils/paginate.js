exports.getPagination = (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  return { limit, offset };
};

exports.getPagingData = (data, page = 1, limit = 10) => {
  const { count: totalItems, rows: results } = data;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    totalItems,
    totalPages,
    currentPage: parseInt(page),
    results,
  };
};
