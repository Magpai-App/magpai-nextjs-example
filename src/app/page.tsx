'use client';

import { useCallback, useState, useTransition } from "react";

export default function Home() {
  const [inputPrompt, setInputPrompt] = useState<string>("Magpai");
  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<string>("");

  const callApi = useCallback(async () => {
    startTransition(async () => {
      await fetch(`${window.location.href}api/magpai`, {
        method: "POST",
        body: JSON.stringify({
          prompt: inputPrompt,
        }),
      }).then(x => x.json()).then(x => {
        console.log(x);
        setResponse(x.data);
      });
    });
  }, [inputPrompt, startTransition]);

  return (
    <div className="p-8 flex flex-col gap-4 w-1/2 mx-auto">
      <div className="font-bold text-xl">Magpai x NextJS</div>
      <div>A very simple nextjs example of how to communicate with the Magpai API.</div>
      <div>Currently, the Magpai API doesnt communicate back status updates, however we are working on a streaming API to make this easier.</div>
      <div>The Magpai communication is done via a NextJS API to ensure your Magpai key is kept private and not sent to client applications.</div>
      <div>Note: Ensure that you have set your Magpai API key in the <code>.env</code> file of this nextjs project.</div>

      <input className="border border-gray-400 rounded p-2" value={inputPrompt} onChange={(e) => setInputPrompt(e.target.value)} />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={callApi}>Run /api/magpai</button>
      <div>Status: {isPending ? "Pending" : "Done"}</div>

      {/* @ts-ignore */}
      {response && <img className="w-96 mx-auto shadow-xl" src={response?.outputs?.output?.value} alt="output image" />}
      {response && <div>
        <div>Output:</div>
        <div className="border p-4 rounded bg-gray-50"><code className="whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</code></div>
      </div>}
    </div>
  )
}
