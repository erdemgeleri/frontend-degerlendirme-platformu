// src/pages/loginPage/loginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

   
    if (username === 'yonetici' && password === 'yoneticiSif') {
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      navigate('/yonetici'); 
    } else if (username === 'moderator' && password === 'modSif') {
      localStorage.setItem('userRole', 'moderator');
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      navigate('/moderator');
    } else if (username === 'degerlendirici' && password === 'degerlendiriciSif') {
      localStorage.setItem('userRole', 'evaluator');
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      navigate('/degerlendirici'); 
    } else if (username === 'ogrenci' && password === 'ogrenciSif') {
      localStorage.setItem('userRole', 'student');
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      navigate('/ogrenci');
    } else if (username === 'ustdegerlendirici' && password === 'ustdegerlendiriciSif') {
      localStorage.setItem('userRole', 'topEvaluator');
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      navigate('/ustdegerlendirici'); 
    } else {
      setError('Kullanıcı adı veya şifre yanlış');
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
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button 
          onClick={handleLogin} 
          className="mt-10 bg-black text-white py-3 px-5 rounded-lg"
        >
          Giriş Yap
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
