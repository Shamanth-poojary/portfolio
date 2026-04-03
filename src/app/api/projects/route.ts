import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import Project from "@/models/Project";

export const dynamic = 'force-dynamic';

// READ: Fetch all projects
export async function GET() {
  try {
    await connectToDB();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json(projects, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// CREATE: Add a new project
export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    
    // Basic validation
    if (!body.name || !body.desc) {
      return NextResponse.json({ error: "Name and Description are required" }, { status: 400 });
    }

    const newProject = await Project.create(body);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
