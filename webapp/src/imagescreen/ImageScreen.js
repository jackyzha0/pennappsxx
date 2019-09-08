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
    }
  }

  componentDidMount() {
    this.fetchImages();
    this.interval = setInterval(() => {
      this.fetchImages();
    }, 5000);
  }

  fetchImages() {
    // axios.get(`some_url_where_the_endpoint_is`)
    //   .then(res => {
    //     this.setState({ images: res.data });
    //   })
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  mockList = () => {
    var images = [];
    // for(var i=0;i<20;i++) {
    //   const image = {
    //     src: require('./test2.JPG'),
    //     width: 1,
    //     height: 1
    //   };
    //   images.push(image);
    // }
    return images;
  }

  render() {
    const images = this.mockList();
    return (
      <div className="page-container">
        <div style={styles.statusBar}>
          <p>progress details about the mission go here</p>
        </div>
        <div className="gallery">
          <Gallery photos={images} targetRowHeight={300}/>
        </div>
      </div>
    )
  }
}
