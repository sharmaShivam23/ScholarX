import React from 'react';

const Loading = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-50">
      <div className="w-16 h-16 border-8 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
