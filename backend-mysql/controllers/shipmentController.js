import { query } from "../config/db.js";

export const create = async (req, res) => {
  try {
    if (!req.body.shipmentNumber) return res.status(400).json({ message: "Shipment Number is required." });
    if (!req.body.shipmentDate) return res.status(400).json({ message: "Shipment Date is required." });
    if (!req.body.shipmentStatus) return res.status(400).json({ message: "Status is required." });
    if (!req.body.destination) return res.status(400).json({ message: "Destination is required." });
    if (!req.body.supplierCode) return res.status(400).json({ message: "Supplier Code is required." });
    const values = [req.body.shipmentNumber, req.body.shipmentDate, req.body.shipmentStatus, req.body.destination, req.body.supplierCode];
    await query("INSERT INTO shipments (shipment_number, shipment_date, shipment_status, destination, supplier_code) VALUES (?, ?, ?, ?, ?)", values);
    return res.status(201).json({ message: "Shipment added successfully." });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Shipment already exists." });
    }
    return res.status(500).json({ message: "Failed to add shipment." });
  }
};

export const getAll = async (_req, res) => {
  try {
    const rows = await query("SELECT * FROM shipments ORDER BY shipment_number DESC");
    return res.json(rows);
  } catch {
    return res.status(500).json({ message: "Failed to fetch shipment records." });
  }
};

export const update = async (req, res) => {
  try {
    if (!req.body.shipmentNumber) return res.status(400).json({ message: "Shipment Number is required." });
    if (!req.body.shipmentDate) return res.status(400).json({ message: "Shipment Date is required." });
    if (!req.body.shipmentStatus) return res.status(400).json({ message: "Status is required." });
    if (!req.body.destination) return res.status(400).json({ message: "Destination is required." });
    if (!req.body.supplierCode) return res.status(400).json({ message: "Supplier Code is required." });
    const values = [req.body.shipmentNumber, req.body.shipmentDate, req.body.shipmentStatus, req.body.destination, req.body.supplierCode, req.params.id];
    const result = await query("UPDATE shipments SET shipment_number = ?, shipment_date = ?, shipment_status = ?, destination = ?, supplier_code = ? WHERE shipment_number = ?", values);
    if (!result.affectedRows) {
      return res.status(404).json({ message: "Shipment not found." });
    }
    return res.json({ message: "Shipment updated successfully." });
  } catch {
    return res.status(500).json({ message: "Failed to update shipment." });
  }
};

export const remove = async (req, res) => {
  try {
    const result = await query("DELETE FROM shipments WHERE shipment_number = ?", [req.params.id]);
    if (!result.affectedRows) {
      return res.status(404).json({ message: "Shipment not found." });
    }
    return res.json({ message: "Shipment deleted successfully." });
  } catch {
    return res.status(500).json({ message: "Failed to delete shipment." });
  }
};