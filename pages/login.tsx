import type { NextPage } from "next";
import NavBar from "../components/NavBar";
import { FcGoogle } from "react-icons/fc";
import {getSession, signIn, signOut, useSession} from 'next-auth/react';
import Head from "next/head";

export default function login(params) {
  return (
    
    <div
      className={`main-container flex flex-col items-center px-10 py-10 gap-44 md:w-[1000px] m-auto `}
    >
      <Head>
        <title>Baatein</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400&family=Titillium+Web:ital,wght@0,200;0,300;0,400;1,200;1,300&display=swap&display=swap"
          rel="stylesheet"
        />
      </Head>
      <NavBar showThemeButton={false} />
      {/* <div className="login-container flex flex-col gap-20 items-center" onClick={() => signIn('google')}>
        <div className="login-title title text-2xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600">
          Please Login To Continue
        </div>
        <div className="login-btn-container flex flex-row justify-center border">
          <div className="login-btn w-fit px-3 py-1 flex flex-row items-center gap-2 justify-center font-thin shadow-md  cursor-pointer hover:bg-black hover:text-white hover:shadow-xl transition-all duration-200 select-none">
            <div className="logo">
              <FcGoogle />
            </div>
            <div className="text">Login With Google</div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export async function getServerSideProps(context:any) {
  const session = await getSession(context);

  if (session) return { redirect: {destination: "/", permanent: false} };
  return {props: {session}}
}