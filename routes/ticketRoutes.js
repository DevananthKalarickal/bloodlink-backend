const express = require("express");
const router = express.Router();


const authMiddleware = require("../middlewares/authMiddelware");
const { fetchTickets, createTicket, updateTicketStatus, getTickets, deleteTicket } = require("../controllers/ticketController");

// Route to fetch tickets
router.post("/tickets/history", authMiddleware, fetchTickets);

// Route to create a new ticket
router.post("/tickets/create", authMiddleware, createTicket);

// Route to update ticket status
router.put("/tickets/:id", authMiddleware, updateTicketStatus);

// Route to get all tickets
router.get("/tickets/all", authMiddleware, getTickets);

// Route to delete a ticket
router.delete("/tickets/:id", authMiddleware, deleteTicket);

module.exports = router;