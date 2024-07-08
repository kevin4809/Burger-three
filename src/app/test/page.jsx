import React from 'react';

const page = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <iframe
        src='https://burger-three-7qmj.vercel.app/'
        title='Burger Three'
        style={{ height: '100%', width: '100%', border: 'none' }}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default page;
