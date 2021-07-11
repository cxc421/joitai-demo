import { atom, useAtom } from "jotai";
import { useRef } from "react";
import { CommitCount } from "./utils/CommitCount";

type Todos = string[];

const todosAtom = atom<Todos>(["default todo 1"]);

const addNewTodoAtom = atom(null, (_get, set, update: string) => {
  set(todosAtom, (prev) => [...prev, update]);
});

const deleteTodoAtom = atom(null, (_get, set, idx: number) => {
  set(todosAtom, (prev) => prev.filter((_t, i) => i !== idx));
});

const todosNumAtom = atom((get) => get(todosAtom).length);

function AddNewTodo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [, addNewTodo] = useAtom(addNewTodoAtom);

  const handleAddTodoSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (inputRef.current) {
      addNewTodo(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  return (
    <form
      onSubmit={handleAddTodoSubmit}
      style={{ border: `solid 1px grey`, padding: 10, position: "relative" }}
    >
      <input ref={inputRef} type="text" required />
      <button type="submit" style={{ marginLeft: 2 }}>
        Add
      </button>
      <CommitCount />
    </form>
  );
}

function ToDoList() {
  const [todos, setTodos] = useAtom(todosAtom);
  const [, deleteTodo] = useAtom(deleteTodoAtom);

  const updateTodo = (idx: number, newTodo: string) => {
    setTodos((todos) => todos.map((t, i) => (i === idx ? newTodo : t)));
  };

  return (
    <div
      style={{
        position: "relative",
        border: "solid 1px grey",
        marginTop: 20,
        padding: 10,
        minHeight: 100,
      }}
    >
      {todos.map((todo, i) => (
        <div
          key={i}
          style={{
            padding: 2,
            display: "flex",
          }}
        >
          <input value={todo} onChange={(e) => updateTodo(i, e.target.value)} />
          <button style={{ marginLeft: 2 }} onClick={() => deleteTodo(i)}>
            X
          </button>
        </div>
      ))}
      <CommitCount />
    </div>
  );
}

function ToDoNumbers() {
  const [todosNum] = useAtom(todosNumAtom);
  return (
    <div
      style={{
        position: "relative",
        border: "solid 1px grey",
        marginTop: 20,
        padding: 10,
      }}
    >
      <span>ToDos Nums: {todosNum}</span>
      <CommitCount />
    </div>
  );
}

export function App() {
  return (
    <div style={{ width: 400, margin: "0 auto" }}>
      <AddNewTodo />
      <ToDoList />
      <ToDoNumbers />
    </div>
  );
}

export default App;
