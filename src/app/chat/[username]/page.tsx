import MessageForm from "@/app/component/messageForm";

export default function Message({ params }: { params: { username: string } }) {
  return (
    <div className="  mt-20 max-w-3xl mx-auto ">
      <div className="text-xl font-medium text-zinc-600 mb-2"> Send Anon Message to {params.username}</div>
      <MessageForm />
    </div>
  );
}
