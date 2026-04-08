export const validateRequest = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: result.error.errors });
  }
  req.body = result.data;
  next();
};
