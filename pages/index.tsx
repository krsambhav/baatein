import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import PersonCard from "../components/PersonCard";
import LanguageSelector from "../components/LanguageSelector";
import { useEffect, useRef, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import MessageBox from "../components/MessageBox";
import NavBar from "../components/NavBar";
import { getSession, useSession } from "next-auth/react";
import getUuidByString from "uuid-by-string";
import { IoIosArrowDown } from "react-icons/io";
import Pusher from "pusher-js";

const Home = () => {
  const [userList, setUserList] = useState<any>();
  const [activeChat, setActiveChat] = useState<any>();
  // const [session, setSession] = useState<any>();
  const [inputMessage, setInputMessage] = useState<string>("");
  const [fetchedMessages, setFetchedMessaged] = useState<any>();
  const [darkMode, setDarkMode] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const inputBoxRef = useRef(null);
  const chatBoxRef = useRef<any>();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [searchBarInput, setSearchBarInput] = useState<string>("");

  const session = useSession().data;
  // console.log(session);

  const handleSendMessage = (event) => {
    if (event.keyCode === 13 && inputMessage != "") {
      const msgData = {
        uid: getUuidByString(session?.user?.email + activeChat.email),
        from: session?.user?.email,
        to: activeChat.email,
        timestamp: new Date().toString(),
        sourceMsg: inputMessage,
      };
      // console.log(msgData);
      handleMessageSend(msgData).then(() => {
        fetchMessages(session?.user, activeChat);
      });
    }
    return;
  };

  const handleMessageSend = async (message) => {
    const getTargetLanguage = await fetch("/api/getlang/" + activeChat.email)
      .then((res) => res.json())
      .then((data) => data.data[0]);
    // console.log(getTargetLanguage);
    // console.log(message);
    let requestMsgParams = {
      targetLanguage: getTargetLanguage["lang"],
      msgText: message.sourceMsg,
    };
    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestMsgParams),
    };
    const getTranslatedMessage = await fetch("/api/translate", requestOptions)
      .then((res) => res.json())
      .then((data) => data.data);
    // console.log(getTranslatedMessage);
    requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...message, targetMsg: getTranslatedMessage }),
    };
    const res = await fetch("/api/chats", requestOptions);
    const data = await res.json();
    // console.log(data);
  };

  const handleChangeActiveChat = (user: any) => {
    if (activeChat === user) return;
    localStorage.setItem("activeChat", String(JSON.stringify(user)));
    setFetchedMessaged([]);
    setActiveChat(user);
    setSearchBarInput("");
    setShowContacts(false);
    // console.log(user)
  };

  const fetchMessages = (currentUser, friend) => {
    const cf_uid = getUuidByString(currentUser.email + friend.email);
    const fc_uid = getUuidByString(friend.email + currentUser.email);
    // console.log(cf_uid, fc_uid);
    fetch("/api/chat/" + cf_uid + fc_uid)
      .then((res) => res.json())
      .then((data) => {
        setFetchedMessaged(data.data);
        // console.log(data.data);
        // console.log(activeChat);
      });
  };

  const handleLanguageChange = (lang) => {
    const langData = {
      email: session?.user?.email,
      lang: lang.code,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(langData),
    };
    const res = fetch("/api/lang", requestOptions);
  };

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", String(!darkMode));
  };

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUserList(data.data);
        // setActiveChat(data.data[0]);
        return data.data[0];
      });
    // const getSess = getSession().then((data) => {
    //   setSession(data);
    //   return data;
    // });
    // fetchUsers.then((activeChat) =>
    //   getSess.then((session) => {
    //     // fetchMessages();
    //   })
    // );
  }, []);

  useEffect(() => {
    if (localStorage.getItem("theme") == "true") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (activeChat) fetchMessages(session?.user, activeChat);
  }, [activeChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const refreshMessages = () => {
    console.log("Pushed");
    // console.log(activeChat);
    fetchMessages(session?.user, activeChat);
  };

  useEffect(() => {
    scrollToBottom();
  }, [fetchMessages]);

  useEffect(() => {
    const aC = JSON.parse(localStorage.getItem("activeChat") || "null");
    // console.log(aC)
    if (aC == "null") return;
    setActiveChat(aC);
  }, []);

  // useEffect(() => {
  //   const pusher = new Pusher("3641ccfa046551ca870f", {
  //     cluster: "ap2",
  //   });
  //   const channel = pusher.subscribe("chat");
  //   channel.bind("chat-event", function (data) {
  //     setInterval(() => {
  //       console.log(activeChat);
  //     }, 1000)
  //     if (data.targetUser === session?.user?.email) refreshMessages();
  //   });
  //   return () => {
  //     pusher.unsubscribe("chat");
  //   };
  // }, []);

  useEffect(() => {
    const pusher = new Pusher("3641ccfa046551ca870f", {
      cluster: "ap2",
    });
    const channel = pusher.subscribe("chat");
    // console.log("Updated data : ", activeChat);
    if (channel && channel.bind && activeChat) {
      console.log("Unbinding Event");
      channel.unbind("chat-event");
      console.log("Rebinding Event");
      channel.bind("chat-event", (pusherData) => {
        if (pusherData.targetUser == activeChat.email)
          fetchMessages(session?.user, activeChat);
      });
    }
  }, [activeChat]);

  return (
    <div
      className={`${
        darkMode && "dark bg-gray-900 text-white"
      } h-[93vh] flex flex-col justify-center items-center transition-all duration-300 md:h-screen`}
    >
      <Head>
        <title>Baatein</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400&family=Titillium+Web:ital,wght@0,200;0,300;0,400;1,200;1,300&display=swap&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div
        className={`dark:bg-gray-900 dark:text-white main-container flex-col items-center md:px-10 md:py-0 md:gap-0 w-screen md:flex md:w-[1000px] m-auto h-[90vh] md:h-[800px] dark:transition-all dark:duration-300 md:shadow-xl`}
      >
        <NavBar
          onClick={handleThemeChange}
          theme={darkMode}
          showThemeButton={true}
        />
        <div className="body-container w-full h-[80vh] md:h-[80vh] flex flex-row mt-5 md:mt-0 ">
          <div className="contacts-container hidden md:block md:w-[250px]">
            <div className="search-bar-container w-full flex flex-col items-center justify-center h-[12%]">
              <input
                type="text"
                name="search-bar"
                id="search-bar"
                className="focus:shadow-xl drop-shadow w-10/12 px-2 py-1 text-xs outline-none h-8 dark:bg-gray-900 dark:border dark:border-purple-500 transition-all duration-300"
                placeholder="Peter Griffin"
                value={searchBarInput}
                onChange={(e) => {
                  setSearchBarInput(e.target.value);
                }}
              />
            </div>
            <div className="contact-list-container h-[70%] overflow-y-scroll flex flex-col">
              {userList &&
                session &&
                (searchBarInput === ""
                  ? userList
                      .filter((user) => user.email !== session?.user?.email)
                      .map((user, index) => (
                        <PersonCard
                          key={index}
                          imageURL={user.image}
                          name={user.name}
                          onClick={() => handleChangeActiveChat(user)}
                        />
                      ))
                  : userList
                      .filter((user) => user.email !== session?.user?.email)
                      .filter(
                        (user) =>
                          user.name
                            .substring(0, searchBarInput.length)
                            .toLowerCase() === searchBarInput.toLowerCase()
                      )
                      .map((user, index) => (
                        <PersonCard
                          key={index}
                          imageURL={user.image}
                          name={user.name}
                          onClick={() => handleChangeActiveChat(user)}
                        />
                      )))}
            </div>
          </div>
          <div className="divider hidden md:block bg-slate-300 h-[650px] border-l dark:bg-gray-900 dark:border-purple-700 ml-5"></div>
          <div className="chat-parent-container w-screen md:w-[750px]">
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
              <IoIosArrowDown
                className={`md:hidden ${showContacts && "rotate-180"}`}
                onClick={() => setShowContacts(!showContacts)}
              />
              {showContacts && (
                <div className="z-20 w-[90vw] flex flex-col fixed top-48 h-[60vh] items-center">
                  <input
                    className="mobile-search-bar md:hidden px-3 py-1 shadow-xl z-20 top-40 outline-none mb-5 w-[200px]"
                    placeholder="Peter Griffin"
                    value={searchBarInput}
                    onChange={(e) => {
                      setSearchBarInput(e.target.value);
                    }}
                  />
                  <div className="mobile-contacts-container w-[90%] dark:bg-gray-900 dark:border rounded-lg dark:border-red-500 z-20 h-[50vh] overflow-y-scroll">
                    {userList &&
                      session &&
                      (searchBarInput === ""
                        ? userList
                            .filter(
                              (user) => user.email !== session?.user?.email
                            )
                            .map((user, index) => (
                              <PersonCard
                                key={index}
                                imageURL={user.image}
                                name={user.name}
                                onClick={() => handleChangeActiveChat(user)}
                              />
                            ))
                        : userList
                            .filter(
                              (user) => user.email !== session?.user?.email
                            )
                            .filter(
                              (user) =>
                                user.name
                                  .substring(0, searchBarInput.length)
                                  .toLowerCase() ===
                                searchBarInput.toLowerCase()
                            )
                            .map((user, index) => (
                              <PersonCard
                                key={index}
                                imageURL={user.image}
                                name={user.name}
                                onClick={() => handleChangeActiveChat(user)}
                              />
                            )))}
                  </div>
                </div>
              )}
              <div className="chat-lang-container w-[160px] md:w-[200px] ">
                <LanguageSelector
                  onLangChange={handleLanguageChange}
                  userEmail={session?.user?.email}
                />
              </div>
            </div>
            <div
              className={`chat-box-container mt-3 md:mt-0 h-[60vh] md:h-[550px] overflow-y-scroll overflow-x-hidden pt-5 text-sm flex flex-col gap-3 px-3 transition-all duration-150 ${
                showContacts && "blur-lg"
              }`}
              ref={chatBoxRef}
            >
              {fetchedMessages &&
                fetchedMessages.map((msg, index) => (
                  <MessageBox
                    key={index}
                    msgType={msg.from === activeChat.email ? "left" : "right"}
                    imageURL={
                      msg.from !== activeChat.email
                        ? session?.user?.image
                        : activeChat.image
                    }
                    text1={`${msg.sourceMsg}`}
                    text2={`${msg.targetMsg}`}
                    time={msg.timestamp}
                  />
                ))}
              <div style={{ marginBottom: 10 }} ref={messagesEndRef} />
            </div>
            <div className="chat-input-container h-[50px] md:h-16 w-full flex flex-col items-center justify-center">
              {activeChat && (
                <input
                  type="text"
                  name="message-box"
                  id="message-box"
                  placeholder="Type Message Here..."
                  className="drop-shadow focus:shadow-md transition-all duration-300 h-8 px-2 py-1 outline-none w-[90vw] md:w-[600px] text-sm dark:bg-gray-900 dark:border dark:border-purple-400"
                  onChange={(e) => {
                    setInputMessage(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    handleSendMessage(e);
                    if (e.key === "Enter") e.currentTarget.value = "";
                  }}
                  autoComplete="off"
                  ref={inputBoxRef}
                  onFocus={() => {
                    chatBoxRef.current.scrollIntoView();
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="mobile-banner self-center text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 cursor-pointer md:hidden">
        Please Open On PC
      </div> */}
    </div>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session)
    return { redirect: { destination: "/login", permanent: false } };
  return { props: { session } };
}
