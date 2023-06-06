import React from 'react';

function Footer() {
  return (
    <div
      className="h-full w-full fixed top-[92%]
    bg-default_black flex justify-center px-16"
    >
      <span className="text-default_white pt-[1.5%] font-extralight">
        © 2023
        {' '}
        OnDelivery, Inc. All rights reserved.
      </span>
    </div>
  );
}

export default Footer;
