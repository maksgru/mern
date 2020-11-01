const UpworkIpi = require("upwork-api");
const Search = require("upwork-api/lib/routers/jobs/search.js").Search;
const Job = require("../models/Job");

const Upwork = {
  getJobs(params) {
    const config = {
      consumerKey: "",
      consumerSecret: "",
      accessToken: "", // assign if known
      accessSecret: "", // assign if known
      debug: false,
    };

    const api = new UpworkIpi(config);
    const jobs = new Search(api);
    api.setAccessToken(config.accessToken, config.accessSecret, () => {
      jobs.find(params, (error, data) => {
        const job = data.jobs;
        Job.insertMany(job)
          .then(function () {
            console.log("Data inserted"); // Success
          })
          .catch(function (error) {
            console.log(error); // Failure
          });
      });
    });
  },
};

module.exports = Upwork;
