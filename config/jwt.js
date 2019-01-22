module.exports = {
  secret: process.env.JWT_SECRET || null,
  // Count as second
  ttl: 60 * (process.env.JWT_TTL || 15),
  refresh_ttl: 60 * (process.env.JWT_REFRESH_TTL || 20160),
};
