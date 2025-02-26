import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const navLinkStyles =
    'flex items-center gap-3 rounded-l  border-gray-300 px-3 py-2 ';

  return (
    <div className="w-[18%] min-h-screen border-r-2 border-gray-300">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          className={({ isActive }) =>
            `${navLinkStyles} ${isActive ? 'active font-semibold' : ''}`
          }
          to="/add"
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="Add items icon" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${navLinkStyles} ${isActive ? 'active font-semibold' : ''}`
          }
          to="/list"
        >
          <img
            className="w-5 h-5"
            src={assets.order_icon}
            alt="List items icon"
          />
          <p className="hidden md:block">List Items</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${navLinkStyles} ${isActive ? 'active font-semibold' : ''}`
          }
          to="/orders"
        >
          <img
            className="w-5 h-5"
            src={assets.order_icon}
            alt="Order items icon"
          />
          <p className="hidden md:block">Order Items</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
