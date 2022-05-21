import Image from "next/image";

export default function PersonCard({imageURL, name}: {imageURL:string, name:string}) {
  return (
    <div className="w-full h-16 flex flex-row pl-5 gap-5 items-center cursor-pointer hover:bg-gradient-to-r from-blue-100 to-pink-100 transition-all duration-300">
      <div className="person-card-image-container w-10 h-10">
      <Image
        src={imageURL}
        width={12}
        height={12}
        layout="responsive"
        quality={65}
        className='rounded-full'
      />
      </div>
      <div className="person-card-name-container text-sm">
        {name}
      </div>
    </div>
  );
}
