import React from 'react';
import styled, {keyframes} from 'styled-components';

const PhotosCont = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 50% 50%;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  width: 100%;
`;

const BigImage = styled.img`
  grid-column: span 2;
  grid-row: span 2;
  width: 100%;
  height: auto;
`;

const SmallImage = styled.img`
  grid-column: span 1;
  grid-row: span 1;
  width: 100%;
  height: auto;
`;

const Grid = ({ photoList }) => {

  function generatePhotos() {
    return photoList.map((photo, i) => {
      if (i % 3 === 0 || i === 0) {
        return (
          <BigImage
            key={i}
            src={photo.url}
            alt={photo.description}
          />
        )
      } else {
        return (
          <SmallImage
            key={i}
            src={photo.url}
            alt={photo.description}
          />
        )
      }
    })
  }

  return (
    <PhotosCont>
      {generatePhotos()}
    </PhotosCont>
  )
};

export default Grid;