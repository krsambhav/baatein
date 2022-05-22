import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import PersonCard from "../components/PersonCard";
import LanguageSelector from "../components/LanguageSelector";
import { useEffect, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import MessageBox from "../components/MessageBox";
import NavBar from "../components/NavBar";
import { getSession } from "next-auth/react";
import getUuidByString from "uuid-by-string";

const Home: NextPage = () => {
  const [userList, setUserList] = useState<any>();
  const [activeChat, setActiveChat] = useState<any>();
  const [session, setSession] = useState<any>();
  const [inputMessage, setInputMessage] = useState<string>("");
  const [fetchedMessages, setFetchedMessaged] = useState<any>();
  useEffect(() => {
    const fetchUsers = fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUserList(data.data);
        // setActiveChat(data.data[0]);
        return data.data[0];
      });
    const getSess = getSession().then((data) => {
      setSession(data);
      return data;
    });
    fetchUsers.then((activeChat) =>
      getSess.then((session) => {
        // fetchMessages();
      })
    );
  }, []);

  const fetchMessages = () => {
    let uid = getUuidByString(session?.user?.email + activeChat.email);
    fetch("/api/chat/" + uid)
      .then((res) => res.json())
      .then((data) => {
        setFetchedMessaged(data);
        // console.log(data);
      });
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      const msgData = {
        uid: getUuidByString(session.user.email + activeChat.email),
        from: session.user.email,
        to: activeChat.email,
        timestamp: new Date().toString(),
        msgType: "sent",
        msgText: inputMessage,
      };
      // console.log(msgData);
      handleMessageSend(msgData).then(fetchMessages)
    }
    return;
  };

  const handleMessageSend = async (message) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    };
    const res = await fetch("/api/chats", requestOptions);
    const data = await res.json();
    // console.log(data);
  };

  const handleChangeActiveChat = (user:any) => {
    setActiveChat(user);
  }

  useEffect(() => {
    activeChat && fetchMessages()
  }, [activeChat])
  

  return (
    <>
      <Head>
        <title>Baatein</title>
      </Head>
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
              {session &&
                userList
                  .filter((user) => user.email !== session.user.email)
                  .map((user, index) => (
                    <PersonCard
                      key={index}
                      imageURL={user.image}
                      name={user.name}
                      onClick={() => handleChangeActiveChat(user)}
                    />
                  ))}
            </div>
          </div>
          <div className="divider bg-slate-300 h-100 border-l"></div>
          <div className="chat-parent-container w-[750px]">
            <div className="chat-title-container flex flex-row items-center gap-3 px-5 w-[100%] h-14 justify-between">
              {activeChat && (
                <div className="person-card-container flex flex-row items-center gap-3">
                  <div className="person-card-image-container w-10 h-10">
                    <Image
                      src={activeChat.image}
                      width={12}
                      height={12}
                      layout="responsive"
                      quality={65}
                      className="rounded-full"
                    />
                  </div>
                  <div className="person-card-name-container text-sm">
                    {activeChat.name}
                  </div>
                </div>
              )}
              <div className="chat-lang-container w-[200px]">
                <LanguageSelector />
              </div>
            </div>
            <div className="chat-box-container h-[550px] overflow-y-scroll pt-5 text-sm flex flex-col gap-3">
              {fetchedMessages &&
                fetchedMessages.data.map((msg, index) => (
                  <MessageBox
                    key={index}
                    msgType={msg.msgType == "sent" ? "right" : "left"}
                    imageURL={
                      msg.msgType == "sent"
                        ? session.user.image
                        : activeChat.image
                    }
                    text={msg.msgText}
                  />
                ))}
            </div>
            <div className="chat-input-container h-16 w-full flex flex-col items-center justify-center">
              <input
                type="text"
                name="message-box"
                id="message-box"
                placeholder="Type Message Here..."
                className="drop-shadow focus:shadow-md transition-all duration-300 h-8 px-2 py-1 outline-none w-[600px] text-sm"
                onChange={(e) => {
                  setInputMessage(e.target.value);
                }}
                onKeyDown={(e) => {
                  handleKeyPress(e);
                  if(e.key === 'Enter' )
                    e.currentTarget.value = ''
                  console.log(e.key);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session)
    return { redirect: { destination: "/login", permanent: false } };
  return { props: { session } };
}
