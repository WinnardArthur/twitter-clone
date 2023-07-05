import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import Image from 'next/image';

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
    const { data: fetchedUser } = useUser(userId);
    const router = useRouter();

    const onClick = useCallback((event: any) => {
        event.stopPropagation();

        const url = `/users/${userId}`;

        router.push(url)
    }, [router, userId]);

    return (
      <div
        className={`
            ${hasBorder ? "border-4" : "border-black"}
            ${isLarge ? "h-32" : "h-12"}
            ${hasBorder ? "w-32" : "w-12"}
            rounded-full
            hover:opacity-90
            transition
            cursor-pointer
            border-black
            relative
        `}
      >
            <Image
                fill
                alt='Avatar'
                onClick={onClick}
                src={fetchedUser?.profileImage || '/images/placeholder.png'}
                style={{
                    objectFit: 'cover',
                    borderRadius: '100%',
                }}
            />
      </div>
    );
};

export default Avatar;
