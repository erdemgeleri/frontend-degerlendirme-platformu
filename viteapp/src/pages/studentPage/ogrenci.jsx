import React, { useState } from 'react';
import LeftLayout from '../../components/adminPageComponents/genel_component/leftLayoutComponents/LeftLayoutt';
import TopL from '../../components/adminPageComponents/genel_component/Header/headerMessage/topLayoutComponents';
import Role from '../../components/adminPageComponents/genel_component/Header/name_surname_role/Role';
import Icon from '../../components/adminPageComponents/genel_component/Header/iconComponent/icon'; 
import HomePage from '../../components/adminPageComponents/Contents/homeComponent/HomePage';
import MyExams from '../../components/adminPageComponents/Contents/Exams/Exams';

function StudentPage() {
  const [activePage, setActivePage] = useState('home');
  const [showBox, setShowBox] = useState(true);
  const [showBox2, setShowBox2] = useState(false);

  const handleHomeButtonClick = () => {
    setActivePage('home');
    setShowBox(true); 
    setShowBox2(false);
  };

  const handleMyExamsButtonClick = () => {
    setActivePage('myExams');
    setShowBox(false);
    setShowBox2(true);
  };

  const renderContent = () => {
    if (showBox) return <HomePage />;
    if (showBox2) return <MyExams />;
    return null;
  };

  return (
    <div className='flex overflow-hidden'>
      <div className='w-[400px]'>
        <LeftLayout 
          role='student'
          activePage={activePage}
          onHomeButtonClick={handleHomeButtonClick}
          onExamsButtonClick={handleMyExamsButtonClick}
        />
      </div>
      <div className='flex flex-col w-full '>
        <div className='flex justify-between w-full h-[110px] '> 
          <div>
            <TopL activePage={activePage}/>
          </div>
          <div className='flex item-center content-center m-5'>
            <Role/>
            <Icon/>
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}

export default StudentPage;
