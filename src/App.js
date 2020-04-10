import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Axios from 'axios';
import Listado from './components/Listado';

function App() {

  const [busqueda, setBusqueda] = useState('');

  const [imagenes, setImagenes] = useState([]);

  const [paginaActual, setPaginaActual] = useState(1);

  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    const consultarAPI = async () => {
      if (busqueda === '') return;

      const imagenesPorPagina = 30;
      const key = '15960504-57997715d9ee5c66860a91c17';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}&lang=es`;

      const respuesta = await Axios.get(url);

      setImagenes(respuesta.data.hits);

      setTotalPaginas(Math.ceil(respuesta.data.totalHits / imagenesPorPagina));

      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' })
    }
    consultarAPI();
  }, [busqueda, paginaActual]);

  const paginaAnterior = () => {

    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }

  }

  const paginaSiguiente = () => {
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1)
    }
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <h1 className="display-4 text-center">Buscador de imagenes</h1>

        <Formulario
          setBusqueda={setBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <Listado
          imagenes={imagenes}
        />

        {
          (paginaActual > 1)
            ? <button
              type="button"
              className="btn btn-primary mr-1"
              onClick={paginaAnterior}
            >&laquo; Anterior
            </button>
            : null
        }
        {
          (paginaActual < totalPaginas)
            ? <button
              type="button"
              className="btn btn-primary"
              onClick={paginaSiguiente}
            >
              Siguiente &raquo;
          </button>
            : null
        }


      </div>
    </div>
  );
}

export default App;
