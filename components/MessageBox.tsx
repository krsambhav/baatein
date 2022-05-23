import Image from "next/image";

export default function MessageBox({ msgType, imageURL, text1, text2, time }) {
  return (
    <>
      {msgType == "left" ? (
        <div className="msg-left flex flex-row w-[400px] items-center gap-3 pl-3 dark:text-black">
          {/* <div className="image-container w-8">
            <Image
              src={imageURL}
              layout="responsive"
              width={1}
              height={1}
              quality={1}
              className="rounded-full"
            />
          </div> */}
          <div className="text-container bg-gradient-to-r from-blue-100 to-pink-100 px-3 py-2 rounded-xl rounded-bl-none dark:text-black">
            {text1}
            <br />
            {text2}
          </div>
          <div className="timestamp-container text-xs text-gray-300">
            {`${new Date(time).getDate() < 10 ? 0 : ""}${new Date(
              time
            ).getDate()}/${new Date(time).getMonth() < 10 ? 0 : ""}${
              new Date(time).getMonth() + 1
            } ${new Date(
              time
            ).getHours()%12}:${
              new Date(time).getMinutes() < 10 ? 0 : ""
            }${new Date(time).getMinutes()}`}
          </div>
        </div>
      ) : (
        <div className="msg-right self-end flex flex-row-reverse w-[400px] items-center gap-3 pr-3 dark:text-black">
          {/* <div className="image-container w-8 z-10">
            <Image
              src={imageURL}
              layout="responsive"
              width={1}
              height={1}
              quality={1}
              className="rounded-full"
            />
          </div> */}

          <div className="text-container bg-gradient-to-r from-blue-100 to-pink-100 px-3 py-2 rounded-xl rounded-br-none dark:text-black">
          {text1}
          <br />
          <br />
          {text2}
          </div>
          <div className="timestamp-container text-xs text-gray-300">
            {`${new Date(time).getDate() < 10 ? 0 : ""}${new Date(
              time
            ).getDate()}/${new Date(time).getMonth() < 10 ? 0 : ""}${
              new Date(time).getMonth() + 1
            } ${new Date(
              time
            ).getHours()%12}:${
              new Date(time).getMinutes() < 10 ? 0 : ""
            }${new Date(time).getMinutes()}`}
          </div>
        </div>
      )}
    </>
  );
}
