import Header from "./component/header";
import MessageFeed from "./component/messageFeed";
import UserForm from "./component/userForm";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen w-full overflow-auto scrollbar-hidden">
      <Header />

      <div className="max-w-3xl  mx-auto flex flex-col gap-4 md:gap-8 mt-14 md:mt-20 px-6 h-[84dvh] overflow-auto scrollbar-hidden">
        <div className=" space-y-2 md:space-y-4 mx-auto max-w-full">
          <h2 className="text-2xl md:text-4xl font-bold">
            Your Link, Their Thoughts - Anonymously!
          </h2>
          <p className="text-[1rem] font-medium">
            With <span className="bg-black text-white p-1">anonChat,</span>
            &nbsp;create a link, share it, and receive anonymous messages. Whether for
            fun or feedback, uncover what others have to say -
            <span className="bg-black text-white p-1">
             &nbsp; no names, just honesty!
            </span>
          </p>
        </div>

        <UserForm />
      
      <div className="h-full w-full flex flex-col gap-2 scrollbar-hidden">
      <MessageFeed />
      </div>
 
      </div>
    </main>
  );
}
