import React from "react";

function List() {
  const list = [
    { id: 1, name: "John", age: 20, city: "New York" },
    { id: 2, name: "Jane", age: 21, city: "New York" },
    { id: 3, name: "Jack", age: 22, city: "New York" },
    { id: 4, name: "Jill", age: 23, city: "New York" },
    { id: 5, name: "Joe", age: 24, city: "New York" },
  ];

  return (
    <div className="flex flex-col mt-4 w-full max-w-2xl rounded-lg p-4">
      <ul className="space-y-3">
        {list.map((item) => (
          <li
            key={item.id}
            className="flex justify-between border-b border-gray-600 pb-2"
          >
            <div>{item.name}</div>
            <div>{item.age}</div>
            <div>{item.city}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
