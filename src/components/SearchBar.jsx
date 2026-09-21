import { useState } from "react";

export default function SearchBar({ onSearch, onLocate }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search a city..."
      />
      <button type="submit">Search</button>
      <button type="button" onClick={onLocate}>📍</button>
    </form>
  );
}