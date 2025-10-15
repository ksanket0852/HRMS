import { ReactNode } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Calendar,
  Clock,
  Settings,
  LogOut,
  Building2,
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  role: "admin" | "hr" | "employee";
  userEmail?: string;
}

const DashboardLayout = ({ children, role, userEmail = "user@company.com" }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/");
  };

  const getRoleLabel = () => {
    switch (role) {
      case "admin":
        return "Administrator";
      case "hr":
        return "HR Manager";
      case "employee":
        return "Employee";
      default:
        return "User";
    }
  };

  const getRoleBadgeColor = () => {
    switch (role) {
      case "admin":
        return "bg-red-500";
      case "hr":
        return "bg-purple-500";
      case "employee":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getBaseRoute = () => {
    switch (role) {
      case "admin":
        return "/admin";
      case "hr":
        return "/hr";
      case "employee":
        return "/employee";
      default:
        return "/";
    }
  };

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, path: `${getBaseRoute()}/dashboard` },
    ...(role === "admin" || role === "hr"
      ? [
          { title: "Employees", icon: Users, path: `${getBaseRoute()}/employees` },
          { title: "Jobs", icon: Briefcase, path: `${getBaseRoute()}/jobs` },
          { title: "Resumes", icon: FileText, path: `${getBaseRoute()}/resumes` },
        ]
      : []),
    { title: "Leave", icon: Calendar, path: `${getBaseRoute()}/leave` },
    { title: "Attendance", icon: Clock, path: `${getBaseRoute()}/attendance` },
    { title: "Settings", icon: Settings, path: `${getBaseRoute()}/settings` },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r">
          <div className="p-4 border-b flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">TalentHub</span>
          </div>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                        <NavLink to={item.path}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t p-4">
            <div className="flex items-center gap-3 mb-3">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {userEmail.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{getRoleLabel()}</p>
                <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" className="w-full" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen">
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="h-16 px-4 flex items-center gap-4">
              <SidebarTrigger />
              <div className="flex-1" />
              <Badge className={getRoleBadgeColor()}>{getRoleLabel()}</Badge>
            </div>
          </header>

          <main className="flex-1 bg-muted/30">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
