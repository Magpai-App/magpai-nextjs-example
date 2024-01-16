import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    const res = await request.json()

    const { jobId, outputs } = res;

    console.log(jobId, outputs);

    return NextResponse.json({ message: "Success" });
}