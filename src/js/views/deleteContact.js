import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BootstrapModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Abrir Modal
      </button>

      {showModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Título del Modal</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Contenido del modal.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cerrar
                </button>
                <button type="button" className="btn btn-primary">
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BootstrapModal;
