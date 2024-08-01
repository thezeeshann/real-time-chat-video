import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative flex flex-col w-64 min-h-screen text-white bg-gray-800">
        <div className="p-2 text-center bg-green-500 rounded-md">
          <h1
            className="font-semibold cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            Add Friend
          </h1>
        </div>
        <p className="mt-2 font-semibold text-center">Private message</p>
        <div className="flex-1 p-4">
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-row items-center justify-between ">
              <div className="flex flex-row items-center gap-x-2">
                <span className="p-2 bg-blue-500 rounded-full ">Ma</span>
                <p>Mark</p>
              </div>
              <span>*</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-4 gap-y-2">
          <button className="w-full text-blue-500">INVITATIONS</button>
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-row items-center justify-between ">
              <div className="flex flex-row items-center gap-x-2">
                <span className="p-2 bg-blue-500 rounded-full ">Ma</span>
                <p>Mark</p>
              </div>
              <span>X</span>
              <span>✓</span>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-row items-center justify-between ">
              <div className="flex flex-row items-center gap-x-2">
                <span className="p-2 bg-blue-500 rounded-full ">Ma</span>
                <p>Mark</p>
              </div>
              <span>X</span>
              <span>✓</span>
            </div>
          </div>
        </div>
      </div>

      {isOpen === true && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
         <div className="p-4 bg-white w-[500px] h-[180px] rounded">
           <p className="font-semibold text-neutral-500">Invite a Friend</p>
           <p className="font-semibold text-neutral-500">Enter a email address of friend which you would like to add</p>
           <div className="flex flex-col gap-y-1">
             <label htmlFor="email" className="font-semibold text-neutral-500">Email</label>
             <input type="email" name="email" id="email" className="border-[1px] py-1 p-2" placeholder="Email Address"/>
           </div>
           <div className="flex flex-row items-center justify-between mt-2 gap-x-2">
           <button onClick={()=>setIsOpen(false)} className="cursor-pointer text-white bg-neutral-500 py-2 rounded-md w-[50%] font-semibold">Colse</button>
           <button className="text-white bg-blue-500 rounded-md w-[50%] cursor-pointer py-2 font-semibold" type="submit">Send</button>
           </div>
         </div>
       </div>
      )}
    </>
  );
};

export default Sidebar;
