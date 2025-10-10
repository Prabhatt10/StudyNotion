import React from 'react';

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {

  const isActive = currentCard === cardData.heading;

  return (
    <button
      onClick={() => setCurrentCard(cardData.heading)}
      className={`flex flex-col w-[360px] p-5 gap-1 transition-all duration-300 
        ${isActive 
          ? 'bg-white text-[#2C333F] shadow-[12px_12px_0px] shadow-[#FFD60A]' 
          : 'bg-[#2C333F] text-[#AFB2BF] hover:scale-[1.02]'}
      `}
    >
      <div className="flex flex-col text-center p-2 border-b-2 border-[#AFB2BF] border-dashed">
        <p className={`text-xl font-bold text-left mb-2 ${isActive ? 'text-black' : 'text-[#F1F2FF]'}`}>
          {cardData.heading}
        </p>
        <p className="text-left mb-6 text-base">{cardData.description}</p>
      </div>
      <div className="flex justify-between w-full p-3">
        <p>{cardData.level}</p>
        <p>{cardData.lessionNumber} Lessons</p>
      </div>
    </button>
  );
};

export default CourseCard;
