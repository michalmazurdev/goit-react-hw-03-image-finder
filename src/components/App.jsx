import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import css from './App.module.css';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import { getPictures } from './services/api.js';

class App extends Component {
  state = {
    pictures: [],
    searchedPhrase: '',
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchedPhrase !== this.state.searchedPhrase ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ isLoading: true });

        const pictures = await getPictures(
          this.state.searchedPhrase,
          this.state.page
        );

        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...pictures],
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSearch = event => {
    event.preventDefault();
    this.setState({
      pictures: [],
      page: 1,
      searchedPhrase: event.target[1].value,
    });
  };

  loadMore = event => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    console.log(this.state);
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery>
          {this.state.pictures.map(picture => (
            <ImageGalleryItem key={nanoid()} url={picture.webformatURL} />
          ))}
        </ImageGallery>
        {this.state.pictures.length !== 0 && <Button clicked={this.loadMore} />}
        {this.state.isLoading && <Loader />}
      </div>
    );
  }
}

export default App;
