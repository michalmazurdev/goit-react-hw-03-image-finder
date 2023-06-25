import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import css from './App.module.css';
import { Component } from 'react';
import axios from 'axios';

async function getPictures(searchedPhrase, page) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '36302590-ce388341fd0bce6375bf0ebc2',
        q: encodeURIComponent(searchedPhrase.trim()),
        image_type: 'photo',
        safesearch: true,
        orientation: 'horizontal',
        per_page: 12,
        page: page,
      },
    });
    return response.data.hits;
  } catch (error) {
    console.error(error);
  }
}

class App extends Component {
  state = {
    pictures: [],
    page: 1,
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
    this.setState({ pictures: [], searchedPhrase: event.target[1].value });
  };

  loadMore = event => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    console.log(this.state);
    console.log(typeof this.loadMore);
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery>
          {this.state.pictures.map(picture => (
            <ImageGalleryItem url={picture.previewURL} />
          ))}
        </ImageGallery>
        {this.state.pictures.length !== 0 && <Button clicked={this.loadMore} />}
      </div>
    );
  }
}

export default App;
