import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Calendar, Check, X } from "lucide-react";

const AdminLeavePage = () => {
  const leaveRequests = [
    {
      id: 1,
      employee: "Sarah Johnson",
      initials: "SJ",
      type: "Vacation",
      startDate: "1/20/2025",
      endDate: "1/25/2025",
      duration: "5 days",
      appliedDate: "1/10/2025",
      reason: "Family vacation",
      status: "Pending",
    },
    {
      id: 2,
      employee: "Michael Chen",
      initials: "MC",
      type: "Sick Leave",
      startDate: "1/15/2025",
      endDate: "1/16/2025",
      duration: "2 days",
      appliedDate: "1/14/2025",
      reason: "Medical appointment",
      status: "Approved",
    },
    {
      id: 3,
      employee: "Emma Davis",
      initials: "ED",
      type: "Personal",
      startDate: "1/18/2025",
      endDate: "1/18/2025",
      duration: "1 day",
      appliedDate: "1/12/2025",
      reason: "Personal matter",
      status: "Pending",
    },
    {
      id: 4,
      employee: "James Wilson",
      initials: "JW",
      type: "Vacation",
      startDate: "2/1/2025",
      endDate: "2/7/2025",
      duration: "7 days",
      appliedDate: "1/8/2025",
      reason: "Planned trip",
      status: "Approved",
    },
    {
      id: 5,
      employee: "Lisa Anderson",
      initials: "LA",
      type: "Sick Leave",
      startDate: "1/12/2025",
      endDate: "1/13/2025",
      duration: "2 days",
      appliedDate: "1/11/2025",
      reason: "Flu",
      status: "Rejected",
    },
  ];

  const stats = {
    pending: leaveRequests.filter((r) => r.status === "Pending").length,
    approved: leaveRequests.filter((r) => r.status === "Approved").length,
    rejected: leaveRequests.filter((r) => r.status === "Rejected").length,
    totalDays: leaveRequests
      .filter((r) => r.status === "Approved")
      .reduce((sum, r) => sum + parseInt(r.duration), 0),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Leave Management</h1>
          <p className="text-muted-foreground">Manage employee leave requests and approvals</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Leave Request
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-6">
        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.approved}</div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.rejected}</div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalDays}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
          <CardDescription>Review and manage employee leave applications</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Requests</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {leaveRequests.map((request) => (
                <LeaveRequestCard key={request.id} request={request} />
              ))}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              {leaveRequests
                .filter((r) => r.status === "Pending")
                .map((request) => (
                  <LeaveRequestCard key={request.id} request={request} />
                ))}
            </TabsContent>

            <TabsContent value="approved" className="space-y-4">
              {leaveRequests
                .filter((r) => r.status === "Approved")
                .map((request) => (
                  <LeaveRequestCard key={request.id} request={request} />
                ))}
            </TabsContent>

            <TabsContent value="rejected" className="space-y-4">
              {leaveRequests
                .filter((r) => r.status === "Rejected")
                .map((request) => (
                  <LeaveRequestCard key={request.id} request={request} />
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

const LeaveRequestCard = ({ request }: { request: any }) => {
  return (
    <div className="p-4 rounded-lg border bg-card hover:shadow-card transition-all">
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {request.initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold">{request.employee}</h3>
            <Badge
              variant={
                request.status === "Pending"
                  ? "outline"
                  : request.status === "Approved"
                  ? "secondary"
                  : "destructive"
              }
              className={
                request.status === "Approved"
                  ? "bg-green-500/10 text-green-500"
                  : request.status === "Rejected"
                  ? ""
                  : ""
              }
            >
              {request.status}
            </Badge>
          </div>

          <p className="font-medium text-sm mb-3">{request.type}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground text-xs mb-1">Start Date</p>
              <p className="font-medium">{request.startDate}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">End Date</p>
              <p className="font-medium">{request.endDate}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">Duration</p>
              <p className="font-medium">{request.duration}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">Applied</p>
              <p className="font-medium">{request.appliedDate}</p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t">
            <p className="text-muted-foreground text-xs mb-1">Reason</p>
            <p className="text-sm">{request.reason}</p>
          </div>
        </div>

        {request.status === "Pending" && (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="gap-1 text-green-600 border-green-200">
              <Check className="h-4 w-4" />
              Approve
            </Button>
            <Button size="sm" variant="outline" className="gap-1 text-red-600 border-red-200">
              <X className="h-4 w-4" />
              Reject
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLeavePage;
