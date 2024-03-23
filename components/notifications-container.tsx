"use client";

import { useSession } from "@clerk/nextjs";
import {
  ScrollArea,
  Stack,
  Notification,
  Popover,
  ActionIcon,
  Indicator,
} from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import * as Ably from "ably";
import {
  AblyProvider,
  useChannel,
  useConnectionStateListener,
} from "ably/react";

import { useEffect, useState } from "react";

const NotificationsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [client, setClient] = useState<Ably.Types.RealtimePromise | null>(null);

  useEffect(() => {
    const ablyClient = new Ably.Realtime.Promise({ authUrl: "/api/ably" });
    setClient(ablyClient);

    // Clean up function to close the connection when the component is unmounted
    return () => {
      ablyClient.close();
    };
  }, []); // Empty dependency array ensures this runs once on mount and not on updates

  // Don't render children until the client is ready
  if (!client) {
    return null;
  }

  return <AblyProvider client={client}>{children}</AblyProvider>;
};

export default NotificationsContainer;

export const Notifications = () => {
  const { isLoaded, session, isSignedIn } = useSession();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(false);
  const [opened, setOpened] = useState(false); // New state for tracking new messages

  useConnectionStateListener("connected", () => {
    console.log("Connected to Ably!");
  });

  const { channel } = useChannel(
    `[?rewind=10]organization:${session?.user.publicMetadata.organizationId}`,
    (message) => {
      setMessages((previousMessages) => [...previousMessages, message]);
      setNewMessage(true); // Set newMessage to true when a new message arrives
    }
  );

  const handlePopoverOpen = () => {
    setOpened((prev) => !prev); // Toggle the opened state of the popover
    setNewMessage(false); // Set newMessage to false when the popover is opened
  };

  return (
    <Popover
      width={350}
      position="bottom"
      withArrow
      shadow="md"
      opened={opened}
    >
      <Popover.Target>
        <Indicator processing disabled={!newMessage}>
          <ActionIcon
            onClick={handlePopoverOpen}
            variant="light"
            size="lg"
            aria-label="open notifications"
            radius="xl"
          >
            <IconBell stroke={1.5} />
          </ActionIcon>
        </Indicator>
      </Popover.Target>
      <Popover.Dropdown>
        <ScrollArea h={400}>
          <Stack gap="sm">
            {messages.map((message) => {
              return (
                <Notification
                  key={message.id}
                  withBorder
                  title="Nachricht"
                  classNames={{ root: "no-shadow" }}
                >
                  {message.data.body}
                </Notification>
              );
            })}
          </Stack>
        </ScrollArea>
      </Popover.Dropdown>
    </Popover>
  );
};
