import useUserInfo from "@/hooks/useUserInfo";
import Image from "next/image";

export default function UserAvatar({
  sizeClass = "size-8",
  fontSize = "text-xl",
}: {
  sizeClass?: string;
  fontSize?: string;
}) {
  const { user } = useUserInfo();
  if (!user) return null;
  return (
    <>
      {user.avatar ? (
        <Image
          priority
          className={`${sizeClass} border-primary-hover rounded-full border-2`}
          src={user.avatar}
          alt={user.firstName}
          width={32}
          height={32}
        />
      ) : (
        <div
          className={`${sizeClass} border-primary-hover flex items-center justify-center rounded-full border-2 bg-gray-400 ${fontSize} text-primary-hover select-none`}
        >
          {user.firstName.slice(0, 2).toUpperCase()}
        </div>
      )}
    </>
  );
}
