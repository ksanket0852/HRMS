import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Building2, Users, TrendingUp, Award, Briefcase, MapPin, Clock } from "lucide-react";
import heroImage from "@/assets/hero-office.jpg";
import teamImage from "@/assets/team-collaboration.jpg";

const Home = () => {
  const navigate = useNavigate();

  // Mock job listings - these would come from your database
  const jobListings = [
    {
      id: 1,
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      posted: "2 days ago",
      description: "We're looking for an experienced software engineer to join our growing team.",
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "New York, NY",
      type: "Full-time",
      posted: "5 days ago",
      description: "Lead product strategy and execution for our flagship platform.",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      posted: "1 week ago",
      description: "Create intuitive and beautiful user experiences for our products.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">TalentHub</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">About</a>
            <a href="#jobs" className="text-sm font-medium hover:text-primary transition-colors">Open Positions</a>
            <Button onClick={() => navigate("/login")} variant="ghost" size="sm">
              Login
            </Button>
            <Button onClick={() => navigate("/login")} variant="hero" size="sm">
              Access Dashboard
            </Button>
          </nav>
          <Button onClick={() => navigate("/login")} variant="hero" size="sm" className="md:hidden">
            Login
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <Badge className="w-fit">Join Our Team</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Build Your Career at <span className="text-primary">TalentHub</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                We're a forward-thinking company dedicated to innovation, growth, and creating an exceptional workplace culture. Explore opportunities to make an impact.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => navigate("/register")} variant="hero" size="xl">
                  Browse Opportunities
                </Button>
                <Button onClick={() => navigate("/login")} variant="outline" size="xl">
                  Access Dashboard
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-2xl rounded-full"></div>
              <img
                src={heroImage}
                alt="Professional team collaboration in modern office"
                className="relative rounded-2xl shadow-elevated w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Join TalentHub?</h2>
            <p className="text-lg text-muted-foreground">
              We're committed to creating an environment where talent thrives and innovation flourishes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: "Collaborative Culture",
                description: "Work with talented professionals who value teamwork and mutual growth.",
              },
              {
                icon: TrendingUp,
                title: "Career Growth",
                description: "Continuous learning opportunities and clear paths for advancement.",
              },
              {
                icon: Award,
                title: "Competitive Benefits",
                description: "Comprehensive packages including health, wellness, and flexible work options.",
              },
              {
                icon: Building2,
                title: "Modern Workspace",
                description: "State-of-the-art facilities designed for productivity and comfort.",
              },
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <img
              src={teamImage}
              alt="Diverse team working on HR solutions"
              className="rounded-2xl shadow-card"
            />
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Our Mission & Values</h2>
              <p className="text-lg text-muted-foreground">
                At TalentHub, we're building more than just a company—we're creating a community of innovators, problem-solvers, and leaders.
              </p>
              <div className="space-y-4">
                {[
                  { title: "Innovation First", desc: "We embrace new ideas and cutting-edge technology" },
                  { title: "Diversity & Inclusion", desc: "We celebrate different perspectives and backgrounds" },
                  { title: "Work-Life Balance", desc: "We support healthy boundaries and flexible working" },
                ].map((value, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{value.title}</h3>
                      <p className="text-muted-foreground">{value.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section id="jobs" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-lg text-muted-foreground">
              Explore current opportunities to join our team. Register to apply.
            </p>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {jobListings.map((job) => (
              <Card key={job.id} className="border-0 shadow-card hover:shadow-elevated transition-all duration-300">
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-2">
                      <CardTitle className="text-2xl">{job.title}</CardTitle>
                      <CardDescription className="text-base">{job.description}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-sm">{job.department}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Posted {job.posted}
                    </div>
                  </div>
                  <Button onClick={() => navigate("/register")} variant="premium">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Don't see the right role? We're always looking for talented people.</p>
            <Button onClick={() => navigate("/register")} variant="outline" size="lg">
              Submit General Application
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-5 w-5 text-primary" />
                <span className="font-bold">TalentHub</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Building the future of work, one hire at a time.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#jobs" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Connect</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 TalentHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
