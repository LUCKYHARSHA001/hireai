const { fetchJobsFromGoogle } = require("../services/serpapiServices");

const getJobs = async (req, res) => {
  const { role, location } = req.query;

  if (!role || !location) {
    return res.status(400).json({
      error: "Missing search criteria. Please provide both role and location.",
    });
  }

  try {
    const jobs = await fetchJobsFromGoogle(role, location);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

module.exports = { getJobs };
