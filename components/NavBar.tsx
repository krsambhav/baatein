import type { NextPage } from "next";
import { getSession, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { MdOutlineLogout } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import Logo from '../public/static/logo.svg';
// import {ReactComponent as Log} from '../public/static/logo.svg';
// import { ReactSVG } from "react-svg";

export default function NavBar({
  theme,
  onClick,
  showThemeButton,
}: {
  theme?: any;
  onClick?: any;
  showThemeButton?: any;
}) {
  const session = useSession();
  // console.log(session);
  const userPic = session?.data?.user?.image;
  return (
    <div className="nav-bar flex flex-row justify-between md:w-full px-3 md:px-0 w-[100vw] mt-5 md:mt-0">
      <Link href={"/"}>
        <a>
          {/* <div className="title text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 cursor-pointer">
            Baatein
       </div> */}
          {/* <ReactSVG src='https://www.svgrepo.com/download/418987/fastfood-food-hamburger.svg' /> */}
          {/* <Logo /> */}
          {/* <Image src={logo} height={100} width={100} style={{'color':'red', 'backgroundColor':'red', 'fill':'red', 'stroke' : 'red'}} /> */}
          <Logo className='w-20 h-20 dark:fill-white' />
        </a>
      </Link>
      <div className="flex flex-row items-center gap-5">
        {showThemeButton && (
          <DarkModeSwitch
            checked={theme}
            onChange={onClick}
            size={18}
            moonColor={"white"}
            sunColor={"black"}
          />
        )}
        {session?.status == "authenticated" && (
          <span className="cursor-pointer rotate-180" onClick={() => signOut()}>
            <MdOutlineLogout />
          </span>
        )}
        <div className="profile-picture-container w-10 h-10">
          <Link href={"/login"}>
            <a>
              {userPic ? (
                <Image
                  src={
                    userPic ||
                    "https://d1fdloi71mui9q.cloudfront.net/ZSjKjeQTyKnJHLCJs8LQ_G8UirQ9PGI1aVm7s"
                  }
                  alt="Picture of something nice"
                  width={16}
                  height={16}
                  layout="responsive"
                  quality={65}
                  className="rounded-full cursor-pointer"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 cursor-pointer"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   if(session){
//     console.log(session);
//   }
// }
