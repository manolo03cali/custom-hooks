// Importa los hooks useEffect y useReducer desde React
import { useEffect, useReducer } from "react";

// Importa el reducer personalizado que contiene la lógica para manejar los todos
import { todoReducer } from "../08-useReducer/todoReducer";

//Estructura de los datos en el estado inicial vacío)
/*
const initialState = [
  {
    id: new Date().getTime(),           // ID único usando timestamp
    description: "Recolectar la piedra del alma", // Descripción de la tarea
    done: false,                        // Estado inicial no completado
  },
];
*/

// Función de inicialización para useReducer:
// Intenta recuperar las tareas guardadas en localStorage, si existen
const initialState = [];
const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || initialState;
};
/*------------------------------------------------------------------ */
// Custom hook que encapsula toda la lógica de manejo de tareas
export const useTodos = () => {
  // useReducer administra el estado de forma más estructurada que useState
  // - todoReducer: función reductora que define cómo cambiar el estado
  // - initialState: estado inicial (vacío en este caso)
  // - init: función que permite iniciar el estado desde localStorage
  const [todos, dispatch] = useReducer(todoReducer, initialState, init);

  // useEffect se ejecuta cada vez que cambia la lista de tareas (todos)
  // y actualiza el localStorage para mantener persistencia entre recargas
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos) || []);
  }, [todos]); // Dependencia: se ejecuta solo cuando cambia `todos`

  // Manejador para agregar una nueva tarea
  const handleNewTodo = (todo) => {
    const action = {
      type: "[TODO]Add Todo", // Tipo de acción definida en el reducer
      payload: todo, // La nueva tarea a agregar
    };
    dispatch(action); // Enviamos la acción al reducer
  };

  // Manejador para eliminar una tarea por su ID
  const handleDeleteTodo = (id) => {
    dispatch({
      type: "[TODO]Remove Todo", // Acción de eliminación
      payload: id, // ID de la tarea a eliminar
    });
  };

  // Manejador para alternar el estado de "completado" de una tarea (done: true/false)
  const handleToggleTodo = (id) => {
    dispatch({
      type: "[TODO]Toggle Todo", // Acción para alternar estado
      payload: id, // ID de la tarea a modificar
    });
  };

  // Este custom hook devuelve todo lo necesario para gestionar tareas
  return {
    todos, // Lista actual de tareas
    handleDeleteTodo, // Función para eliminar tareas
    handleToggleTodo, // Función para marcar tareas como completadas o no
    handleNewTodo, // Función para agregar nuevas tareas
    pendingTodosCount: todos.filter((todo) => !todo.done).length,
    todosCount: todos.length,
  };
};
