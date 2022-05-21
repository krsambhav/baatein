import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import PersonCard from "../components/PersonCard";
import LanguageSelector from "../components/LanguageSelector";
import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import MessageBox from "../components/MessageBox";
import NavBar from "../components/NavBar";
import { getSession } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <div
      className={`main-container flex flex-col items-center px-10 py-10 gap-10 md:w-[1000px] m-auto`}
    >
      <NavBar />
      <div className="body-container w-full h-[80vh] flex flex-row">
        <div className="contacts-container w-[250px]">
          <div className="search-bar-container w-full flex flex-col items-center justify-center h-[12%]">
            <input
              type="text"
              name="search-bar"
              id="search-bar"
              className="transition-all duration-500 focus:shadow-xl drop-shadow w-10/12 px-2 py-1 text-sm outline-none h-8"
              placeholder="John Doe"
            />
          </div>
          <div className="contact-list-container h-[88%] overflow-y-scroll flex flex-col">
            <PersonCard
              imageURL="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              name="Ayesha Khanna"
            />
            <PersonCard
              imageURL="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              name="Helen Smith"
            />
            <PersonCard
              imageURL="https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              name="Caroline Schmidtz"
            />
          </div>
        </div>
        <div className="divider bg-slate-300 h-100 border-l"></div>
        <div className="chat-parent-container w-[750px]">
          <div className="chat-title-container flex flex-row items-center gap-3 px-5 w-[100%] h-14 justify-between">
            <div className="person-card-container flex flex-row items-center gap-3">
              <div className="person-card-image-container w-10 h-10">
                <Image
                  src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  width={12}
                  height={12}
                  layout="responsive"
                  quality={65}
                  className="rounded-full"
                />
              </div>
              <div className="person-card-name-container text-sm">
                Ayesha Khanna
              </div>
            </div>
            <div className="chat-lang-container w-[200px]">
              <LanguageSelector />
            </div>
          </div>
          <div className="chat-box-container h-[550px] overflow-y-scroll pt-5 text-sm flex flex-col gap-3">
            <MessageBox
              msgType={"left"}
              imageURL="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              text="Hi!"
            />
            <MessageBox
              msgType={"right"}
              imageURL="https://d1fdloi71mui9q.cloudfront.net/ZSjKjeQTyKnJHLCJs8LQ_G8UirQ9PGI1aVm7s"
              text="Hello Ayesha!"
            />
          </div>
          <div className="chat-input-container h-16 w-full flex flex-col items-center justify-center">
            <input
              type="text"
              name="message-box"
              id="message-box"
              placeholder="Type Message Here..."
              className="drop-shadow focus:shadow-md transition-all duration-300 h-8 px-2 py-1 outline-none w-[600px] text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) return { redirect: {destination: "/login", permanent: false} };
  return {props: { session },};
}
