import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    const res = await request.json()

    const { prompt } = res;

    const WorkflowID = "gKT7k6zt666F4oucrwXk"; // Replace this with your Workflow ID
    const API_KEY = process.env.MAGPAI_API_KEY;
    const magpaiResponse = await fetch("https://magpai.app/api/v1/workflow/run", {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${API_KEY}`
        },
        body: JSON.stringify({
            workflowId: WorkflowID,
            inputs: {
                "Prompt": prompt || "Magpai"
            }
        })

    })

    if (!magpaiResponse.ok) {
        const message = await magpaiResponse.text();
        console.log(message);
    }

    const data = await magpaiResponse.json();

    console.log(data);

    return NextResponse.json({ message: "Hello World", data: data });
}