import Image from "next/image";

export default function MessageBox({ msgType, imageURL, text }) {
  return (
    <>
      {msgType == "left" ? (
        <div className="msg-left flex flex-row w-[200px] items-center gap-3 pl-3 -z-10">
          <div className="image-container w-8">
            <Image
              src={imageURL}
              layout="responsive"
              width={1}
              height={1}
              quality={1}
              className="rounded-full"
            />
          </div>
          <div className="text-container bg-gradient-to-r from-blue-100 to-pink-100 px-3 py-2 rounded-xl rounded-bl-none">
            {text}
          </div>
        </div>
      ) : (
        <div className="msg-right self-end flex flex-row-reverse w-[200px] items-center gap-3 pr-3 -z-10">
          <div className="image-container w-8">
            <Image
              src={imageURL}
              layout="responsive"
              width={1}
              height={1}
              quality={1}
              className="rounded-full"
            />
          </div>
          <div className="text-container bg-gradient-to-r from-blue-100 to-pink-100 px-3 py-2 rounded-xl rounded-br-none">
            {text}
          </div>
        </div>
      )}
    </>
  );
}
