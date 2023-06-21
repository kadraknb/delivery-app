import React from 'react';
import { useNavigate } from 'react-router-dom';
import BigButton from '../../../components/Common/BigButton';

function NotFound() {
  const nav = useNavigate();

  return (
    <div
      className="flex items justify-center h-screen w-screen"
    >
      <div className="flex items-center gap-7">
        <div className="text-right">
          <h1 className="text-8xl font-bold">404</h1>
          <h3 className="text-5xl font-light">Page not found</h3>
        </div>

        <hr className="w-[2px] h-16 p-[1px] bg-default_light_gray" />

        <div className="">
          <BigButton
            handleOnClick={ () => nav('/login') }
            content="Go back"
            button={ 1 }
          />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
