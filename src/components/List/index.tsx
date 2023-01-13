import React from "react";

// Crear una lista de elementos con un array de objetos con checkbox y texto
const List = () => {
  const [list, setList] = React.useState([
    {
      id: 1,
      text: "Todo 1",
      checked: false,
    },
    {
      id: 2,
      text: "Todo 2",
      checked: false,
    },
    {
      id: 3,
      text: "Todo 3",
      checked: false,
    },
  ]);

  // Funcion para cambiar el estado de checked
  const handleCheck = (id: number) => {
    const newList = list.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked: !item.checked,
        };
      }
      return item;
    });
    setList(newList);
  };

  return (
    <div>
      {list.map((item) => (
        <div key={item.id}>
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => handleCheck(item.id)}
          />
          <label>{item.text}</label>
        </div>
      ))}
    </div>
  );
};

export default List;
