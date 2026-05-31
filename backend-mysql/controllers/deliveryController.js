import { query } from "../config/db.js";

export const create = async (req, res) => {
  try {
    if (!req.body.deliveryCode) return res.status(400).json({ message: "Delivery Code is required." });
    if (!req.body.deliveryDate) return res.status(400).json({ message: "Delivery Date is required." });
    if (req.body.quantityDelivered === undefined || req.body.quantityDelivered === "") return res.status(400).json({ message: "Quantity Delivered is required." });
    if (!req.body.deliveryStatus) return res.status(400).json({ message: "Delivery Status is required." });
    if (!req.body.shipmentNumber) return res.status(400).json({ message: "Shipment Number is required." });
    const values = [req.body.deliveryCode, req.body.deliveryDate, req.body.quantityDelivered, req.body.deliveryStatus, req.body.shipmentNumber];
    await query("INSERT INTO deliveries (delivery_code, delivery_date, quantity_delivered, delivery_status, shipment_number) VALUES (?, ?, ?, ?, ?)", values);
    return res.status(201).json({ message: "Delivery added successfully." });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Delivery already exists." });
    }
    return res.status(500).json({ message: "Failed to add delivery." });
  }
};

export const getAll = async (_req, res) => {
  try {
    const rows = await query("SELECT * FROM deliveries ORDER BY delivery_code DESC");
    return res.json(rows);
  } catch {
    return res.status(500).json({ message: "Failed to fetch delivery records." });
  }
};

export const update = async (req, res) => {
  try {
    if (!req.body.deliveryCode) return res.status(400).json({ message: "Delivery Code is required." });
    if (!req.body.deliveryDate) return res.status(400).json({ message: "Delivery Date is required." });
    if (req.body.quantityDelivered === undefined || req.body.quantityDelivered === "") return res.status(400).json({ message: "Quantity Delivered is required." });
    if (!req.body.deliveryStatus) return res.status(400).json({ message: "Delivery Status is required." });
    if (!req.body.shipmentNumber) return res.status(400).json({ message: "Shipment Number is required." });
    const values = [req.body.deliveryCode, req.body.deliveryDate, req.body.quantityDelivered, req.body.deliveryStatus, req.body.shipmentNumber, req.params.id];
    const result = await query("UPDATE deliveries SET delivery_code = ?, delivery_date = ?, quantity_delivered = ?, delivery_status = ?, shipment_number = ? WHERE delivery_code = ?", values);
    if (!result.affectedRows) {
      return res.status(404).json({ message: "Delivery not found." });
    }
    return res.json({ message: "Delivery updated successfully." });
  } catch {
    return res.status(500).json({ message: "Failed to update delivery." });
  }
};

export const remove = async (req, res) => {
  try {
    const result = await query("DELETE FROM deliveries WHERE delivery_code = ?", [req.params.id]);
    if (!result.affectedRows) {
      return res.status(404).json({ message: "Delivery not found." });
    }
    return res.json({ message: "Delivery deleted successfully." });
  } catch {
    return res.status(500).json({ message: "Failed to delete delivery." });
  }
};