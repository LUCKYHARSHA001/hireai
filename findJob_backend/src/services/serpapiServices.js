const { getJson } = require("serpapi");

const fetchJobsFromGoogle = async (role, location) => {
  try {
    const response = await getJson({
      engine: "google_jobs",
      q: `${role} in ${location}`,
      api_key: process.env.SERPAPI_KEY,
      hl: "en",
      gl: "us",
    });
    return response.jobs_results;
  } catch (error) {
    console.error("SerpApi Service Error:", error);
    throw error;
  }
};

module.exports = { fetchJobsFromGoogle };