import css from './Button.module.css';

export const Button = ({ clicked }) => {
  return (
    <button className={css.button} onClick={clicked}>
      LOAD MORE
    </button>
  );
};
