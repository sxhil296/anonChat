import MessageForm from "@/app/component/messageForm";


export default function Message({ params }: { params: { username: string } }) {
 
  return (
    <div className="  mt-20 max-w-3xl mx-auto ">
   
      <MessageForm />
    </div>
  );
}
