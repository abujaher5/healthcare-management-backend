import app from "./app.js";

const PORT = 5000;

// Start server

const bootstrap = () => {
  try {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`),
    );
  } catch (error) {
    console.error("Failed to start server: ", error);
  }
};
bootstrap();
