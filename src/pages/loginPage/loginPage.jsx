import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../../components/Popup';
import aImage from './a.jpg';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('');
  const [redirectAfterPopup, setRedirectAfterPopup] = useState(null);
  console.log('renders')
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    let newRedirectAfterPopup = null;
    if (username === 'yonetici' && password === 'yoneticiSif') {
      setPopupMessage('Kullanıcı Girişi başarılı.');
      setPopupType('success');
      newRedirectAfterPopup = '/yonetici';
      localStorage.setItem('userRole', 'admin');
    } else if (username === 'moderator' && password === 'modSif') {
      setPopupMessage('Kullanıcı Girişi başarılı.');
      setPopupType('success');
      newRedirectAfterPopup = '/moderator';
      localStorage.setItem('userRole', 'moderator');
    } else if (username === 'degerlendirici' && password === 'degerlendiriciSif') {
      setPopupMessage('Kullanıcı Girişi başarılı.');
      setPopupType('success');
      newRedirectAfterPopup = '/degerlendirici';
      localStorage.setItem('userRole', 'evaluator');
    } else if (username === 'ogrenci' && password === 'ogrenciSif') {
      setPopupMessage('Kullanıcı Girişi başarılı.');
      setPopupType('success');
      newRedirectAfterPopup = '/ogrenci';
      localStorage.setItem('userRole', 'student');
    } else if (username === 'ustdegerlendirici' && password === 'ustdegerlendiriciSif') {
      setPopupMessage('Kullanıcı Girişi başarılı.');
      setPopupType('success');
      newRedirectAfterPopup = '/ustdegerlendirici';
      localStorage.setItem('userRole', 'topEvaluator');
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
      setRedirectAfterPopup(null);
    }
  };

  return (
    <div className="flex overflow-hidden h-screen">
      {/* Resim ve Üzerindeki Yazı */}
      <div className='relative flex items-center justify-center w-full md:w-1/2 h-full'>
        <img
          src={aImage}
          alt="Description of the image"
          className="absolute inset-0 w-full h-full object-cover scale-100 transition-transform duration-300 ease-in-out"
        />
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 mt-10 text-center">
          <p className='mx-10 text-customBluee text-7xl'>YEĞİTEK</p>
          <p className='text-customBluee text-base'>MEB Yenilik ve Eğitim Teknolojileri Genel Müdürlüğü</p>
        </div>
      </div>


      {/* Giriş Formu */}
      <div className="flex flex-col w-1/2 h-full items-center justify-center px-8">
        <div className="w-full max-w-sm">
          <label htmlFor="username" className="block text-lg font-bold mb-1 text-customBluee">Kullanıcı Adı</label>
          <input
            id="username"
            type="text"
            className="border-customBluee border-2 px-2 py-2 rounded-lg w-3/4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Kullanıcı Adı"
          />
          <label htmlFor="password" className="block text-lg font-bold mt-4 mb-1 text-customBluee">Şifre</label>
          <div className="relative">
            <input
              id="password"
              type={show ? "text" : "password"}
              className="border-customBluee border-2 px-2 py-2 rounded-lg pr-12 w-3/4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifre"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute inset-y-0 right-24 pr-2 flex items-center"
            >
              <svg
                width="22"
                height="16"
                viewBox="0 0 22 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 8C14 8.79565 13.6839 9.55871 13.1213 10.1213C12.5587 10.6839 11.7956 11 11 11C10.2044 11 9.44129 10.6839 8.87868 10.1213C8.31607 9.55871 8 8.79565 8 8C8 7.20435 8.31607 6.44129 8.87868 5.87868C9.44129 5.31607 10.2044 5 11 5C11.7956 5 12.5587 5.31607 13.1213 5.87868C13.6839 6.44129 14 7.20435 14 8Z"
                  stroke="#112D4E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8C2.6 3.903 6.336 1 11 1C15.664 1 19.4 3.903 21 8C19.4 12.097 15.664 15 11 15C6.336 15 2.6 12.097 1 8Z"
                  stroke="#112D4E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>



          <button
            onClick={handleLogin}
            className="mt-5 bg-giris-yap text-white py-2 rounded-lg w-3/4"
          >
            Giriş Yap
          </button>
        </div>
      </div>

      {/* Popup */}
      <Popup message={popupMessage} type={popupType} onClose={handlePopupClose} />
    </div>
  );
}

export default LoginPage;
