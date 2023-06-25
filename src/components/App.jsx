import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
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
  };
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.searchedPhrase !== this.state.searchedPhrase) {
      try {
        this.setState({ isLoading: true });
        const pictures = await getPictures(
          this.state.searchedPhrase,
          this.state.page
        );
        this.setState({ pictures });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSearch = event => {
    event.preventDefault();
    this.setState({ searchedPhrase: event.target[1].value });
  };
  render() {
    console.log(this.state);
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery>
          {this.state.pictures.map(picture => (
            <ImageGalleryItem url={picture.previewURL} />
          ))}
        </ImageGallery>
      </div>
    );
  }
}
export default App;
