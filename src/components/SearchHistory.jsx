export default function SearchHistory({ history, onSelect }) {
  if (history.length === 0) return null;

  return (
    <div className="history">
      <p>Recent searches:</p>
      <ul>
        {history.map((city) => (
          <li key={city}>
            <button onClick={() => onSelect(city)}>{city}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}