import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ url }) => {
  return (
    <li className={css.galleryItem}>
      <img className={css.image} src={url} alt="" />
    </li>
  );
};
