import React, { useState } from 'react';
import LeftLayout from '../../components/adminPageComponents/genel_component/leftLayoutComponents/LeftLayoutt';
import TopL from '../../components/adminPageComponents/genel_component/Header/headerMessage/topLayoutComponents';
import Role from '../../components/adminPageComponents/genel_component/Header/name_surname_role/Role';
import Icon from '../../components/adminPageComponents/genel_component/Header/iconComponent/icon'; 
import HomePage from '../../components/adminPageComponents/Contents/homeComponent/HomePage';
import MyExams from '../../components/adminPageComponents/Contents/Exams/Exams';
import AnswerKeys from '../../components/adminPageComponents/Contents/AnswerKeys/AnswerKey';

function ReviewerPage() {
  const [activePage, setActivePage] = useState('home');
  const [showBox, setShowBox] = useState(true);
  const [showBox3, setShowBox3] = useState(false);
  const [showBox4, setShowBox4] = useState(false);

  const handleHomeButtonClick = () => {
    setActivePage('home');
    setShowBox(true); 
    setShowBox3(false);
    setShowBox4(false);
  };

  const handleExamsButtonClick = () => {
    setActivePage('exams');
    setShowBox(false);
    setShowBox3(true);
    setShowBox4(false);
  };

  const handleAnswersButtonClick = () => {
    setActivePage('answers');
    setShowBox(false);
    setShowBox3(false);
    setShowBox4(true);
  };

  const renderContent = () => {
    if (showBox) return <HomePage />;
    if (showBox3) return <MyExams />;
    if (showBox4) return <AnswerKeys />;
    return null;
  };

  return (
    <div className='flex overflow-hidden'>
      <div className='w-[400px]'>
        <LeftLayout 
          role='reviewer'
          activePage={activePage}
          onHomeButtonClick={handleHomeButtonClick}
          onExamsButtonClick={handleExamsButtonClick}
          onAnswersButtonClick={handleAnswersButtonClick}
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

export default ReviewerPage;
