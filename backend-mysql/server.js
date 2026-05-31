import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./config/db.js";
import auth from "./middleware/auth.js";
import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import shipmentRoutes from "./routes/shipmentRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5555;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/suppliers", auth, supplierRoutes);
app.use("/api/shipments", auth, shipmentRoutes);
app.use("/api/deliveries", auth, deliveryRoutes);
app.use("/api/reports", auth, reportRoutes);

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message || "Server error" });
});

connectDatabase().then((ok) => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    if (!ok) console.log("Database Connection Failed");
  });
});
