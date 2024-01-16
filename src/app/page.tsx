'use client';

import Link from "next/link";
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

            <div className="flex flex-row gap-5 w-full">
                <Link className="w-full text-center bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" href="/routeExample">Connect to Magpai via a NextJS API</Link>
                <Link className="w-full text-center bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" href="/actionExample">Connect to Magpai via Server Actions</Link>
            </div>

        </div>
    )
}
