import { Router } from "express";
import agentRoute from "./agent.route";
import adminRoute from "./admin.route";
import logRoute from "./log.routes";

// Index
const indexRoute = Router();

indexRoute.get("", async (req, res) => {
  res.json({ message: "Hello  World" });
});

indexRoute.use("/agent", agentRoute); // Routes defined in agentRoute will be accessible under /agent
indexRoute.use("/admin", adminRoute); // Routes defined in agentRoute will be accessible under /admin
indexRoute.use("/log", logRoute); // Routes defined in agentRoute will be accessible under /log

export default indexRoute;