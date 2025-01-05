import MessageForm from "@/app/component/messageForm";

interface PageProps {
  params: Promise<{ username: string }>;
}

export default async function Message({ params }: PageProps) {
  const { username } = await params; 

  console.log(username);

  return (
    <div className="mt-8 max-w-3xl mx-auto px-6">
     
      <p className="text-[1rem] font-medium mb-4"> <span className="bg-black text-white p-1">anonChat</span>
      &nbsp;- <span>No one will know it&apos;s you. Speak freely and send your message!</span></p>
         
   
      <MessageForm userId={username} />
    </div>
  );
}
