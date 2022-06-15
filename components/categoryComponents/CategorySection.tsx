import React, { useEffect } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { BsChevronRight } from "react-icons/bs";
import Link from "next/link";
import Avatar from 'react-avatar';

// Internal Imports
import CategoryCard from "./CategoryCard";
import CategorySectionButton from "./CategorySectionButton";
import CategorySlideShow from "./CategorySlideShow";

import { UserContext } from "../../users/providers";
import { logoutUser, getUserInfo } from '../../features/userSlice';
import { useAppDispatch } from "../../features/hooks";
import { USER_ROLE } from "../../constants/enums";


function CategorySection() {

  const dispatch = useAppDispatch();

  // Deprecated
  const [user, setUser] = React.useContext(UserContext)

  let userImage = '';

  const dispatchForSetUser = async () => {
    let loggedInUserInfo: any = await dispatch(getUserInfo());
    if (!loggedInUserInfo.payload) return;
    let role = loggedInUserInfo.payload.type
    setUser({ role: role });
  }

  useEffect(() => { dispatchForSetUser() }, []);


  return (
    <div className="grid grid-cols-4 gap-4 bg-white h-80 ">
      <PopularDataSection />
      <div className="bg-gray-200 col-span-2 ">
        <CategorySlideShow />
      </div>
      <div className="bg-gray-100 flex flex-col items-center justify-center">
        {
          user.role == USER_ROLE.ANONYMOUS.toLocaleLowerCase()
            ? <LoggedOutRightSide />
            : <LoggedInRightSide />
        }
        <CategorySectionButton
          title="Go to Videos"
          link="/videos"
        />
      </div>
    </div>
  );
}

export default CategorySection;

const PopularDataSection = () => {
  return <div>
    <h1 className="p-1 font-bold text-sm">
      POPULAR DATA
    </h1>
    <CategoryCards />
  </div>;
}

const CategoryCards = () => {
  return (
    <>
      <div className="mt-3">
        <CategoryCard
          Icon1={<BiCategoryAlt />}
          Title="Category title 01"
          Icon2={<BsChevronRight />} />
        <CategoryCard
          Icon1={<BiCategoryAlt />}
          Title="Category title 02"
          Icon2={<BsChevronRight />} />
        <CategoryCard
          Icon1={<BiCategoryAlt />}
          Title="Category title 03"
          Icon2={<BsChevronRight />} />
      </div>
    </>
  )
}




const LoggedOutRightSide = () => {
  return (
    <>
      <div>
        <h1 className="font-bold text-center mb-9">
          Login to your account and publish requirements
        </h1>
        <div className="space-x-50 text-white font-medium text-sm px-5 py-2.5 text-center ">
          <CategorySectionButton title="Login" link="/login" />
          <CategorySectionButton title="Sign up" link="/register" />
        </div>
      </div>
    </>
  )
}




const LoggedInRightSide = () => {

  const [user, setUser] = React.useContext(UserContext)

  return (
    <>
      <UserAvatar />
      <CategorySectionButton title="Go to Cart" link="/add-product-to-cart" />
      <LogOutButton />
      {
        user.role != USER_ROLE.CONSUMER.toLowerCase()
          ? <CategorySectionButton title="Add Products" link="/upload-file" />
          : <></>
      }
    </>
  )
}

const UserAvatar = ():JSX.Element => {
  let userImage = ''

  const [user, setUser] = React.useContext(UserContext)

  return (
    <>
      <Avatar
        name={user.nick_name}
        size="100"
        round={true}
        src={userImage}
      />
      <div className="text-center" style={{ marginBottom: '10px' }}>
        {user.nick_name}
      </div>
      <div>You are a <b>{user.role}</b>!</div>
    </>
  )
}


const LogOutButton = ():JSX.Element => {

  const dispatch = useAppDispatch();

  const handleSubmit = (event: any):void => {
    event.preventDefault();
    dispatch(logoutUser());
  }

  return (
    <>
      <div onClick={handleSubmit}>
        <CategorySectionButton
          title="Logout"
          link="/"
        />
      </div>
    </>
  )
}