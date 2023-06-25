import css from './Modal.module.css';

export const Modal = ({ src }) => {
  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <img src={src} alt="" />
      </div>
    </div>
  );
};
