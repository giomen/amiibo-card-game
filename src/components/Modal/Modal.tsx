// @flow
import * as React from "react"
import { ModalProps } from "./model"
import "./Modal.scss"

const Modal = (props: ModalProps) =>
  !props.isOpen ? null : (
    <div className="Modal">
      <div className="Modal__wrapper">
        <div className="Modal__header">
          <div className="Modal__close" onClick={props.onClose}>Close</div>
        </div>
        <div className="Modal__content">
          {props.children}
        </div>
      </div>
    </div>
  )


export default Modal
