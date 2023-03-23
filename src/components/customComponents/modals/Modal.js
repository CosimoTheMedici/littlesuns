import React from 'react'
import PropTypes from "prop-types";
import { LoginInput } from '../inputs/Input';

export const Modal = ({
    modalTitle,
    modalBody,
    modalFooter,
  }) => {
    return (
                   
                            <div className="modal-dialog modal-dialog-scrollable" role="document">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    {modalTitle}
                                    <button type="button" className="close rounded-pill" data-bs-dismiss="modal"
                                      aria-label="Close">
                                      <i data-feather="x">X</i>
                                     </button>
                                    </div>
                                    <div className="modal-body">
                                         {modalBody}
                                    </div>
                                    <div className="modal-footer">
                                          {modalFooter}
                                    </div>
                                </div>
                            </div>
                            
                       
     
    );
  }
  
  Modal.propTypes = {
    //labelText: PropTypes.string,
    //defaultSelectText: PropTypes.string,
    //arrayData: PropTypes.array.isRequired,
    // btnClass: PropTypes.string,
    // isLoading: PropTypes.bool,
    // btnColor: PropTypes.string.isRequired,
  };
