import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';
import { useUser } from 'src/context/UserState';
import { Topic } from 'src/types/entities/topic';
import { Button, Card, Divider } from '../../ui';

type TopicCardProps = {
    topicData: Topic,
};

const TopicCard = ({ topicData }: TopicCardProps) => {
    const { user } = useUser();
    return (
        <Card className="p-3 flex flex-col gap-3">
            <div className="flex items-center">
                <p className="text-gray-500 dark:text-gray-400 font-semibold text-sm">About Community</p>
                {user && topicData.user_moderator_id && (
                    <Link
                        href={`/t/${topicData.title}/moderation`}
                        passHref
                    >
                        <Button
                            as="a"
                            className="ml-auto text-xs"
                            variant="ghost"
                            border="rounded"
                        >
                            Settings
                        </Button>
                    </Link>
                )}
            </div>
            <p>{topicData.description}</p>
            <div>
                <p className="font-medium -mb-1">{topicData.number_of_followers}</p>
                <small>Follower{topicData.number_of_followers === 1 ? "" : "s"}</small>
            </div>
            <Divider />
            <p>Created {dayjs(topicData.created_at).format("LL")}</p>
            <Link passHref href={`/t/${topicData.title}/submit`}>
                <Button
                    as="a"
                    variant="filled"
                    fullWidth
                >
                    Add Post
                </Button>
            </Link>
        </Card>
    );
};

export default TopicCard;
