
import React from 'react';

const Message = () => {
  return (
    <div className="md:w-[25vw] w-full  max-w-[95%]   mx-auto p-6 bg-[#161D29] border-2 border-[#2C333F] rounded-xl md:mt-10 shadow-lg">
      <h1 className="text-white text-sm md:text-lg font-semibold mb-4 flex items-center gap-2">
        ⚡ Course Upload Tips
      </h1>
      <ul className="list-disc list-inside text-gray-300 space-y-2 text-base md:text-lg leading-relaxed">
        <li>Set the course price option or make it free.</li>
        <li>Standard size for the course thumbnail is 1024x576.</li>
        <li>Video section controls the course overview video.</li>
        <li>Course Builder is where you create & organize a course.</li>
        <li>Add topics in the Course Builder to create lessons, quizzes, and assignments.</li>
        <li>Use announcements to notify students of important updates.</li>
      </ul>
    </div>
  );
};

export default Message;
