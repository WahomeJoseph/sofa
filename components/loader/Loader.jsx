export default function Loader() {
  return (
    <div className="flex flex-row gap-2 mt-0 items-center justify-center">
      <div className="w-5 h-5 rounded-full bg-amber-600 animate-bounce"></div>
      <div
        className="w-5 h-5 rounded-full bg-amber-600 animate-bounce [animation-delay:-.3s]">
      </div>
      <div
        className="w-5 h-5 rounded-full bg-amber-600 animate-bounce [animation-delay:-.5s]">
      </div>
      <div
        className="w-5 h-5 rounded-full bg-amber-600 animate-bounce [animation-delay:-.7s]">
      </div>
    </div>
  );
}

