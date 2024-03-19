"use client";

import { useUser } from "@clerk/nextjs";
import { ScrollArea, Stack, Notification, Loader } from "@mantine/core";
import * as Ably from "ably";
import {
  AblyProvider,
  useChannel,
  useConnectionStateListener,
} from "ably/react";
import { useState } from "react";

const NotificationsContainer = () => {
  const client = new Ably.Realtime.Promise({ authUrl: "/api/ably" });
  return (
    <AblyProvider client={client}>
      <Notifications />
    </AblyProvider>
  );
};

export default NotificationsContainer;

const Notifications = () => {
  const [messages, setMessages] = useState([]);

  useConnectionStateListener("connected", () => {
    console.log("Connected to Ably!");
  });

  // Create a channel called 'get-started' and subscribe to all messages with the name 'first' using the useChannel hook
  const { channel } = useChannel("organization", (message) => {
    setMessages((previousMessages) => [...previousMessages, message]);
  });

  return (
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
  );
};
