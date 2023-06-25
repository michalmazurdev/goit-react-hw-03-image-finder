import css from './Searchbar.module.css';

export const Searchbar = () => (
  <header className={css.searchbar}>
    <form className={css.SearchForm}>
      <button type="submit" className={css.button}>
        <span className={css.buttonLabel}></span>
      </button>

      <input
        className={css.input}
        type="text"
        autocomplete="off"
        autofocus
        placeholder="Search images and photos"
      />
    </form>
  </header>
);
