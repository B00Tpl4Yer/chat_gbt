"use client";
import { collection, orderBy, query } from "firebase/firestore";
import NewChat from "./NewChat";

import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "@/components/ModelSelection";
import CloseSidebar from "./CloseSidebar";
import { useState } from "react";
import {
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";

function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );
  // Fungsi untuk membuka sidebar
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  console.log(chats);
  return (
    <div
      className={`p-2 flex flex-col h-screen ${isSidebarOpen ? "" : "hidden"}`}
    >
      <div className="flex-1">
        <div>
          <div className="flex">
            <div className="flex-1 pr-2">
              {/* NewChat */}
              <NewChat />
            </div>
            <div className="flex-none">
              {/* NewChat */}
              <CloseSidebar onClick={() => setIsSidebarOpen(false)} />
            </div>
          </div>

          {/* ModelSelection */}
          <div className="hidden sm:inline">
            <ModelSelection />
          </div>

          {/* Map Through The ChatRows */}
          <div className="flex flex-col space-y-2 my-2">
            {loading && (
              <div className="animate-pulse text-center text-white">
                <p>Loading Chats...</p>
              </div>
            )}
            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>
      {session && (
        <div className="flex items-center">
          <img
            onClick={() => signOut()}
            src={session.user?.image!}
            alt="Profile pic"
            className="h-8 w-8 cursor-pointer mb-2 hover:opacity-50"
          />
          <p className="cursor-pointer pl-2 mb-2 hover:opacity-50 text-white">
            {session.user?.name}
          </p>
          <div className="pl-6">
            <EllipsisHorizontalIcon className="h-5 w-5 cursor-pointer mb-2 hover:opacity-50 text-white" />
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBar;
