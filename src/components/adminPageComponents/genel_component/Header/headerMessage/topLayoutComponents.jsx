import React from 'react';

function TopL({ activePage }) {
  let message;
  switch (activePage) {
    case 'home':
      message = 'KARŞILAMA MESAJI';
      break;
    case 'users':
      message = 'KULLANICILAR';
      break;
    case 'exams':
      message = 'SINAVLAR';
      break;
    case 'answers':
      message = 'CEVAP ANAHTARLARI';
      break;
    default:
      message = 'KARŞILAMA MESAJI';
  }

  return (
    <div className='p-10'>
      <div className='font-bold'>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default TopL;
