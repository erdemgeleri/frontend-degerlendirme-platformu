// src/pages/loginPage/loginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../../components/Popup';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState(''); // 'success' or 'error'
  const [redirectAfterPopup, setRedirectAfterPopup] = useState(null); // Store redirect information
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    let newRedirectAfterPopup = null;
    if (username === 'yonetici' && password === 'yoneticiSif') {
      setPopupMessage('Kullanıcı Girişi başarılı.');
      setPopupType('success');
      newRedirectAfterPopup = '/yonetici';
    } else if (username === 'moderator' && password === 'modSif') {
      setPopupMessage('Kullanıcı Girişi başarılı.');
      setPopupType('success');
      newRedirectAfterPopup = '/moderator';
    } else if (username === 'degerlendirici' && password === 'degerlendiriciSif') {
      setPopupMessage('Kullanıcı Girişi başarılı.');
      setPopupType('success');
      newRedirectAfterPopup = '/degerlendirici';
    } else if (username === 'ogrenci' && password === 'ogrenciSif') {
      setPopupMessage('Kullanıcı Girişi başarılı.');
      setPopupType('success');
      newRedirectAfterPopup = '/ogrenci';
    } else if (username === 'ustdegerlendirici' && password === 'ustdegerlendiriciSif') {
      setPopupMessage('Kullanıcı Girişi başarılı.');
      setPopupType('success');
      newRedirectAfterPopup = '/ustdegerlendirici';
    } else {
      setPopupMessage('Kullanıcı adı veya şifre yanlış');
      setPopupType('error');
    }

    if (newRedirectAfterPopup) {
      setRedirectAfterPopup(newRedirectAfterPopup);
    }
  };

  const handlePopupClose = () => {
    setPopupMessage('');
    setPopupType('');
    if (redirectAfterPopup) {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      navigate(redirectAfterPopup);
      setRedirectAfterPopup(null); // Reset redirect info
    }
  };

  return (
    <div className="flex">
      <div className="flex w-1/2 h-screen bg-gray-500"></div>
      <div className="flex flex-col w-1/2 h-screen bg-gray-100 flex items-center justify-center">
        <h3 className="text-lg font-bold rounded-lg">Kullanıcı Adı</h3>
        <input 
          type="text" 
          className="border-black border-2 px-4 py-2 rounded-2xl"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Kullanıcı Adı"
        />
        <h3 className="text-lg font-bold rounded-lg mt-4">Şifre</h3>
        <input 
          type={show ? "text" : "password"} 
          className="border-black border-2 px-4 py-2 rounded-2xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifre"
        />
        <button 
          onClick={() => setShow(!show)} 
          className="mt-2 px-4 py-2 text-blue-500"
        >
          {show ? 'Gizle' : 'Göster'}
        </button>
        <button 
          onClick={handleLogin} 
          className="mt-10 bg-black text-white py-3 px-5 rounded-lg"
        >
          Giriş Yap
        </button>
      </div>
      <Popup message={popupMessage} type={popupType} onClose={handlePopupClose} />
    </div>
  );
}

export default LoginPage;
