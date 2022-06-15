import { IoMdCart } from "react-icons/io";
import { AiOutlineUser, AiOutlineUserAdd, AiOutlineMail } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { BsCart, BsFolder2 } from "react-icons/bs";
import { MdOutlineRemoveShoppingCart } from "react-icons/md"
import React, { useEffect } from "react";
import Link from "next/link";

// Internal Imports
import Icon from "../Icon";
import LoginComponent from "../LoginComponent";
import RegistrationTabs from "../registrationComponents/RegistrationTabs";

import { openLogin, openRegister } from "../../features/uiSlice";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { logoutUser, getUserInfo, getOwnUser } from '../../features/userSlice';
import { getCartContent, productStatus, CartData } from '../../features/shoppingSlice';
import { UserContext } from "../../users/providers";
import { REQUEST_STATUS, USER_ROLE } from "../../constants/enums";




export default function Navbar() {

  const dispatch = useAppDispatch();

  const openRegisterForm = () => {
    dispatch(openRegister());
  };

  const openLoginForm = () => {
    dispatch(openLogin());
  };

  const CartStatus = useAppSelector(productStatus);
  const cartData = useAppSelector(CartData);

  const [user, setUser] = React.useContext(UserContext)

  useEffect(() => {
    (async () => {
      let loggedInUserInfo: any = await dispatch(getUserInfo());
      if (loggedInUserInfo.payload) {
        setUser({ role: loggedInUserInfo.payload.type });
        if (loggedInUserInfo.payload.type != USER_ROLE.ANONYMOUS.toLowerCase())
          await dispatch(getCartContent());
      }
    })();
  }, []);

  return (
    <div className="flex flex-row justify-around p-6 items-center bg-white">
      <div>
        <Link href={"/"} passHref>
          <button
            disabled={false}
            type="button"
            className="text-center text-sm w-24 h-6 "
          >
            <IoMdCart color="orange" size={30} />
          </button>
        </Link>
      </div>
      <div className="flex">
        <input
          className="bg-gray-100 w-72 py-1 px-2 text-sm border border-blue-600 outline-0"
          placeholder="What are you looking for....."
          type="search"
        />
        <button className="bg-blue-600 px-4 text-sm py-1 text-white hover:bg-blue-500">
          Search
        </button>
      </div>
      <div>
        <div className="flex space-x-4 mr-6 ">
          {user.role != USER_ROLE.ANONYMOUS.toLowerCase() ? 
            <div className="flex space-x-4 flex-col-4">
              <Link href={"/"} passHref>
                <div className="hover:text-blue-600">
                  <button
                    disabled={false}
                    type="button"
                    className="text-center text-sm w-24 h-6 "
                  >
                    <a className="flex flex-col items-center cursor-pointer">
                      <span>{<BsFolder2 size={18} />}</span>
                      <p className="text-sm">MyData</p>
                    </a>
                  </button>
                </div>
              </Link>
              {cartData != null ?
                <Link href={"/"} passHref>
                  <div className="hover:text-blue-600">
                    <button
                      disabled={false}
                      type="button"
                      className="text-center text-sm w-24 h-6 "
                    >
                      <a className="flex flex-col items-center cursor-pointer">
                        <span>{<BsCart size={18} />}</span>
                        <p className="text-sm">CartStatus</p>
                      </a>
                    </button>
                  </div>
                </Link>
                :
                <div className="hover:text-blue-600" >
                  <button
                    disabled={true}
                    type="button"
                    className="text-center text-sm w-24 h-6 "
                  >
                    <a className="flex flex-col items-center cursor-pointer" style={{ backgroundColor: 'lightgrey' }}>
                      <span>{<MdOutlineRemoveShoppingCart size={18} />}</span>
                      <p className="text-sm">CartStatus</p>
                    </a>
                  </button>
                </div>
              }
              <Link href={"/profile"} passHref>
                <div className="hover:text-blue-600">
                  <button
                    disabled={false}
                    type="button"
                    className="text-center text-sm w-24 h-6 "
                  >
                    <a className="flex flex-col items-center cursor-pointer">
                      <span>{<BiUserCircle size={18} />}</span>
                      <p className="text-sm">Mine</p>
                    </a>
                  </button>
                </div>
              </Link>
            </div>
            :
            <div className="flex space-x-4 flex-col-4">
              <Icon
                disable={false}
                component={<LoginComponent />}
                icon={<AiOutlineUser size={18} />}
                title="Login"
              />

              <Icon
                disable={false}
                component={<RegistrationTabs />}
                icon={<AiOutlineUserAdd size={18} />}
                title="Register"
              />
            </div>
          }
        </div>
      </div>
    </div>
  );
}
