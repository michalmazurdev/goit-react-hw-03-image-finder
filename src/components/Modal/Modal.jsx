import css from './Modal.module.css';

export const Modal = ({ src, closeFunctionByClick, closeFunctionByESC }) => {
  return (
    <div
      className={css.overlay}
      onKeyDown={closeFunctionByESC}
      onClick={closeFunctionByClick}
      tabIndex={0}
    >
      <div className={css.modal}>
        <img src={src} alt="" />
      </div>
    </div>
  );
};
