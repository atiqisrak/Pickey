const express = require("express");
const jobController = require("../controllers/jobController");

const router = express.Router();

// Create a new job (For authorized admins only, implement authorization middleware)
router.post("/", async (req, res) => {
  try {
    const newJob = await jobController.createJob(req.body);
    res.status(201).json(newJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating job" });
  }
});

// Get all jobs (consider adding filters and pagination for larger datasets)
router.get("/", async (req, res) => {
  try {
    const jobs = await jobController.getJobs();
    res.status(200).json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching jobs" });
  }
});

// Get a job by ID
router.get("/:jobId", async (req, res) => {
  try {
    const job = await jobController.getJobById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching job" });
  }
});

// Update a job (For authorized admins only, implement authorization middleware)
router.put("/:jobId", async (req, res) => {
  try {
    const updatedJob = await jobController.updateJob(
      req.params.jobId,
      req.body
    );
    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(updatedJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating job" });
  }
});

// Delete a job (For authorized admins only, implement authorization middleware)
router.delete("/:jobId", async (req, res) => {
  try {
    const deletedJob = await jobController.deleteJob(req.params.jobId);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting job" });
  }
});

module.exports = router;
