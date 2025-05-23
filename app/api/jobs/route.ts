import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Job, { IJob } from '@/models/Job';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string) : 10;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;
    
    // Only show active jobs in the public API
    const query = { isActive: true };
    
    const skip = (page - 1) * limit;
    const total = await Job.countDocuments(query);
    const jobs = await Job.find(query)
      .sort({ postedDate: -1 })
      .skip(skip)
      .limit(limit);
    
    return NextResponse.json({
      jobs,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Check if user is authenticated as admin
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const body = await req.json();
    const newJob = new Job(body);
    const savedJob = await newJob.save();
    
    return NextResponse.json(savedJob, { status: 201 });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    );
  }
}
