import { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import ToDo from "./components/ToDo";

function App() {
  const [todo, setToDo] = useState("");
  const [todos, setToDos] = useState<
    { id: number; text: string; isCompleted: boolean }[]
  >(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect( () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (todo.trim() === "") return;
    setToDos([...todos, { id: Date.now(), text: todo, isCompleted: false }]);
    setToDo("");
    inputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDo(e.target.value);
  };

  const handleToggle = (id: number) => {
    setToDos(
      todos.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item,
      ),
    );
  };

  const handleEdit = (id: number, newText: string) => {
    setToDos(
      todos.map((item) => (item.id === id ? { ...item, text: newText } : item)),
    );
  };

  const handleDelete = (id: number) => {
    setToDos(todos.filter((item) => item.id != id));
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 bg-violet-100 rounded-xl p-5 min-h-[80vh]">
        <h2 className="font-bold text-2xl">Add a Todo</h2>
        <div className="addToDo flex items-center gap-4 mb-6">
          <input
            type="text"
            onChange={handleChange}
            className="bg-white w-1/2"
            ref={inputRef}
          />
          <button
            onClick={handleAdd}
            className="bg-violet-800 hover:bg-violet-950 p-4 py-1 text-white rounded-md font-bold mx-6"
          >
            Add
          </button>
        </div>
        <h2 className="font-bold text-lg">Your Todos</h2>

        <div className="todos">
          {todos.map((item) => (
            <ToDo
              key={item.id}
              id={item.id}
              text={item.text}
              isCompleted={item.isCompleted}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
