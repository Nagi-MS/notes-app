import { useState, useEffect } from "react";

const API = "http://localhost:5000/api/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // READ: runs once when the page loads
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  // CREATE: send the form data to the backend
  const addNote = async () => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    const newNote = await res.json();
    setNotes([...notes, newNote]);
    setTitle("");
    setContent("");
  };

  // DELETE: remove from backend, then from the screen
  const deleteNote = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setNotes(notes.filter((n) => n._id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>My Notes</h1>
      <input placeholder="Title" value={title}
        onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Content" value={content}
        onChange={(e) => setContent(e.target.value)} />
      <button onClick={addNote}>Add</button>

      {notes.map((n) => (
        <div key={n._id}>
          <b>{n.title}</b>: {n.content}
          <button onClick={() => deleteNote(n._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;