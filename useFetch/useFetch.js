import { useEffect, useState } from "react";

// Objeto para almacenar en caché las respuestas de las URLs consultadas
const localCache = {};

// Custom Hook llamado useFetch
export const useFetch = (url) => {
  // Estado local que maneja los datos, la carga, y errores
  const [state, setstate] = useState({
    data: null, // Resultado de la petición
    isLoading: true, // Estado de carga
    hasError: false, // Si hubo un error
    error: null, // Mensaje de error si hay
  });

  // useEffect se ejecuta cuando cambia la URL
  useEffect(() => {
    getFetch(); // Llama a la función para hacer la petición
  }, [url]); // Solo se ejecuta cuando la URL cambia

  // Función para establecer el estado en "cargando"
  const setLoadingState = () => {
    setstate({
      data: null,
      isLoading: true,
      haserror: false, // ¡Ojo! Aquí hay un typo, debería ser `hasError`
      error: null,
    });
  };

  // Función asincrónica para obtener los datos desde la URL
  const getFetch = async () => {
    // Verifica si ya existe la respuesta guardada en caché
    if (localCache[url]) {
      console.log("úsando cache");
      setstate({
        data: localCache[url],
        isLoading: false,
        hasError: false,
        error: null,
      });
      return; // Sale de la función si ya estaba en caché
    }

    // Si no hay cache, establece estado de carga
    setLoadingState();

    // Realiza la petición fetch a la URL
    const resp = await fetch(url);

    // Simula una demora artificial de 1.5 segundos (solo para ejemplo)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Si la respuesta no es exitosa, establece el estado de error
    if (!resp.ok) {
      setstate({
        data: null,
        isLoading: false,
        hasError: true,
        error: resp.statusText,
      });
      return;
    }

    // Convierte la respuesta a JSON
    const data = await resp.json();

    // Actualiza el estado con los datos obtenidos
    setstate({
      data: data,
      isLoading: false,
      hasError: false,
      error: null,
    });

    // Guarda los datos en caché para futuras consultas a la misma URL
    localCache[url] = data;
  };

  // Retorna un objeto con los estados relevantes para el componente que use este hook
  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};
