import React, { useState } from "react";
function Exam(){
    const[isDivVisible, setIsDivVisible] = useState(false);
    const handleAddExamClick = () =>{
        setIsDivVisible(true);
    }
    return(
         <div>
            <h3 className="font font-bold px-10 ">SINAVLAR</h3>
            <button className="border border-black font-bold px-3 py-2 mx-10 my-5 rounded-xl overflow-hidden" onClick={handleAddExamClick} >SINAV EKLE</button>
            {isDivVisible && (
                <div className="">
                    <h4 className="border-b border-black ">Yeni Sınav Ekle</h4>
                    <div className="border_t">SElam</div>
                    <div>
                        <div className="flex ">
                            <div className="flex font-bold mx-2">
                                <p >Sınav Adı:</p>
                                <input type="text" className="border border-black mx-2" placeholder="Yazınız"></input>
                            </div>
                            <div className="flex font-bold mx-2">
                                <p>Sınav Tarihi</p>
                                <input type="text" className="border border-black mx-2" placeholder="Yazınız"></input>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p className="font-bold">Soru Ekle</p>
                            <input className="border border-black py-10 px-96 rounded-3xl" placeholder="Yazınız"></input>
                        </div>
                        <div>
                            <p className="font-bold">Cevap Ekle</p>
                            <input className="border border-black py-10 px-96 rounded-3xl justify-center" placeholder="Yazınız"></input>
                        </div>
                        <button className="border border-black px-5 py-5 m-10">Cevap Anahtarı Eklemek İçin Tıklayınız</button>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Exam;