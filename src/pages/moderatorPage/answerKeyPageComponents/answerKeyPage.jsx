import React, { useState } from "react";

function Exam() {
  const [content, setContent] = useState('default');
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [buttonText, setButtonText] = useState('CEVAP ANAHTARI EKLE');

  const handleAddAnswerKeyClick = () => {
    setIsDivVisible(true);
    setButtonText('YENİ CEVAP ANAHTARI EKLE');
  };

  return (
    <div>
      <h3 className="font-bold px-10">SINAVLAR</h3>
      <button
        className="border border-black font-bold px-3 py-2 mx-10 my-5 rounded-xl"
        onClick={handleAddAnswerKeyClick}
      >
        {buttonText}
      </button>
      {isDivVisible && (
        <div className="border border-gray-400 p-5 mx-10 my-5 rounded-xl">
          <h4>Yeni Cevap Anahtarı</h4>
          <div>Selam</div>
        </div>
      )}
    </div>
  );
}
export default Exam;