import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render() {
    return(
      <section className= 'library'>
        {
          this.state.albums.map( (album, index) =>
            <Link to={`/album/${album.slug}`} key={index}>
              <img className="imagess" src={album.albumCover} alt={album.title} />
              <div className= "albumText">{album.title}</div>
              <div className= "albumText">{album.artist}</div>
              <div className= "albumText">{album.songs.length} songs</div>
              <br />
            </Link>
          )
        }
      </section>
    );
  }
}

export default Library;
