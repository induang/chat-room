export default function GroupChatPreofile({ name }: { name: string }) {
  return (
    <div className="w-14 rounded-full bg-secondary text-white text-2xl leading-10 overflow-hidden text-center">
      {name}
    </div>
  );
}
