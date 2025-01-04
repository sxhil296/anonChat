import MessageForm from "@/app/component/messageForm";

interface PageProps {
  params: Promise<{ username: string }>;
}

export default async function Message({ params }: PageProps) {
  const { username } = await params; 

  console.log(username);

  return (
    <div className="mt-20 max-w-3xl mx-auto px-6">
      <MessageForm userId={username} />
    </div>
  );
}
