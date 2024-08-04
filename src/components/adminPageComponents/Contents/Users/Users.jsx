import React, { useState } from "react";
import * as XLSX from "xlsx";
import './Users.css'
function Users() {
  const [content, setContent] = useState('default');
  const [moderators, setModerators] = useState([]);
  const [evaluators, setEvaluators] = useState([]);
  const [students, setStudents] = useState([]);
  const [activeComponent, setActiveComponent] = useState('');
  const [newUser, setNewUser] = useState({ name: '', surname: '', role: '', username: '' });
  const [popupMessage, setPopupMessage] = useState('');
  const [popupStyle, setPopupStyle] = useState(''); 
  const [showPopup, setShowPopup] = useState(false);

  const handleComponentClick = (component, type) => {
    setContent(component);
    setActiveComponent(type);
  };

  const handleImportExcel = (type) => {
    setContent(`importExcel${type}`);
  };

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      if (type === 'moderators') setModerators(jsonData);
      if (type === 'evaluators') setEvaluators(jsonData);
      if (type === 'students') setStudents(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    const { name, surname } = newUser;
    let userList = [];
  
    // Hangi listeyi kullanacağımızı belirleyin
    switch (content) {
      case 'addModerator':
        userList = moderators;
        break;
      case 'addEvaluator':
        userList = evaluators;
        break;
      case 'addStudent':
        userList = students;
        break;
      default:
        return;
    }
  
    // İsim ve soyadın boş olup olmadığını kontrol edin
    if (!name || !surname) {
      showPopupMessage('Kullanıcı adı veya Soyadı boş bırakılamaz', 'bg-red-500');
      return;
    }
  
    // Aynı isim ve soyadına sahip bir kullanıcı olup olmadığını kontrol edin
    if (userList.some(user => user.AD === name && user.SOYADI === surname)) {
      showPopupMessage('Bu isim soyisime ait kayıtlı kullanıcı bulunmaktadır', 'bg-red-500');
      return;
    }
  
    // Yeni kullanıcı verilerini oluşturun
    const newUserData = { 
      ROL: newUser.role, 
      AD: name, 
      SOYADI: surname, 
      'KULLANICI ADI': newUser.username, 
      ŞİFRE: '', 
      'HESAP DURUMU': '' 
    };
  
    // Kullanıcıyı ekleyin (listeyi güncelleyin)
    if (content === 'addModerator') {
      setModerators([...moderators, newUserData]);
    } else if (content === 'addEvaluator') {
      setEvaluators([...evaluators, newUserData]);
    } else if (content === 'addStudent') {
      setStudents([...students, newUserData]);
    }
  
    // Başarı mesajı gösterin
    showPopupMessage('Kullanıcı başarılı bir şekilde eklendi', 'bg-green-500');
  };
  

  const showPopupMessage = (message, style) => {
    setPopupMessage(message);
    setPopupStyle(style);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const renderContent = () => {
    const renderForm = (roleOptions = []) => (
      <div className="m-10">
        <p className="font-bold">Ad</p>
        <input type="text" name="name" className="border border-black" placeholder="Yazınız" onChange={handleInputChange} />
        <p className="font-bold">Soyad</p>
        <input type="text" name="surname" className="border border-black" placeholder="Yazınız" onChange={handleInputChange} />
        {roleOptions.length > 0 && (
          <>
            <p className="font-bold">Rol seçiniz</p>
            <select name="role" className="border border-black" onChange={handleInputChange}>
              {roleOptions.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
              ))}
            </select>
          </>
        )}
        <button type="submit" className="p-2 border border-black m-5" onClick={handleAddUser}>Ekle</button>
      </div>
    );

    const renderTable = (list) => {
      // Determine the column headers based on the content
      const isStudentTable = content === 'student' || content === 'addStudent';
    
      return (
        <table className="border border-black">
          <thead className="border border-black">
            <tr>
              {isStudentTable ? (
                <>
                  <th>ROL</th>
                  <th>Aday no</th>
                  <th>Ad</th>
                  <th>Soyad</th>
                  <th>Kullanıcı Adı</th>
                  <th>Şifre</th>
                  <th>İl</th>
                  <th>Sınav Merkezi</th>
                  <th>Hesap durumu</th>
                  <th>Düzenle</th>
                </>
              ) : (
                <>
                  <th>ROL</th>
                  <th>AD</th>
                  <th>SOYADI</th>
                  <th>KULLANICI ADI</th>
                  <th>ŞİFRE</th>
                  <th>HESAP DURUMU</th>
                  <th>DÜZENLE</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {list.map((user, index) => (
              <tr key={index}>
                {isStudentTable ? (
                  <>
                    <td>{user.ROL}</td>
                    <td>{user['Aday no']}</td>
                    <td>{user.AD}</td>
                    <td>{user.SOYADI}</td>
                    <td>{user['Kullanıcı Adı']}</td>
                    <td>{user.ŞİFRE}</td>
                    <td>{user.İL}</td>
                    <td>{user['Sınav Merkezi']}</td>
                    <td>{user['HESAP DURUMU']}</td>
                    <td><button>Düzenle</button></td>
                  </>
                ) : (
                  <>
                    <td>{user.ROL}</td>
                    <td>{user.AD}</td>
                    <td>{user.SOYADI}</td>
                    <td>{user['KULLANICI ADI']}</td>
                    <td>{user.ŞİFRE}</td>
                    <td>{user['HESAP DURUMU']}</td>
                    <td><button>Düzenle</button></td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      );
    };
    

    switch(content) {
      case 'moderator':
        return (
          <div>
            {moderators.length === 0 && <p>Sistemde ekli moderatör bulunmamaktadır.</p>}
            <div className="flex my-8 gap-x-2">
              <button className="border border-black py-4 px-8 rounded-lg" onClick={() => handleComponentClick('addModerator', 'moderator')}>Moderatör Ekle</button>
              <button className="border border-black py-4 px-12 rounded-lg" onClick={() => handleImportExcel('1')}>Excel Yükle</button>
            </div>
            {moderators.length > 0 && renderTable(moderators)}
          </div>
        );
      case 'addModerator':
        return renderForm();
      case 'importExcel1':
        return <div><h1>Excel Yükle</h1><input type="file" accept=".xlsx, .xls" onChange={(e) => handleFileUpload(e, 'moderators')} /></div>;
      case 'evaluator':
        return (
          <div>
            {evaluators.length === 0 && <p>Sistemde ekli değerlendirici bulunmamaktadır.</p>}
            <div className="flex my-8 gap-x-2">
              <button className="border border-black py-4 px-8 rounded-lg" onClick={() => handleComponentClick('addEvaluator', 'evaluator')}>Değerlendirici Ekle</button>
              <button className="border border-black py-4 px-12 rounded-lg" onClick={() => handleImportExcel('2')}>Excel Yükle</button>
            </div>
            {evaluators.length > 0 && renderTable(evaluators)}
          </div>
        );
      case 'addEvaluator':
        return renderForm([{ value: 'ust-degerlendirici', label: 'Üst Değerlendirici' }, { value: 'alt-degerlendirici', label: 'Alt Değerlendirici' }]);
      case 'importExcel2':
        return <div><h1>Excel Yükle 2</h1><input type="file" accept=".xlsx, .xls" onChange={(e) => handleFileUpload(e, 'evaluators')} /></div>;
      case 'student':
        return (
          <div>
            {students.length === 0 && <p>Sistemde ekli öğrenci bulunmamaktadır.</p>}
            <div className="flex my-8 gap-x-2">
              <button className="border border-black py-4 px-8 rounded-lg" onClick={() => handleComponentClick('addStudent', 'student')}>Öğrenci Ekle</button>
              <button className="border border-black py-4 px-12 rounded-lg" onClick={() => handleImportExcel('3')}>Excel Yükle</button>
            </div>
            {students.length > 0 && renderTable(students)}
          </div>
        );
      case 'addStudent':
        return (
          <div>
            <p className="font-bold">Ad</p>
            <input type="text" name="name" placeholder="Yazınız" className="border border-black" onChange={handleInputChange} />
            <p className="font-bold">Soyad</p>
            <input type="text" name="surname" placeholder="Yazınız" className="border border-black" onChange={handleInputChange} />
            <p className="font-bold">İl Seçiniz</p>
            <select name="role" className="border border-black" onChange={handleInputChange}>
              <option value="İstanbul">İstanbul</option>
              <option value="Ankara">Ankara</option>
            </select>
            <p className="font-bold">Sınav merkezi seçiniz</p>
            <select name="role" className="border border-black" onChange={handleInputChange}>
              <option value="A Blok">A Blok</option>
              <option value="B Blok">B Blok</option>
            </select>
            <button type="submit" className="border border-black px-2 m-2" onClick={handleAddUser}>KAYDET</button>
          </div>
        );
      case 'importExcel3':
        return <div><h1>Excel Yükle 3</h1><input type="file" accept=".xlsx, .xls" onChange={(e) => handleFileUpload(e, 'students')} /></div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex justify-between w-full px-20">
        <Button
          onClick={() => handleComponentClick('moderator', 'moderator')}
          isActive={activeComponent === 'moderator'}
        >
          MODERATÖR
        </Button>
        <Button
          onClick={() => handleComponentClick('evaluator', 'evaluator')}
          isActive={activeComponent === 'evaluator'}
        >
          DEĞERLENDİRİCİ
        </Button>
        <Button
          onClick={() => handleComponentClick('student', 'student')}
          isActive={activeComponent === 'student'}
        >
          ÖĞRENCİ
        </Button>
      </div>
      <div className="backgroundBox2_1">
        {renderContent()}
      </div>
      {showPopup && <div className={`popup ${popupStyle}`}>{popupMessage}</div>}
    </div>
  );
}

const Button = ({ onClick, isActive, children }) => (
  <button
    onClick={onClick}
    className={`p-2 m-2 rounded text-black ${isActive ? 'border border-black bg-white' : 'bg-custom-gray'}`}
  >
    {children}
  </button>
);

export default Users;
