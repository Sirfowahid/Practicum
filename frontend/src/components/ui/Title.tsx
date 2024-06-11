import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Title = ({ children }: Props) => {
  return (
    <div className="relative flex items-center justify-center my-8">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3/4 border-t-2 border-gray-300"></div>
      </div>
      <h1 className="relative z-10 font-extrabold text-4xl md:text-5xl text-gray-800 bg-primary px-4">
        {children}
      </h1>
    </div>
  );
};

export default Title;
