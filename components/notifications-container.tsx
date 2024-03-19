"use client";

import * as Ably from "ably";
import {
  AblyProvider,
  useChannel,
  useConnectionStateListener,
} from "ably/react";
import { useState } from "react";

export const NotificationsContainer = () => {
  const client = new Ably.Realtime.Promise({ authUrl: "/api/ably" });

  return (
    <AblyProvider client={client}>
      <Notifications />
    </AblyProvider>
  );
};

export const Notifications = () => {
  const [messages, setMessages] = useState([]);

  useConnectionStateListener("connected", () => {
    console.log("Connected to Ably!");
  });

  // Create a channel called 'get-started' and subscribe to all messages with the name 'first' using the useChannel hook
  const { channel } = useChannel("organization", "notifications", (message) => {
    setMessages((previousMessages) => [...previousMessages, message]);
  });

  return (
    <div>
      {messages.map((message) => {
        return <p key={message.id}>{message.data.body}</p>;
      })}
    </div>
  );
};
