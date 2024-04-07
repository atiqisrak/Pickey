const Job = require("../models/job");

// Function to create a new job (assuming validation and authorization are done elsewhere)
exports.createJob = async (jobData) => {
  const newJob = new Job(jobData);
  return await newJob.save();
};

// Function to get all jobs (consider adding filters and pagination for larger datasets)
exports.getJobs = async () => {
  return await Job.find();
};

// Function to get a job by ID
exports.getJobById = async (jobId) => {
  return await Job.findById(jobId);
};

// Function to update a job (assuming validation and authorization are done elsewhere)
exports.updateJob = async (jobId, updateData) => {
  const job = await Job.findByIdAndUpdate(jobId, updateData, { new: true });
  return job;
};

// Function to delete a job (assuming authorization is done elsewhere)
exports.deleteJob = async (jobId) => {
  return await Job.findByIdAndDelete(jobId);
};
