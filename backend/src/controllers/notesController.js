import Note from "../models/Note.js";

export async function getAllNotes(_, res) {
     try {
          const notes = await Note.find().sort({ createdAt: -1 });
          res.status(200).json(notes);
     } catch (error) {
          console.error("Error fetching notes:", error);
          res.status(500).json({ message: "Internal Server Error" });
     }
};

export async function getNoteById(req, res) {
     try {
          const note = await Note.findById(req.params.id)
          if (!note) return res.status(404).json({ message: "Note not Found!" })
          res.json(note)
     } catch (error) {
          console.error("Error finding note:", error);
          res.status(500).json({ message: "Internal Server Error" });
     }
}

export async function createNote(req, res) {
     try {
          const { title, content } = req.body
          const note = new Note({ title, content })
          const savedNote = await note.save()
          res.status(201).json(savedNote)
     } catch (error) {
          console.error("Error creating notes:", error);
          res.status(500).json({ message: "Internal Server Error" });
     }
}

export async function updateNote(req, res) {
     try {
          const { title, content } = req.body
          const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true })
          if (!updatedNote) return res.status(404).json({ message: "Note not Found!" })
          res.status(200).json({ message: "Note updated Successfully" })
     } catch (error) {
          console.error("Error updating notes:", error);
          res.status(500).json({ message: "Internal Server Error" });
     }
}

export async function deleteNote(req, res) {
     try {
          const deletedNote = await Note.findByIdAndDelete(req.params.id)
          if (!deleteNote) return res.status(404).json({ message: "Note not Found!" })
          res.status(200).json({ message: "Note deleted Successfully" })
     } catch (error) {
          console.error("Error deleting notes:", error);
          res.status(500).json({ message: "Internal Server Error" });
     }
}