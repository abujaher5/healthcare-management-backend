import app from "./app.js";
import { envVars } from "./config/env.js";

const PORT = 5000;

// Start server

const bootstrap = () => {
  try {
    app.listen(envVars.PORT, () =>
      console.log(`Server running on http://localhost:${envVars.PORT}`),
    );
  } catch (error) {
    console.error("Failed to start server: ", error);
  }
};
bootstrap();
