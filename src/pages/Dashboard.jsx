import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectFilters } from '@/components/ProjectFilters';
import { StatsCard } from '@/components/StatsCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TechBadge } from '@/components/TechBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockProjects, mockCohorts, techStackOptions } from '@/data/mockData';
import { FolderKanban, Users, GitBranch, Plus, Github, ExternalLink, Calendar, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [filters, setFilters] = useState({ cohort: '', techStack: '', search: '' });
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    githubUrl: '',
    techStack: [],
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      const matchesCohort = !filters.cohort || project.cohort === filters.cohort;
      const matchesTech = !filters.techStack || project.techStack.includes(filters.techStack);
      const matchesSearch = !filters.search || 
        project.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.description.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesCohort && matchesTech && matchesSearch;
    });
  }, [filters]);

  const stats = useMemo(() => ({
    totalProjects: mockProjects.length,
    totalCohorts: mockCohorts.length,
    totalStudents: new Set(mockProjects.flatMap(p => p.members.map(m => m.id))).size,
  }), []);

  const toggleTechStack = (tech) => {
    setNewProject(prev => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter(t => t !== tech)
        : [...prev.techStack, tech]
    }));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        isAuthenticated 
        user={user} 
        onLogout={handleLogout}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-muted-foreground mt-1">
              Discover and explore projects from all cohorts
            </p>
          </div>
          <Button onClick={() => setShowAddProject(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatsCard
            title="Total Projects"
            value={stats.totalProjects}
            icon={FolderKanban}
          />
          <StatsCard
            title="Active Cohorts"
            value={stats.totalCohorts}
            icon={GitBranch}
          />
          <StatsCard
            title="Contributors"
            value={stats.totalStudents}
            icon={Users}
          />
        </div>

        {/* Filters */}
        <ProjectFilters filters={filters} onFilterChange={setFilters} />

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ProjectCard 
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FolderKanban className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search query
            </p>
            <Button variant="outline" onClick={() => setFilters({ cohort: '', techStack: '', search: '' })}>
              Clear Filters
            </Button>
          </div>
        )}
      </main>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-2xl">{selectedProject.name}</DialogTitle>
                    <DialogDescription className="mt-1">
                      {selectedProject.cohort}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-6 mt-4">
                <div>
                  <h4 className="text-sm font-medium mb-2 text-muted-foreground">Description</h4>
                  <p className="text-foreground">{selectedProject.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2 text-muted-foreground">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <TechBadge key={tech} tech={tech} size="md" />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3 text-muted-foreground">Team Members</h4>
                  <div className="space-y-3">
                    {selectedProject.members.map((member, idx) => (
                      <div key={member.id} className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {idx === 0 ? 'Project Owner' : 'Team Member'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Updated {formatDistanceToNow(new Date(selectedProject.updatedAt), { addSuffix: true })}
                  </span>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <Button asChild className="flex-1">
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      View on GitHub
                    </a>
                  </Button>
                  {selectedProject.liveUrl && (
                    <Button variant="outline" asChild className="flex-1">
                      <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Project Modal */}
      <Dialog open={showAddProject} onOpenChange={setShowAddProject}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>
              Share your project with the community
            </DialogDescription>
          </DialogHeader>
          
          <form className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                placeholder="My Awesome Project"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what your project does..."
                rows={3}
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input
                id="githubUrl"
                placeholder="https://github.com/username/repo"
                value={newProject.githubUrl}
                onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Tech Stack</Label>
              <div className="flex flex-wrap gap-2">
                {techStackOptions.map((tech) => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => toggleTechStack(tech)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-colors ${
                      newProject.techStack.includes(tech)
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background border-border hover:border-primary/50'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setShowAddProject(false)}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Add Project
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
