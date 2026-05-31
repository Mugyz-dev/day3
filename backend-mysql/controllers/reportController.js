import { query } from "../config/db.js";
const ranges = { daily: "DATE({f}) = CURDATE()", weekly: "YEARWEEK({f}, 1) = YEARWEEK(CURDATE(), 1)", monthly: "YEAR({f}) = YEAR(CURDATE()) AND MONTH({f}) = MONTH(CURDATE())" };
export const getReports = async (req, res) => {
  try {
    const period = req.query.period || "daily";
    const shipClause = (ranges[period] || ranges.daily).replace(/{f}/g, "shipment_date");
    const delClause = (ranges[period] || ranges.daily).replace(/{f}/g, "delivery_date");
    const suppliers = await query("SELECT * FROM suppliers");
    const shipments = await query(`SELECT * FROM shipments WHERE ${shipClause}`);
    const deliveries = await query(`SELECT * FROM deliveries WHERE ${delClause}`);
    return res.json({ period, reports: { suppliers, shipments, deliveries } });
  } catch { return res.status(500).json({ message: "Failed to generate reports." }); }
};