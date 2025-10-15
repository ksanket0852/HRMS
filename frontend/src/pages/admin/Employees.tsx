import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Search, MoreVertical, Mail, Phone } from "lucide-react";

const AdminEmployeesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const employees = [
    { id: 1, name: "Sarah Johnson", email: "sarah.j@company.com", phone: "+1 234-567-8901", department: "Engineering", position: "Senior Software Engineer", status: "Active", initials: "SJ" },
    { id: 2, name: "Michael Chen", email: "michael.c@company.com", phone: "+1 234-567-8902", department: "Design", position: "Product Designer", status: "Active", initials: "MC" },
    { id: 3, name: "Emma Davis", email: "emma.d@company.com", phone: "+1 234-567-8903", department: "HR", position: "HR Manager", status: "Active", initials: "ED" },
    { id: 4, name: "James Wilson", email: "james.w@company.com", phone: "+1 234-567-8904", department: "Sales", position: "Sales Manager", status: "Active", initials: "JW" },
    { id: 5, name: "Lisa Anderson", email: "lisa.a@company.com", phone: "+1 234-567-8905", department: "Marketing", position: "Marketing Lead", status: "On Leave", initials: "LA" },
  ];

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Employees</h1>
          <p className="text-muted-foreground">Manage your organization's employees</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <Card className="shadow-card border-0 mb-6">
        <CardHeader>
          <CardTitle>All Employees</CardTitle>
          <CardDescription>
            {filteredEmployees.length} total employees
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, department, or position..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:shadow-card transition-all"
              >
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {employee.initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold truncate">{employee.name}</h3>
                    <Badge variant={employee.status === "Active" ? "secondary" : "outline"}>
                      {employee.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{employee.position}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {employee.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {employee.phone}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline">{employee.department}</Badge>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminEmployeesPage;
