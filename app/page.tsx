"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { VibeType } from "../components/DropDown";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import { useChat } from "ai/react";

export default function Page() {
  const [bio, setBio] = useState("");
  const [vibe, setVibe] = useState<VibeType>("Professional");
  const [placeholder, setPlaceHolder] = useState("");
  const bioRef = useRef<null | HTMLDivElement>(null);
  const [showTextBox, setShowTextBox] = useState<boolean>(false);
  const [formDescription, setFormDescription] = useState("");
  const [formType, setFormType] = useState("");

  const scrollTobios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    let type = e.currentTarget.value;
    setFormType(type);
    if (type === "ig") {
      setFormDescription(
        "Write a short description about your post, personality, and the caption style..."
      );
      setPlaceHolder(
        "A photo of me chilling in the pool on raft, drinking a beer, big smile on my face. Make the caption funny and clever"
      );
    } else if (type === "lyrics") {
      setFormDescription(
        "Write a short description about your song, define your genre and style"
      );
      setPlaceHolder(
        "This song is about a how a breakup with a girl I truly loved. Genre is hip-hop. My style is like Drake"
      );
    } else if (type === "elevator") {
      setFormDescription(
        "Write a short description about your business, profession or idea. Include details about personality, and the style of pitch"
      );
      setPlaceHolder(
        "I am software developer trying to network with other developers to build a market place app. I'm a laid back person. The style of my pitch should be captivating"
      );
    }
    setShowTextBox(true);
  }

  const onSubmit = async (e: any) => {
    await setBio(input);
    handleSubmit(e);
  };

  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat({
      body: {
        vibe,
        bio,
        formType,
      },
      onResponse() {
        scrollTobios();
      },
    });

  const lastMessage = messages[messages.length - 1];
  const generatedbios =
    lastMessage?.role === "assistant" ? lastMessage.content : null;

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      {/* <div className="flex" onClick={() => setShowTextBox(false)}> */}
      <Header setShowTextBox={setShowTextBox} />
      {/* </div> */}
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4">
        {!showTextBox && (
          <div className="flex flex-1 w-full flex-col items-center justify-center text-center px-4">
            <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
              Use AI to help you with the following:
            </h1>

            <div className="flex mt-20">
              <div className="group rounded-lg mr-4 border-2 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30">
                <button
                  value="ig"
                  onClick={handleClick}
                  className={`mb-3 text-2xl font-semibold`}
                >
                  Instagram Caption{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </button>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  Use AI to write a great Instagram caption that captivates your
                  followers
                </p>
              </div>

              <div className="group rounded-lg mr-4 border-2 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                <button
                  value="lyrics"
                  onClick={handleClick}
                  className={`mb-3 text-2xl font-semibold`}
                >
                  Song Lyrics{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </button>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  Use AI to help clear writers block and discover great lyrics
                </p>
              </div>

              <div className="group rounded-lg border-2 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                <button
                  value="elevator"
                  onClick={handleClick}
                  className={`mb-3 text-2xl font-semibold`}
                >
                  Elevator Pitch{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </button>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  Use AI to help you craft the pefrect elevator pitch for your
                  business or brand
                </p>
              </div>
            </div>
          </div>
        )}

        {showTextBox && (
          <div>
            <form className="max-w-xl w-full" onSubmit={onSubmit}>
              <div className="flex mt-10 items-center space-x-3">
                <Image
                  src="/1-black.png"
                  width={30}
                  height={30}
                  alt="1 icon"
                  className="mb-5 sm:mb-0"
                />
                <p className="text-left font-medium">
                  {formDescription}
                  {/* <span className="text-slate-500">
                    (or write a few sentences about yourself)
                  </span> */}
                  .
                </p>
              </div>

              <textarea
                value={input}
                onChange={handleInputChange}
                rows={4}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
                placeholder={placeholder}
              />
              <div className="flex mb-5 items-center space-x-3">
                <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
                <p className="text-left font-medium">Select your vibe.</p>
              </div>
              <div className="block">
                <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
              </div>

              {!isLoading && (
                <button
                  className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                  type="submit"
                >
                  Generate &rarr;
                </button>
              )}
              {isLoading && (
                <button
                  className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                  disabled
                >
                  <span className="loading">
                    <span style={{ backgroundColor: "white" }} />
                    <span style={{ backgroundColor: "white" }} />
                    <span style={{ backgroundColor: "white" }} />
                  </span>
                </button>
              )}
            </form>
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{ duration: 2000 }}
            />
            <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
            <output className="space-y-10 my-10">
              {generatedbios && (
                <>
                  <div>
                    <h2
                      className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                      ref={bioRef}
                    >
                      AI Response
                    </h2>
                  </div>
                  <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                    <div
                      className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedbios);
                        toast("bio copied to clipboard", {
                          icon: "✂️",
                        });
                      }}
                    >
                      <p>{generatedbios}</p>
                    </div>
                  </div>
                </>
              )}
            </output>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
