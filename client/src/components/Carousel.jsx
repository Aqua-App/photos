import React from 'react';
import styled, {keyframes} from 'styled-components';
const {useEffect, useState} = React;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const CarouselCont = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: calc(100% - 200px);
`;

const Images = styled.div`
  position: relative;
  display: flex;
  width: 70%;
  height: 100%;
  margin: 0 100px;
  overflow: hidden;
`;
Images.displayName = 'Images';

const Image = styled.img`
  display: ${props => props.view ? 'inline' : 'none'};
  animation: ${fadeIn} 200ms linear;
  position: absolute;
  height: 100%;
  width 100%;
`;

const NavBtns = styled.button`
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgb(176, 176, 176);
  background-color: white;
  margin: 0 40px;
  font-weight: bold;
  font-size: 16px;
  outline: none;
  transition: transform 100ms linear;

  &:hover {
    background-color: rgb(240, 240, 240)
  }
  &:active {
    transform: scale(0.92);
    transform-origin: center;
  }
`;
NavBtns.displayName = 'NavBtns';

const Carousel = ({ photoList, photoNum, setPhotoNum}) => {
  function navigate(e) {
    if (e.target.value === 'right') {
      setPhotoNum(photoNum + 1);
    } else if (e.target.value === 'left') {
      setPhotoNum(photoNum - 1);
    }
  }

  return (
    <CarouselCont>
      <NavBtns
        value='left'
        onClick={navigate}
        visible={photoNum > 1}>
        {'<'}
      </NavBtns>
      <Images>
        {photoList.map((photo, i) => {
          return (
            <Image
              key={i}
              src={photo.url}
              alt={photo.description}
              view={i + 1 === photoNum}
            />)
        })}
      </Images>
      <NavBtns
        value='right' onClick={navigate}
        visible={photoNum < photoList.length}>
        {'>'}
      </NavBtns>
    </CarouselCont>
  )
};

export default Carousel;