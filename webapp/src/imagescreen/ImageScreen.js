import React, { Component } from 'react';
import axios from 'axios';
import Gallery from "react-photo-gallery";
import './index.css'

const styles = {
  statusBar: {
    height: '4rem',
    width: '100%',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
  }
};

export default class ImageScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: []
    };
    this.fetchImages = this.fetchImages.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    this.fetchImages();
    this.interval = setInterval(() => {
      // console.log('images is ', this.state.images);
      this.fetchImages();
    }, 5000);
  }

  fetchImages() {
    var pics = [];
    axios.get('https://www.googleapis.com/storage/v1/b/pennappsxx-drone-unprocessed/o?prefix=processed')
      .then(res => {
        for (var i in res.data.items) {
          const name = res.data.items[i].name.replace(/\//g, "%2F");
          const url = 'https://www.googleapis.com/storage/v1/b/pennappsxx-drone-unprocessed/o/' + name + '?alt=media';
          console.log(url);
          axios.get(url)
            .then(res => {
              pics.push(res);
            });
        }
      })
      .then(() => {this.setState({ images: pics })})
      .catch(err => console.log(err));
    // this.setState({ images: pics });
  }

  render() {
    return (
      <div className="page-container">
        <div style={styles.statusBar}>
          <p>progress details about the mission go here</p>
        </div>
        <div className="gallery">
          <Gallery photos={this.state.images} targetRowHeight={100}/>
        </div>
      </div>
    )
  }
}
