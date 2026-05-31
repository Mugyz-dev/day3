import { query } from "../config/db.js";

export const create = async (req, res) => {
  try {
    if (!req.body.supplierCode) return res.status(400).json({ message: "Supplier Code is required." });
    if (!req.body.supplierName) return res.status(400).json({ message: "Supplier Name is required." });
    if (!req.body.telephone) return res.status(400).json({ message: "Telephone is required." });
    if (!req.body.address) return res.status(400).json({ message: "Address is required." });
    if (!req.body.email) return res.status(400).json({ message: "Email is required." });
    const values = [req.body.supplierCode, req.body.supplierName, req.body.telephone, req.body.address, req.body.email];
    await query("INSERT INTO suppliers (supplier_code, supplier_name, telephone, address, email) VALUES (?, ?, ?, ?, ?)", values);
    return res.status(201).json({ message: "Supplier added successfully." });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Supplier already exists." });
    }
    return res.status(500).json({ message: "Failed to add supplier." });
  }
};

export const getAll = async (_req, res) => {
  try {
    const rows = await query("SELECT * FROM suppliers ORDER BY supplier_code DESC");
    return res.json(rows);
  } catch {
    return res.status(500).json({ message: "Failed to fetch supplier records." });
  }
};