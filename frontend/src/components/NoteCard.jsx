import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter(note => note._id !== id ))
      toast.success("Note Deleted Successfully");
    } catch (error) {
      console.error("Err in handle Delete", error);
      toast.error("Failed to delete Note");
    }
  };
  try {
    return (
      <div className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-primary">
        <div className="card-body">
          <Link to={`/note/${note._id}`} className="block">
            <h3 className="card-title text-base-content">{note.title}</h3>
            <p className="text-base-content/70 line-clamp-3">{note.content}</p>
            <span className="text-sm text-base-content/60 block mt-2">
              {formatDate(new Date(note.createdAt))}
            </span>
          </Link>

          <div className="flex items-center justify-between mt-4">
            <PenSquareIcon className="size-4" />
            <button
              onClick={(e) => handleDelete(e, note._id)}
              className="btn btn-ghost btn-xs text-error"
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering NoteCard:", error);
    return <p className="text-red-500">Failed to render note.</p>;
  }
};

export default NoteCard;
