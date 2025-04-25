// Importamos el hook useState de React para manejar el estado del contador.
import { useState } from "react";

// Definimos y exportamos un hook personalizado llamado useCounter.
// Acepta un parámetro opcional `initialValue`, cuyo valor por defecto es 10.
export const useCounter = (initialValue = 10) => {
  // Declaramos una variable de estado llamada `counter` y su función modificadora `setcounter`.
  // Se inicializa con el valor de `initialValue`.
  const [counter, setcounter] = useState(initialValue);

  // Función para incrementar el contador.
  // Acepta un valor opcional `value`, que por defecto es 1.
  const increment = (value = 1) => {
    // Actualizamos el estado sumando el valor recibido al valor actual.
    setcounter((current) => current + value);
  };

  // Función para decrementar el contador.
  // Acepta un valor opcional `value`, que por defecto es 1.
  const decrement = (value = 1) => {
    // Si el contador ya está en 0, no hacemos nada.
    if (counter == 0) return;
    // De lo contrario, restamos el valor recibido al valor actual.
    //Cuando usas una función, React te garantiza que current será el valor más reciente del estado, incluso si hay muchas actualizaciones al mismo tiempo.
    //setcounter(counter-value)
    setcounter((current) => current - value);
  };

  // Función para reiniciar el contador al valor inicial.
  const reset = () => {
    setcounter(initialValue);
  };

  // Retornamos un objeto con el contador y las funciones para manipularlo.
  return {
    counter,
    increment,
    decrement,
    reset,
  };
};
