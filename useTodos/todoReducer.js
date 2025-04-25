// Definición del reducer para manejar el estado de la lista de TODOs
export const todoReducer = (initialState = [], action) => {
  // Se evalúa el tipo de acción usando switch
  switch (action.type) {
    // Acción para agregar un nuevo TODO
    case "[TODO]Add Todo":
      // Retorna un nuevo arreglo con todos los elementos anteriores + el nuevo TODO
      return [...initialState, action.payload];

    // Acción para eliminar un TODO por su ID
    case "[TODO] Remove Todo":
      // Filtra todos los TODOs y elimina aquel cuyo id coincida con el payload
      return initialState.filter((todo) => todo.id !== action.payload);

    // Acción para cambiar el estado (done) de un TODO
    case "[TODO]Toggle Todo":
      // Mapea todos los TODOs, si encuentra uno con el ID igual al payload, invierte su estado 'done'
      return initialState.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo, // Mantiene el resto de las propiedades
            done: !todo.done, // Cambia el valor de done a su opuesto (true/false)
          };
        }

        // Si el ID no coincide, se retorna el TODO sin cambios
        return todo;
      });

    // Si la acción no coincide con ninguno de los casos anteriores, retorna el estado actual sin cambios
    default:
      return initialState;
  }
};
