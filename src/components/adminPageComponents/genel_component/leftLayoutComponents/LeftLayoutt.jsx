// src/pages/LeftLayout.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../../../Popup';
function LeftLayout({ role, onHomeButtonClick, onUserButtonClick, onExamsButtonClick, onAnswersButtonClick }) {
  const [activePage, setActivePage] = useState('home');
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState(''); // 'success' veya 'error' tipi
  const navigate = useNavigate(); // Kullanıcıyı yönlendirmek için kullanılır

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

  const handleLogout = () => {
    setPopupMessage('Çıkış yapılıyor...');
    setPopupType('error'); // Kırmızı arka plan için 'error' tipi

    // 2 saniye bekleyip çıkış yapma işlemini gerçekleştir
    setTimeout(() => {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      navigate('/'); // Login sayfasına yönlendirme
    }, 2000); // 2 saniye sonra yönlendirme
  };

  const handlePopupClose = () => {
    setPopupMessage('');
    setPopupType('');
  };

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
      <button 
        onClick={handleLogout} 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-400 text-black rounded p-2"
      >
        ÇIKIŞ YAP
      </button>
      <Popup message={popupMessage} type={popupType} onClose={handlePopupClose} />
    </div>
  );
}

export default LeftLayout;
