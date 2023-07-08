import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { postId } = req.query;
        
        const { currentUser } = await serverAuth(req, res);

        if (!postId || typeof postId !== 'string') {
            throw new Error('Invalid ID');
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });

        if (!post) {
            throw new Error('Invalid ID')
        }

        let updatedLikeIds = [...(post.likedIds || [])];

        if (req.method === 'PATCH') {
            updatedLikeIds = [...updatedLikeIds, currentUser.id];

            try {
                const post = await prisma.post.findUnique({
                    where: {
                        id: postId
                    }
                });

                if (post?.userId) {
                    await prisma.notification.create({
                        data: {
                            body: 'Someone liked your tweet!',
                            userId: post.userId,
                        }
                    });

                    await prisma.user.update({
                        where: {
                            id: post.userId
                        },
                        data: {
                            hasNotification: true,
                        }
                    })
                }
            } catch (error) {
                console.log(error);
            }
            
        }

        if (req.method === 'DELETE') {
            updatedLikeIds = updatedLikeIds.filter((likeId) => likeId !== currentUser.id)
        }

        const updatedPost = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                likedIds: updatedLikeIds
            }
        })

        return res.status(200).json(updatedPost);

        
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
} 