import React, { useState } from 'react';
import LeftLayout from '../../../components/adminPageComponents/genel_component/leftLayoutComponents/LeftLayoutt';
import TopL from '../../../components/adminPageComponents/genel_component/Header/headerMessage/topLayoutComponents';
import Role from '../../../components/adminPageComponents/genel_component/Header/name_surname_role/Role';
import Icon from '../../../components/adminPageComponents/genel_component/Header/iconComponent/icon';
import MyExams from '../../../components/adminPageComponents/Contents/Exams/Exams';
import Exam from '../examsPageComponents/examsPage';

function ModeratorPage() {
  const [activePage, setActivePage] = useState('ModeratorPage');

  const handleHomeButtonClick = () => {
    setActivePage('ModeratorPage');
  };

  const handleExamsButtonClick = () => {
    setActivePage('Exam');
  };

  const handleAnswerKeyButtonClick = () => {
    setActivePage('AnswerKeys');
  };

  const renderContent = () => {
    switch(activePage) {
      case 'Exam':
        return <Exam />;
      case 'AnswerKeyMod':
        return <AnswerKeyMod />;
      default:
        return <div>
          
        </div>;
    }
  };

  return (
    <div className='flex overflow-hidden'>
      <div className='w-[400px]'>
        <LeftLayout 
          role='moderator'
          activePage={activePage} 
          onHomeButtonClick={handleHomeButtonClick} 
          onExamsButtonClick={handleExamsButtonClick} 
          onAnswersButtonClick={handleAnswerKeyButtonClick}
        />
      </div>
      <div className='flex flex-col w-full'>
        <div className='flex justify-between w-full h-[110px]'>
          <div>
            <TopL activePage={activePage}/>
          </div>
          <div className='flex items-center content-center'>
            <Role/>
            <Icon/>
          </div>
        </div>
        <div>
          {renderContent()} 
        </div>
      </div>
    </div>
  );
}

export default ModeratorPage;
