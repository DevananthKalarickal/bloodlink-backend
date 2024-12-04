const Ticket = require("../models/ticketModel");

// Fetch ticket history for a user
const fetchTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.body.userId }).sort({ createdTime: -1 });
    return res.status(200).send({
      success: true,
      tickets,
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return res.status(500).send({
      success: false,
      message: "Error fetching tickets",
    });
  }
};

// Create a new ticket
const createTicket = async (req, res) => {
  const { email, description, userId } = req.body;
  try {
    const newTicket = new Ticket({
      email,
      description,
      userId,
    });
    const savedTicket = await newTicket.save();
    return res.status(201).send({
      success: true,
      ticket: savedTicket,
    });
  } catch (error){
    console.error("Error creating ticket:", error);
    return res.status(500).send({
      success: false,
      message: "Error creating ticket",
    });
  }
};

// Update ticket status (mark as resolved)
// Assume you're using Mongoose to interact with MongoDB
// The Mongoose model for tickets

const  updateTicketStatus= async (req, res) => {
  const { id } = req.params; // _id from the URL parameter
  const { status, adminNote } = req.body; // Status and admin note from the request body

  try {
    // Find the ticket by _id and update the ticket
    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      { status, adminNote }, // Fields to update
      { new: true } // Return the updated document
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Return the updated ticket
    res.status(200).json({
      message: "Ticket updated successfully",
      ticket: updatedTicket,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};



// Fetch all tickets
const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json({ success: true, tickets });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete a ticket
const deleteTicket = async (req, res) => {
  try {
      const id = req.params.id;
      await Ticket.findByIdAndDelete(id);
      res.status(200)
          .json({ message: 'Task is deleted', success: true });
  } catch (err) {
      res.status(500).json({ message: 'Failed to delete task', success: false });
  }
};


module.exports = {
  fetchTickets,
  createTicket,
  updateTicketStatus,
  getTickets,
  deleteTicket
};