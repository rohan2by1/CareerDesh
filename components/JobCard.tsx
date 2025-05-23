import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BuildingIcon, CalendarIcon, MapPinIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type JobCardProps = {
  job: {
    _id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    postedDate: string;
    salary?: string;
  };
};

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-xl">{job.title}</h3>
            <Badge variant={job.type === "Full-time" ? "default" : job.type === "Part-time" ? "secondary" : "outline"}>
              {job.type}
            </Badge>
          </div>
          <div className="flex items-center text-muted-foreground gap-2">
            <BuildingIcon className="h-4 w-4" />
            <span>{job.company}</span>
          </div>
          <div className="flex items-center text-muted-foreground gap-2">
            <MapPinIcon className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {job.salary && (
          <div className="font-medium">
            Salary: <span className="text-primary">{job.salary}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-3 border-t">
        <div className="flex items-center text-muted-foreground text-sm gap-1">
          <CalendarIcon className="h-3 w-3" />
          <time>{formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}</time>
        </div>
        <Button asChild>
          <Link href={`/jobs/${job._id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
