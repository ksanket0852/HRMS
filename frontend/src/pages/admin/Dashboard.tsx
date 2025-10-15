import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Activity, Star, DollarSign, TrendingUp, AlertCircle, Calendar } from "lucide-react";

const AdminDashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your organization today.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold">1,234</div>
              <Badge variant="secondary" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12%
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">from last month</p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">987</div>
            <p className="text-xs text-muted-foreground">80% attendance rate</p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold">4.8/5</div>
              <Badge variant="secondary" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                +0.3
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">from last quarter</p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Payroll</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">$2.4M</div>
            <p className="text-xs text-muted-foreground">Processing this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle>Recent Hires</CardTitle>
            <CardDescription>New employees who joined recently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Sarah Johnson", role: "Software Engineer", time: "2 days ago", initials: "SJ" },
                { name: "Michael Chen", role: "Product Designer", time: "5 days ago", initials: "MC" },
                { name: "Emma Davis", role: "HR Manager", time: "1 week ago", initials: "ED" },
              ].map((hire, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">{hire.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{hire.name}</p>
                    <p className="text-xs text-muted-foreground">{hire.role}</p>
                  </div>
                  <p className="text-xs text-muted-foreground whitespace-nowrap">{hire.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Items requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: "Leave Request", count: 12, urgent: true, icon: Calendar },
                { type: "Expense Claims", count: 8, urgent: false, icon: DollarSign },
                { type: "Job Applications", count: 24, urgent: true, icon: Users },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:shadow-card transition-all"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">{item.type}</p>
                      {item.urgent && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Urgent
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Badge variant="secondary">{item.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Scheduled activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Team Building", date: "Tomorrow, 2:00 PM", color: "bg-blue-500" },
                { title: "Performance Review", date: "Jan 15, 10:00 AM", color: "bg-purple-500" },
                { title: "Annual Meeting", date: "Jan 20, 9:00 AM", color: "bg-green-500" },
              ].map((event, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`h-2 w-2 rounded-full ${event.color} mt-2`}></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
