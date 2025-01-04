import MessageForm from "@/app/component/messageForm";


export default function Message({params}:{params:{username:string}}) {
  const userId = params.username;
  console.log(userId);
 
  return (
    <div className="  mt-20 max-w-3xl mx-auto px-6">
   
      <MessageForm userId={userId}/>
    </div>
  );
}
