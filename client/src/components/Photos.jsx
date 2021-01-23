import React from 'react';
import styled from 'styled-components';
const { useState } = React;
import Modal from './Modal.jsx';

const PhotosCont = styled.div`
  position: relative;
  display: grid;
  column-gap: 8px;
  row-gap: 8px;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  grid-template-columns: 50% 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    border-radius: 0px;
    width: 100vw;
    margin: 0 auto;
  }
`;
PhotosCont.displayName = 'PhotosCont';

const ImgCont = styled.div`
  grid-area: ${props => props.location};
  justify-self: stretch;
  background-color: black;
  overflow: hidden;
  cursor: pointer;

  @media screen and (max-width: 500px) {
    grid-area: 1 / 1 / 2 / 2;
  }
`;
ImgCont.displayName = 'ImgCont';

const Image = styled.img`
  width: auto;
  height: 100%;
  transition: opacity 200ms linear;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.8;
  }
`;

const AllPhotosBtn = styled.button`
  position: absolute;
  right: 24px;
  bottom: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  line-height: 18px;
  font-weight: 600px;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid black;
  padding: 7px 15px;
  background-color: white;
  transition: transform 100ms linear;
  outline: none;

  &:hover {
    background-color: rgb(247, 247, 247);
  }

  &:active {
    transform-origin: center;
    transform: scale(0.96);
  }
`;
AllPhotosBtn.displayName = 'AllPhotosBtn';

var getGridLoc = (index) => {
  switch (index) {
    case 0: return '1 / 1 / 3 / 2';
    case 1: return '1 / 2 / 2 / 3';
    case 2: return '1 / 3 / 2 / 4';
    case 3: return '2 / 2 / 3 / 3';
    case 4: return '2 / 3 / 3 / 4';
  }
};


const Photos = ({ photoList }) => {
  const [modalView, setModalView] = useState(false);
  const [startPic, setStartPic] = useState(1);

  var toggle = (e) => {
    if (e.target.id) {
      setStartPic(Number(e.target.id) + 1);
    } else {
      setStartPic(1);
    }
    setModalView(!modalView);
  };

  return (
    <>
      <PhotosCont id='PhotosCont' onClick={toggle}>
        {photoList.slice(0, 5).map((photo, i) => {
          return (
            <ImgCont key={i} location={getGridLoc(i)}>
              <Image id={i} src={photo.url} alt={photo.description} />
            </ImgCont>
          )
        })}
        <AllPhotosBtn onClick={toggle}>
          <ion-icon name='apps'></ion-icon>
          <div style={{marginLeft: 8}}> Show All Photos </div>
        </AllPhotosBtn>
      </PhotosCont>
      <Modal
        photoList={photoList}
        view={modalView}
        toggle={toggle}
        startPic={startPic}/>
    </>
  )
};

export default Photos;