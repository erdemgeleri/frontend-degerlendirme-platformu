import React, { useState } from 'react';

function LeftLayout({ role, onHomeButtonClick, onUserButtonClick, onExamsButtonClick, onAnswersButtonClick }) {
  const [activePage, setActivePage] = useState('home');

  const renderButton = (page, label, onClick) => (
    <button
      onClick={() => {
        setActivePage(page);
        onClick();
      }}
      className={`p-2 m-2 rounded text-black ${activePage === page ? 'border border-black bg-white' : 'custom-gray'}`}
    >
      {label}
    </button>
  );

  return (
    <div className='relative h-screen bg-custom-gray'>
      <p className='flex text-3xl justify-center p-5'>LOGO</p>
      <p className='flex text-3xl justify-center'>PLATFORM ADI</p>
      <div className="flex flex-col mt-20 gap-8">
        {renderButton('home', 'ANASAYFA', onHomeButtonClick)}
        {role === 'student' && renderButton('myExams', 'SINAVLARIM', onExamsButtonClick)}
        {role === 'admin' && renderButton('users', 'KULLANICILAR', onUserButtonClick)}

        {(role === 'admin' || role === 'moderator' || role === 'reviewer' || role === 'topReviewer') && 
          renderButton('exams', 'SINAVLAR', onExamsButtonClick)}
        {(role === 'admin' || role === 'moderator' || role === 'reviewer' || role === 'topReviewer') && 
          renderButton('answers', 'CEVAP ANAHTARLARI', onAnswersButtonClick)}
      </div>
      <button className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-400 text-black rounded p-2">
        ÇIKIŞ YAP
      </button>
    </div>
  );
}

export default LeftLayout;
