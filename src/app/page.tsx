"use client"

import axios from "axios";
import { error } from "console";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { text } from "node:stream/consumers";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { headers } from "next/headers";
 

export default function Home() {


  // writing web socket here
  //const socket = new WebSocket("ws://localhost:3000");

  // Connection opened
  // socket.addEventListener("open", (event) => {
  //   socket.send("Hello Server changing message!");
  // });

  // // Listen for messages
  // socket.addEventListener("message", (event) => {
  //   console.log("Message from server ", event.data);
  // });

  


  const [textAreaValue, setTextAreaValue] = useState(""); 
  let chatHistory = [" "]; 
  const [username, setUsername] = useState("Anonymous"); 
  const [messages, setMessages] = useState([""]); 
  const [messageHistory, setMessageHistory] = useState([""]);
  const [tags, setTags] = useState(["hello "]);

  // useEffect(()=> {
  //     axios.get('/api')
  //     .then((response) => {
  //       setMessages(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error); 
  //     })
  // }, []);
  // console.log(messages); 
  

  const [wsMessage, setWsMessage] = useState(""); 

  const [ws, setWs] = useState<WebSocket|null>(null);
  useEffect(() => {
    const socket = new WebSocket('wss://websockets-u5yi.onrender.com/api/ws');

    socket.onopen = (event) => {
        setWs(socket); 
        socket.addEventListener("message", (event) => {
            setTags((prevMessages) => ([...prevMessages, event.data])); 
            console.log("msg server - ", event.data); 
        });

        console.log("connected", event);
    } 
    
    ws?.close(1000, "Closing webSocket"); 

  },[]);

  useEffect(()=> {
    ws?.send("part5"); 
  },[]); 


  function sendMessage() {
    console.log("sending messages - ", textAreaValue); 
    // const messageBlock = textAreaValue;
    if(textAreaValue !== "")
      ws?.send(username + " - "+textAreaValue); 
    //setUsername("Anonymous"); 
    setTextAreaValue(""); 
  }

  console.log(tags); 

  return (
    
    <div >
       <div className="flex justify-center items-center gap-3">

          <div>
            ZenChat
          </div>
           
          <div>
            <Button> Save Chat </Button>
          </div>
        </div>

        <div>
        <ScrollArea className="h-72 w-50 rounded-md border">
          <div className="p-6">
            <h4 className="mb-4 text-sm font-bold leading-none text-blue-500">Chat History</h4>
            {tags.map((tag) => (
              <>
                <div key={Math.random()} className="text-sm"> 
                   {tag}
                </div>
                <Separator className="my-2" />
              </>
            ))}
          </div>
        </ScrollArea>
        </div>

        <div className="flex justify-center items-center">
            <div className="grid w-full gap-2">
              <Textarea placeholder="Type your message here."
              value={textAreaValue} 
              onChange={(event) => (setTextAreaValue(event.target.value))}/>

              <button onClick={sendMessage}>
                <Button >Send message</Button>
              </button>
            </div>
        </div>

        <div className="grid w-40 gap-1.5">
          Enter username 
          <Textarea placeholder="Enter your Username"
            value = {username} 
            onChange={(event) => (setUsername(event.target.value))}/>
        </div>
    </div>
  );
}
