
import MessageFeed from "./component/messageFeed";
import UserForm from "./component/userForm";

export default function Home() {

 

  return (
    <main className="min-h-[90dvh] w-full ">
     <div className="flex flex-col max-w-3xl mt-20 gap-6 justify-center items-start mx-auto px-6">
     <div className=" bg-zinc-800 rounded-md p-4 w-full">
        <ul className="text-xl font-medium text-white font-mono">
          <li># Write your name and generate the link</li>
          <li># Copy the link and share it with your friends</li>
          <li># They can join the anonymous chat</li>
        </ul>
      </div>
     
      <UserForm />
      <MessageFeed />
      
     </div>
  
    </main>
  );
}
