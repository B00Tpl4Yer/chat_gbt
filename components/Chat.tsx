"use client";

import { db } from "../firebase";
import { query, collection, orderBy } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  ArrowDownCircleIcon,
  BoltIcon,
  ExclamationTriangleIcon,
  FireIcon,
  LockClosedIcon,
  SunIcon,
} from "@heroicons/react/24/solid";
import Message from "./Message";

type Props = {
  chatId: string;
};

function Chat({ chatId }: Props) {
  const { data: session } = useSession();

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {messages && messages.docs.length > 0 && (
        <>
          <div className="text-white flex items-center justify-center py-2">
            <div>Default(GPT-3.5)</div>
          </div>
          <hr />
        </>
      )}
      {messages?.empty && (
        <>
          <div className="bg-gray-800 flex mx-[500px] rounded-lg -px-2 py-1 justify-center items-center mt-7">
            <div className="flex-none bg-gray-600 GPT">
              <BoltIcon className="h-4 w-4" />
              <p>GPT-3.5</p>
            </div>
            <div className="flex-none GPT">
              <FireIcon className="h-4 w-4" />
              <p>GPT-4</p>
              <LockClosedIcon className="h-4 w-4" />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center px-2 text-white mt-24">
            <h1 className="text-3xl font-bold mb-20">ChatGPT</h1>

            <div className="flex space-x-2 text-center">
              <div>
                <div className="flex flex-col items-center justify-center mb-5">
                  <SunIcon className="h-5 w-5" />
                  <h2>Example</h2>
                </div>

                <div className="space-y-2">
                  <p className="infoText">
                    Explain Something to me <br />
                    ....
                  </p>
                  <p className="infoText">
                    What is the difference between a dog and a cat
                  </p>
                  <p className="infoText">
                    What is color of the sun?
                    <br />
                    ...
                  </p>
                </div>
              </div>

              <div>
                <div className="flex flex-col items-center justify-center mb-5">
                  <BoltIcon className="h-5 w-5" />
                  <h2>Capabilities</h2>
                </div>

                <div className="space-y-2">
                  <p className="infoText">
                    Remembers what user said earlier in the conversation
                  </p>
                  <p className="infoText">
                    Allows user to provide follow-up corrections
                  </p>
                  <p className="infoText">
                    Trained to decline inaappropriate requests
                  </p>
                </div>
              </div>

              <div>
                <div className="flex flex-col items-center justify-center mb-5">
                  <ExclamationTriangleIcon className="h-5 w-5" />
                  <h2>Limitations</h2>
                </div>

                <div className="space-y-2">
                  <p className="infoText">
                    May occasionally generate incorrect information
                  </p>
                  <p className="infoText">
                    May occasionally produce harmful instructions or biased
                  </p>
                  <p className="infoText">
                    Limited knowledge of world and events after 2021
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {messages?.docs.map((message) => (
        <>
          <Message key={message.id} message={message.data()} />
        </>
      ))}
    </div>
  );
}

export default Chat;
