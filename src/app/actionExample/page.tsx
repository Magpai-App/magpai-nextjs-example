'use client'
import { FormEvent, useState, useTransition } from "react";
import { RunMagpai } from "./action";
import Link from "next/link";

export default function Page() {
    const [isPending, startTransition] = useTransition();
    const [response, setResponse] = useState<string>("");

    return (<div className="p-8 flex flex-col gap-4 w-1/2 mx-auto">
        <Link href="/">Home</Link>
        <div className="font-bold text-xl">Magpai x NextJS Server Actions</div>

        <form className="flex flex-col gap-4" onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            startTransition(async () => {
                const prompt = (e.target as any).prompt.value;
                const response = await RunMagpai(prompt);
                console.log(response);
                setResponse(response);

            });
        }}>
            <input className="border border-gray-400 rounded p-2" id="prompt" name="prompt" defaultValue={"Magpai"} />

            <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
        </form>

        <div>Status: {isPending ? "Pending" : "Done"}</div>

        {/* @ts-ignore */}
        {response && <img className="w-96 mx-auto shadow-xl" src={response?.outputs?.output?.value} alt="output image" />}
        {response && <div>
            <div>Output:</div>
            <div className="border p-4 rounded bg-gray-50"><code className="whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</code></div>
        </div>}

    </div>)
}