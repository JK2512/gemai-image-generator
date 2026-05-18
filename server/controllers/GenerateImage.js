import * as dotenv from "dotenv";
import { createError } from "../error.js";

dotenv.config();

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    // Generate image URL
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      prompt
    )}?width=1024&height=1024&seed=${Math.random()}`;

    // Fetch image
    const response = await fetch(imageUrl);

    // Convert image to buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convert to base64
    const base64Image = buffer.toString("base64");

    // Send base64 image
    res.status(200).json({
      photo: `data:image/jpeg;base64,${base64Image}`,
    });
  } catch (error) {
    console.log(error);

    next(
      createError(
        error.status || 500,
        error.message || "Failed to generate image"
      )
    );
  }
};