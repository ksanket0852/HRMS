import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Building2, LogOut, Upload, Briefcase, FileText, User } from "lucide-react";

const CandidateDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">TalentHub</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">Candidate</Badge>
            <Button onClick={handleLogout} variant="ghost" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Candidate Dashboard</h1>
          <p className="text-muted-foreground">Manage your applications and profile</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">3</div>
              <p className="text-sm text-muted-foreground">Active applications</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Resume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">1</div>
              <p className="text-sm text-muted-foreground">Resume uploaded</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">85%</div>
              <p className="text-sm text-muted-foreground">Profile completion</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={() => navigate("/browse-jobs")} variant="premium" className="w-full justify-start">
                <Briefcase className="h-4 w-4 mr-2" />
                Browse Open Positions
              </Button>
              <Button onClick={() => navigate("/upload-resume")} variant="outline" className="w-full justify-start">
                <Upload className="h-4 w-4 mr-2" />
                Upload/Update Resume
              </Button>
              <Button onClick={() => navigate("/my-applications")} variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                View My Applications
              </Button>
              <Button onClick={() => navigate("/profile")} variant="outline" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
              <CardDescription>Your recent applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Senior Software Engineer", status: "Under Review", color: "bg-yellow-500" },
                  { title: "Product Manager", status: "Interview Scheduled", color: "bg-green-500" },
                  { title: "UI/UX Designer", status: "Submitted", color: "bg-blue-500" },
                ].map((app, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${app.color}`}></div>
                      <div>
                        <p className="font-medium">{app.title}</p>
                        <p className="text-sm text-muted-foreground">{app.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
