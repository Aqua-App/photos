import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './components/App.jsx';
import Links from './components/Links.jsx';
import Photos from './components/Photos.jsx';
import Modal from './components/Modal.jsx';
import Carousel from './components/Carousel.jsx';


describe('Links Component', () => {
  it('Links should have access to the listing object', () => {
    const wrapper = shallow(<Links listing={{location: 'Houston'}}/>);
    expect(wrapper.text()).toContain('Houston');
  });

  it('Links should have two icons', () => {
    const wrapper = shallow(<Links listing={{location: 'Houston'}}/>);
    expect(wrapper.find('ion-icon')).toHaveLength(2);
  });
});

var photoList = [
  {
    url: 'https://example1.com/',
    description: 'photo1',
  },
  {
    url: 'https://example2.com/',
    description: 'photo2',
  },
  {
    url: 'https://example3.com/',
    description: 'photo3',
  },
  {
    url: 'https://example4.com/',
    description: 'photo4',
  },
  {
    url: 'https://example5.com/',
    description: 'photo5',
  },
  {
    url: 'https://example6.com/',
    description: 'photo6',
  }
];

describe('Photos Component', () => {

  const wrapper = shallow(<Photos photoList = {photoList}/>);

  it('Photos contains first 5 images', () => {
    var ImageChildren = wrapper.find('PhotosCont').children().filter('ImgCont');
    expect(ImageChildren).toHaveLength(5);
  });

  it('AllPhotosBtn should toggle the view of the Modal', () => {
    expect(wrapper.find('Modal').prop('view')).toBe(false);
    wrapper.find('AllPhotosBtn').simulate('click', { target: {}});
    expect(wrapper.find('Modal').prop('view')).toBe(true);
    expect(wrapper.find('Modal').prop('startPic')).toBe(1);
    wrapper.find('AllPhotosBtn').simulate('click', { target: {}});
  });

  it('Clicking on a photo should toggle the view of the Modal with respective photo', () => {
    expect(wrapper.find('Modal').prop('view')).toBe(false);
    wrapper.find('PhotosCont').simulate('click', { target: { id: 4 } });
    expect(wrapper.find('Modal').prop('view')).toBe(true);
    expect(wrapper.find('Modal').prop('startPic')).toBe(5);
  });
});

describe('Carousel Component', () => {
  var carousel = shallow(<Carousel photoList={photoList} photoNum={1}/>);

  it('Should have photoList length "n" images', () => {
    var images = carousel.find('Images').children();
    expect(images).toHaveLength(photoList.length);
  });

  it('Should display the image that photoNum matches', () => {
    var firstImg = carousel.find('Images').children().at(0);
    expect(firstImg.prop('view')).toBe(true);
  });

  it('Should hide nav buttons when reaching end or start of carousel', () => {
    carousel = shallow(<Carousel photoList={photoList} photoNum={6} />);
    expect(carousel.find('NavBtns').at(1).prop('visible')).toBe(false);
  });
});

