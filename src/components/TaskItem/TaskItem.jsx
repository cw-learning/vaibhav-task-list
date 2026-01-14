export default function TaskItem({ item, onToggle }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => onToggle(item.id)}
        className="w-4 h-4 accent-blue-600 cursor-pointer"
      />
      <span className={`${item.completed ? 'line-through text-gray-400' : 'text-gray-800'} transition-colors`}>
        {item.title}
      </span>
    </label>
  );
}