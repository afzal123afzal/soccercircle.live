import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import IMG1 from '../../../assets/players1.jpeg'
import IMG2 from '../../../assets/blasters.jpeg'

function Cards() {
  return (
    <div className='cards'>
      <h1 style={{color:'#252e48'}} >Welcome to Soccer Circle !!!!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src={IMG1}
              // src='https://cdn4.vectorstock.com/i/1000x1000/72/78/football-club-text-logo-image-vector-20387278.jpg'
              text='Access exclusive content and connect with clubs in your local area through our secure and user-friendly player login portal.'
              label='PLAYER LOGIN'
              path='/player/login'
            />
            <CardItem
              src={IMG2}
              text='Unearth the best local talent for your team by connecting with promising players through our secure and exclusive club login portal.'
              label='CLUB LOGIN'
              path='/club/login'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
