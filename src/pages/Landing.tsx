import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { TechBadge } from '@/components/TechBadge';
import { FolderKanban, Users, GitBranch, Search, ArrowRight, Github, Code2, Layers } from 'lucide-react';
import { mockProjects } from '@/data/mockData';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="gradient-hero">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>
          
          <div className="container mx-auto px-4 py-24 sm:py-32 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground/90 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
                <FolderKanban className="h-4 w-4" />
                Moringa School Project Repository
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-slide-up">
                Your Projects,{' '}
                <span className="relative">
                  <span className="text-accent">Preserved</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                    <path d="M2 6C50 2 150 2 198 6" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span>
                {' '}Forever
              </h1>
              
              <p className="text-lg sm:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
                A centralized hub for all Moringa School projects. Discover, collaborate, and build on the work of past cohorts.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <Link to="/register">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto group">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                    Browse Projects
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Separator */}
        <div className="relative h-16 bg-background">
          <svg className="absolute -top-16 left-0 w-full h-16 text-background" viewBox="0 0 1440 64" fill="currentColor" preserveAspectRatio="none">
            <path d="M0,64L80,58.7C160,53,320,43,480,42.7C640,43,800,53,960,53.3C1120,53,1280,43,1360,37.3L1440,32L1440,64L1360,64C1280,64,1120,64,960,64C800,64,640,64,480,64C320,64,160,64,80,64L0,64Z" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete solution for tracking, discovering, and collaborating on student projects.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-elevated p-8 text-center group hover:border-primary/30">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Search className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Discover Projects</h3>
              <p className="text-muted-foreground">
                Browse through projects by cohort, tech stack, or search for specific keywords. Find inspiration for your next build.
              </p>
            </div>

            <div className="card-elevated p-8 text-center group hover:border-primary/30">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect & Collaborate</h3>
              <p className="text-muted-foreground">
                Reach out to project owners, form teams, and collaborate on exciting new ideas with fellow students.
              </p>
            </div>

            <div className="card-elevated p-8 text-center group hover:border-primary/30">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <GitBranch className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Track History</h3>
              <p className="text-muted-foreground">
                Every project tells a story. Preserve your work for future cohorts to learn from and build upon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
              <p className="text-muted-foreground">Explore some of the best projects from our students</p>
            </div>
            <Link to="/login">
              <Button variant="outline">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProjects.slice(0, 3).map((project, index) => (
              <div 
                key={project.id} 
                className="card-interactive p-6 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Code2 className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                    {project.cohort}
                  </span>
                </div>
                
                <h3 className="font-semibold text-lg mb-2">{project.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <TechBadge key={tech} tech={tech} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-primary mb-2">150+</p>
              <p className="text-muted-foreground font-medium">Projects</p>
            </div>
            <div className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-primary mb-2">25+</p>
              <p className="text-muted-foreground font-medium">Cohorts</p>
            </div>
            <div className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-primary mb-2">500+</p>
              <p className="text-muted-foreground font-medium">Students</p>
            </div>
            <div className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-primary mb-2">10+</p>
              <p className="text-muted-foreground font-medium">Tech Stacks</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Showcase Your Work?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join the community and start building your project portfolio today.
          </p>
          <Link to="/register">
            <Button variant="hero" size="xl">
              Create Your Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <FolderKanban className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">ProjectBank</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Moringa School. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
