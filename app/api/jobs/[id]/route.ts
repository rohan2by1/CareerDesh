import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Job from '@/models/Job';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    
    const job = await Job.findById(params.id);
    
    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
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
    const updatedJob = await Job.findByIdAndUpdate(params.id, body, { new: true });
    
    if (!updatedJob) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json(
      { error: 'Failed to update job' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: any }) {
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
    
    // Await params to get id
    const { id } = await params;
    const deletedJob = await Job.findByIdAndDelete(id);
    
    if (!deletedJob) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json(
      { error: 'Failed to delete job' },
      { status: 500 }
    );
  }
}
