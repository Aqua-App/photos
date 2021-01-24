import React from 'react';
import styled, {keyframes} from 'styled-components';
const {useEffect, useState} = React;
import Carousel from './Carousel.jsx';
import PhotoGrid from './PhotoGrid.jsx';

const slideUpWithFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }

  to {
    opacity: 1;
    transform: none;
  }
`;

const ModalCont = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  max-height: 100%;
  background-color: white;
  animation: ${slideUpWithFade} 400ms linear;

  @media screen and (max-width: 550px) {
    height: auto;
  }
`;

const ModalNav = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 40px 20px 40px;

  @media screen and (max-width: 550px) {
    margin-top: 20px;
  }
`;

const CloseBtn = styled.button`
  display: flex;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  border-radius: 8px;
  outline: none;
  padding: 8px 16px;
  background-color: rgba(34, 34, 34, 0.1);
  color: rgb(34, 34, 34);
  border: none;
  transition: transform 100ms linear;

  &:hover {
    background-color: rgba(34, 34, 34, 0.16)
  }

  &:active {
    transform: scale(.96);
    transform-origin: center;
  }
`;

const Link = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 15px;
  font-size:18px;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  &:hover {
    background-color: #eee;
  }
`;

const Modal = ({ photoList, toggle, startPic}) => {
  const initialWidth = window.innerWidth > 500 ? 'big' : 'small';
  const [photoNum, setPhotoNum] = useState(1);
  const [screenWidth, setScreenWidth] = useState(initialWidth);
  const focus = React.createRef();

  function photosView() {
    if (screenWidth === 'big') {
      return <Carousel photoList={photoList} photoNum={photoNum} setPhotoNum={setPhotoNum}/>
    } else if (screenWidth === 'small') {
      return <PhotoGrid photoList={photoList}/>
    }
  }

  function screenWidthHandler() {
    var width = window.innerWidth
    if (width => 550 && width <= 600) {
      setScreenWidth('big');
    }
    if (width <= 500) {
      setScreenWidth('small');
    }
  }

  useEffect(() => {
    setPhotoNum(startPic);
    focus.current.focus();
    window.addEventListener('resize', screenWidthHandler);

    return function() {
      window.removeEventListener('resize', screenWidthHandler);
    }
  }, []);

  return (
    <ModalCont ref={focus}>
      <ModalNav>
        <CloseBtn onClick={toggle}>
          <ion-icon style={{fontSize:20}} name="close-outline"></ion-icon>
          <div style={{marginLeft:5}}>Close</div>
        </CloseBtn>
        { window.innerWidth > 500 &&
        <div id='photoNumNav'>{photoNum} / {photoList.length}</div> }
        <div>
          <Link>
            <ion-icon name="cloud-upload-outline"></ion-icon>
          </Link>
          <Link>
            <ion-icon name="heart-outline"></ion-icon>
          </Link>
        </div>
      </ModalNav>
      { photosView() }
    </ModalCont>
  )
};

export default Modal;