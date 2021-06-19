const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_COURSE } = process.env;

//API Adapter inisialisation
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const imageCourses = await api.post("/api/image-courses", req.body);

    return res.json(imageCourses.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "Service Unavailable" });
    }
    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
