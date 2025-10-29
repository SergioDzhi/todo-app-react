import { useState } from 'react';

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export const AddTodo = ({ onAdd }: AddTodoProps) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Добавить новую задачу..."
      />
      <button type="submit">Добавить</button>
    </form>
  );
};