import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Download, Clock, CheckCircle, XCircle } from "lucide-react";

const AdminAttendancePage = () => {
  const attendance = [
    {
      id: 1,
      name: "Sarah Johnson",
      initials: "SJ",
      department: "Engineering",
      status: "Present",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      workHours: "9h 0m",
    },
    {
      id: 2,
      name: "Michael Chen",
      initials: "MC",
      department: "Design",
      status: "Present",
      checkIn: "09:15 AM",
      checkOut: "06:30 PM",
      workHours: "9h 15m",
    },
    {
      id: 3,
      name: "Emma Davis",
      initials: "ED",
      department: "HR",
      status: "Present",
      checkIn: "08:45 AM",
      checkOut: "05:45 PM",
      workHours: "9h 0m",
    },
    {
      id: 4,
      name: "James Wilson",
      initials: "JW",
      department: "Sales",
      status: "Late",
      checkIn: "10:30 AM",
      checkOut: "06:30 PM",
      workHours: "8h 0m",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      initials: "LA",
      department: "Marketing",
      status: "Absent",
      checkIn: "-",
      checkOut: "-",
      workHours: "0h 0m",
    },
  ];

  const stats = {
    present: attendance.filter((a) => a.status === "Present").length,
    late: attendance.filter((a) => a.status === "Late").length,
    absent: attendance.filter((a) => a.status === "Absent").length,
    attendanceRate: Math.round(
      ((attendance.filter((a) => a.status === "Present").length + attendance.filter((a) => a.status === "Late").length) /
        attendance.length) *
        100
    ),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Attendance Tracking</h1>
          <p className="text-muted-foreground">Monitor employee attendance and work hours</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            10/15/2025
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-6">
        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Present</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div className="text-3xl font-bold">{stats.present}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Late</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <div className="text-3xl font-bold">{stats.late}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <div className="text-3xl font-bold">{stats.absent}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.attendanceRate}%</div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle>Today's Attendance</CardTitle>
          <CardDescription>Real-time employee check-in/check-out status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attendance.map((record) => (
              <div
                key={record.id}
                className="p-4 rounded-lg border bg-card hover:shadow-card transition-all"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {record.initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{record.name}</h3>
                      <Badge
                        variant={
                          record.status === "Present"
                            ? "secondary"
                            : record.status === "Late"
                            ? "outline"
                            : "destructive"
                        }
                        className={
                          record.status === "Present"
                            ? "bg-green-500/10 text-green-500"
                            : record.status === "Late"
                            ? "bg-yellow-500/10 text-yellow-500 border-yellow-200"
                            : ""
                        }
                      >
                        {record.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{record.department}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-6 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Check In</p>
                      <p className="font-medium">{record.checkIn}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Check Out</p>
                      <p className="font-medium">{record.checkOut}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Work Hours</p>
                      <p className="font-medium">{record.workHours}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAttendancePage;
