// @flow
import * as React from "react"
import ReactDom from 'react-dom';
import { ModalProps } from "./model"
import "./Modal.scss"

const Modal = ReactDom.createPortal(props: ModalProps, { children }) =>
  !props.isOpen ? null : (
    <div className="Modal">
      <div className="Modal__wrapper">
        <div className="Modal__header">
          {props.title}
          <div className="Modal__close" onClick={props.onClose}>Close</div>
        </div>
        <div className="Modal__content">
          {children}
        </div>
        <div className="Modal__footer"></div>
      </div>
    </div>
  )


export default Modal
