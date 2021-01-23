import React from 'react';
import styled from 'styled-components';

const LinksCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  height: 30px;

  @media screen and (max-width: 500px) {
    justify-content: center;
  }
`;

const Link = styled.div`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin-left: 12px;
  text-decoration: underline;
  border-radius: 5px;
  &:hover {
    background-color: #eee;
  }
`;

const Location = styled(Link)`
  margin: 0;
  width: auto;
  color: rgb(113, 113, 113);
  &:hover {
    background-color: #fff;
  }
`;

const Links = ({ listing }) => {
  return (
    <LinksCont>
      <Location>{listing.location}</Location>
      <div>
        <Link>
          <ion-icon name="cloud-upload-outline"></ion-icon>
          <div style={{marginLeft:5}}>Share</div>
        </Link>
        <Link>
          <ion-icon name="heart-outline"></ion-icon>
          <div style={{marginLeft:5}}>Save</div>
        </Link>
      </div>
    </LinksCont>
  )
};

export default Links;