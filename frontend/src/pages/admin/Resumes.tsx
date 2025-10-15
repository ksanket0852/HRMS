import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Upload, Search, FileText, Eye, Download, Calendar } from "lucide-react";

const AdminResumesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const resumes = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      position: "Senior Software Engineer",
      matchScore: 92,
      status: "Screened",
      skills: ["React", "TypeScript", "Node.js"],
      experience: "8 years",
      uploaded: "1/10/2025",
      initials: "JS",
    },
    {
      id: 2,
      name: "Alice Johnson",
      email: "alice.j@email.com",
      position: "Product Manager",
      matchScore: null,
      status: "Pending",
      skills: ["Agile", "Product Strategy", "Analytics"],
      experience: "6 years",
      uploaded: "1/9/2025",
      initials: "AJ",
    },
    {
      id: 3,
      name: "Robert Chen",
      email: "robert.c@email.com",
      position: "UX Designer",
      matchScore: 85,
      status: "Screened",
      skills: ["Figma", "User Research", "Prototyping"],
      experience: "5 years",
      uploaded: "1/8/2025",
      initials: "RC",
    },
    {
      id: 4,
      name: "Maria Garcia",
      email: "maria.g@email.com",
      position: "Data Scientist",
      matchScore: 88,
      status: "Screened",
      skills: ["Python", "Machine Learning", "SQL"],
      experience: "7 years",
      uploaded: "1/7/2025",
      initials: "MG",
    },
    {
      id: 5,
      name: "David Lee",
      email: "david.l@email.com",
      position: "Marketing Manager",
      matchScore: null,
      status: "Pending",
      skills: ["Digital Marketing", "SEO", "Content Strategy"],
      experience: "4 years",
      uploaded: "1/6/2025",
      initials: "DL",
    },
  ];

  const filteredResumes = resumes.filter((resume) =>
    resume.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resume.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: resumes.length,
    screened: resumes.filter((r) => r.status === "Screened").length,
    pending: resumes.filter((r) => r.status === "Pending").length,
    avgMatch: Math.round(
      resumes.filter((r) => r.matchScore).reduce((sum, r) => sum + (r.matchScore || 0), 0) /
        resumes.filter((r) => r.matchScore).length
    ),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Resumes</h1>
          <p className="text-muted-foreground">AI-powered resume analysis and candidate screening</p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Resume
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-6">
        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Resumes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Screened</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.screened}</div>
          </CardContent>
        </Card>

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
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Match Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.avgMatch}%</div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle>Resume Screening</CardTitle>
          <CardDescription>Review and analyze candidate resumes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by candidate name or position..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredResumes.map((resume) => (
              <div
                key={resume.id}
                className="p-4 rounded-lg border bg-card hover:shadow-card transition-all"
              >
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {resume.initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{resume.name}</h3>
                      {resume.status === "Screened" ? (
                        <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                          {resume.status}
                        </Badge>
                      ) : (
                        <Badge variant="outline">{resume.status}</Badge>
                      )}
                      {resume.matchScore && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {resume.matchScore}% Match
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm font-medium mb-2">{resume.position}</p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {resume.skills.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Experience: {resume.experience}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Uploaded: {resume.uploaded}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye className="h-3 w-3" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Download className="h-3 w-3" />
                      Download
                    </Button>
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

export default AdminResumesPage;
