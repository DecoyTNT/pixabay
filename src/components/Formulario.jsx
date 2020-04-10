import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

const Formulario = ({ setBusqueda }) => {

    const [termino, setTermino] = useState('');
    const [error, setError] = useState(false)

    const buscarImagen = e => {
        e.preventDefault();

        if (termino.trim() === '') {
            return setError(true);
        }
        setError(false);

        setBusqueda(termino);
    }

    return (
        <form
            onSubmit={buscarImagen}
        >
            <div className="row mt-4">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca un imagen, ejemplo: futbol o café"
                        onChange={e => setTermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-primary btn-block"
                        value="Buscar"
                    />
                </div>
            </div>
            {error ? <Error mensaje="Agrega un término de búsqueda" /> : null}
        </form>
    );
}

Formulario.propTypes = {
    setBusqueda: PropTypes.func.isRequired
}

export default Formulario;