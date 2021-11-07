/* eslint-disable */
import React from "react";
import './Spin.scss';

const Spin = ({ children, loading }) => {
    return (
        <div className="jspin-nested-loading">
            {
                loading ? <div className="jspin jspin-spinning">
                    <div className="jspin-dot jspin-dot-spin fa-3x">
                        <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
                    </div>
                </div>
                    : null
            }
            <div className={`jspin-container ${loading ? 'jspin-blur' : ''}`}>
                {children}
            </div>
        </div>
    );
};

export default Spin;