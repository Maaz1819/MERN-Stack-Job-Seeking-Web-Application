import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Feedback } from "../models/feedbackSchema.js";
import ErrorHandler from "../middlewares/error.js";

// User: Submit Feedback
export const submitFeedback = catchAsyncErrors(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(new ErrorHandler("All fields are required!", 400));
  }

  await Feedback.create({ name, email, message });

  res.status(201).json({
    success: true,
    message: "Feedback submitted successfully!",
  });
});

// Admin: Get All Feedbacks
export const getAllFeedbacks = catchAsyncErrors(async (req, res, next) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    feedbacks,
  });
});
