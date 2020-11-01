const { Schema, model } = require("mongoose");

const jobSchema = new Schema({
  id: { type: String, unique: true },
  title: String,
  snippet: String,
  category2: String,
  subcategory2: String,
  skills: Array,
  job_type: String,
  budget: Number,
  duration: String,
  workload: String,
  job_status: String,
  date_created: String,
  url: String,
  client: Object,
});

module.exports = model("Job", jobSchema);


