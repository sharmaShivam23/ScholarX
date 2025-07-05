import React from 'react';

const FirstPage = ({ name, des }) => {
  return (
    <div className='h-auto flex flex-col md:flex-row text-[20px] text-[#999DAA] bg-[#161D29] w-full items-start gap-5 md:p-20 p-5'>

      {/* Left Side */}
      <div className="one w-full md:w-8/12 text-start flex flex-col gap-5">
        <div className="head text-lg text-[#868E96]">
          Home / Catalog / <span className='text-yellow-400'>{name?.name}</span>
        </div>

        <h1 className='text-3xl md:text-4xl text-white font-semibold'>{name?.name}</h1>

        <div className="j text-lg  md:w-[90%] text-[#CBD5E1] leading-relaxed">
          {des
            ? des?.des
            : "Python is a general-purpose, versatile, and powerful programming language. It’s a great first language because Python code is concise and easy to read. Whatever you want to do, Python can do it. From web development to machine learning to data science, Python is the language for you."
          }
        </div>
      </div>

      {/* Right Side */}
      <div className="two w-full md:w-4/12 mt-10 md:mt-0">
        <h1 className='text-2xl md:text-3xl text-white font-semibold mb-4'>Related Resources</h1>
        <ul className='flex flex-col gap-3 text-lg list-disc list-inside'>
          <li>Doc Python</li>
          <li>Cheat Sheets</li>
          <li>Articles</li>
          <li>Community</li>
          <li>Projects</li>
        </ul>
      </div>

    </div>
  );
};

export default FirstPage;
