const resultsHandler = model => async (req, res, next) => {
  const reqQuery = { ...req.query };

  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Delete fields from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($eq, $gt, $gte, $lt, $lte and $in)
  queryStr = queryStr.replace(/\b(eq|gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  let query = model.find(JSON.parse(queryStr));

  // Select
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query.sort(sortBy);
  } else {
    query = query.sort('-createdAt'); // Default sort
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  if (
    req.baseUrl === '/api/v1/appointments' ||
    req.baseUrl === '/api/v1/prescriptions' ||
    req.baseUrl === '/api/v1/exams'
  ) {
    query = query.skip(startIndex).limit(limit).populate({
      path: 'patient physician',
      select: 'firstName lastName age telephone email healthInsurance'
    });
  } else {
    query = query.skip(startIndex).limit(limit);
  }

  const results = await query;

  // Pagination data
  const pagination = {
    limit
  };

  if (endIndex < total) {
    pagination.nextPage = page + 1;
  }

  if (startIndex > 0) {
    pagination.prevPage = page - 1;
  }

  res.resultsHandler = {
    data: results,
    total: results.length,
    pagination
  };

  next();
}

module.exports = resultsHandler;
