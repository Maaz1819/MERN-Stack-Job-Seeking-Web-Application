import express from "express";
import { submitFeedback, getAllFeedbacks } from "../controllers/feedbackController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// User submits feedback
router.post("/submit", isAuthenticated, submitFeedback);

// Admin fetches all feedback
router.get("/all", isAuthenticated, getAllFeedbacks);

export default router;
