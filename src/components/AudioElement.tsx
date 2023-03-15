import React from 'react';

type Props = {
  name: string;
  src: string;
};

export const AudioElement = ({ name, src }: Props) => {
  
  return (
    <div className='flex flex-col justify-center items-center space-y-4 bg-white h-screen snap-center text-stone-800 '>
      <div className='text-3xl'>{name}</div>
      <audio src={src} controls></audio>
    </div>
  );
};
