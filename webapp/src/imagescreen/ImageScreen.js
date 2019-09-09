import React, { Component } from 'react';
import axios from 'axios';
import Gallery from "react-photo-gallery";
import './index.css'
import { Button, Header, Image, Modal } from 'semantic-ui-react'


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
      images: [],
      isOpen: false,
      modalImg: ''
    };
    this.fetchImages = this.fetchImages.bind(this);
    this.handleImgClick = this.handleImgClick.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    this.fetchImages();
    this.interval = setInterval(() => {
      this.fetchImages();
    }, 5000);
  }

  handleImgClick(e, obj) {
    // console.log(obj.photo.src);
    this.setState({ isOpen: true, modalImg: obj.photo.src });
  }

  handleModalOpen(e) {
    this.setState({ isOpen: true, modalImg: '' });
  }

  handleModalClose(e) {
    this.setState({ isOpen: false, modalImg: ''});
  }

  async fetchImages() {
    const URL = 'https://www.googleapis.com/storage/v1/b/pennappsxx-drone-unprocessed/o?prefix=processed';
    let response = await fetch(URL, { method: 'GET' });
    let data = await response.json();

    const names = data.items.map(item => {
      return item.name.replace(/\//g, "%2F");
    });

    const urls = names.map(name => {
      return 'https://www.googleapis.com/storage/v1/b/pennappsxx-drone-unprocessed/o/' + name + '?alt=media';
    });

    const promises = urls.map(url => {
      return fetch(url, { method: 'GET' });
    });

    Promise.all(promises)
      .then(res => {
        console.log(res);
        this.setState({ images: res })
      })
      .catch(err => console.log('error', err))
  }

  render() {
    const urls = this.state.images.map(img => img.url);
    const json_file = urls.filter(url => {return url.indexOf('.json') > -1});
    const filtered_img = urls.filter(url => {return url.indexOf('.json') === -1});
    const new_urls = filtered_img.map(url => {
      return {
        src: url,
        width: 1,
        height: 1
      }
    });
    console.log("JSON IS ", json_file);

    return (
      <div className="page-container">
        <div className="gallery">
          <Gallery photos={new_urls} targetRowHeight={150} onClick={this.handleImgClick}/>

          <Modal dimmer={true} open={this.state.isOpen} onClose={this.handleModalClose}>
            <Modal.Header>Snapshot</Modal.Header>
            <Modal.Content image>
              <Image
                wrapped
                size='large'
                src={this.state.modalImg}
              />
              <Modal.Description>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button color='black' onClick={this.handleModalClose}>
                Close
              </Button>
              <Button
                positive
                icon='checkmark'
                labelPosition='right'
                content="Save"
                onClick={this.handleModalClose}
              />
            </Modal.Actions>
          </Modal>
        </div>
      </div>
    )
  }
}
