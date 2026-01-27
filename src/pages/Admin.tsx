import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { StatsCard } from '@/components/StatsCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TechBadge } from '@/components/TechBadge';
import { mockProjects, mockCohorts, mockUsers } from '@/data/mockData';
import { User, Cohort, Project } from '@/types';
import { 
  FolderKanban, Users, GraduationCap, Plus, Pencil, Trash2, 
  MoreHorizontal, Calendar, Search, BarChart3
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';

export default function Admin() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [showAddCohort, setShowAddCohort] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newCohort, setNewCohort] = useState({
    name: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      if (parsed.role !== 'admin') {
        navigate('/dashboard');
        return;
      }
      setUser(parsed);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const filteredProjects = mockProjects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.owner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStudents = mockUsers.filter(u => 
    u.role === 'student' && (
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage cohorts, students, and projects
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Projects"
            value={mockProjects.length}
            icon={FolderKanban}
            trend={{ value: 12, positive: true }}
          />
          <StatsCard
            title="Active Cohorts"
            value={mockCohorts.length}
            icon={GraduationCap}
          />
          <StatsCard
            title="Total Students"
            value={mockUsers.filter(u => u.role === 'student').length}
            icon={Users}
            trend={{ value: 8, positive: true }}
          />
          <StatsCard
            title="This Month"
            value={3}
            icon={BarChart3}
            trend={{ value: 50, positive: true }}
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="cohorts" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="cohorts">Cohorts</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>

          {/* Cohorts Tab */}
          <TabsContent value="cohorts" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Cohorts</h2>
              <Button onClick={() => setShowAddCohort(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Cohort
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockCohorts.map((cohort) => (
                <Card key={cohort.id} className="card-elevated">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{cohort.name}</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover border border-border">
                          <DropdownMenuItem>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(cohort.startDate), 'MMM yyyy')} - {format(new Date(cohort.endDate), 'MMM yyyy')}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{cohort.studentsCount}</span>
                          <span className="text-sm text-muted-foreground">students</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FolderKanban className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{cohort.projectsCount}</span>
                          <span className="text-sm text-muted-foreground">projects</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">All Projects</h2>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Card className="card-elevated overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead className="hidden md:table-cell">Owner</TableHead>
                    <TableHead className="hidden sm:table-cell">Cohort</TableHead>
                    <TableHead className="hidden lg:table-cell">Tech Stack</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{project.name}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1 md:hidden">
                            {project.owner.name}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{project.owner.name}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="secondary">{project.cohort}</Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex gap-1">
                          {project.techStack.slice(0, 2).map((tech) => (
                            <TechBadge key={tech} tech={tech} />
                          ))}
                          {project.techStack.length > 2 && (
                            <span className="text-xs text-muted-foreground">
                              +{project.techStack.length - 2}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover border border-border">
                            <DropdownMenuItem>
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">Students</h2>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Card className="card-elevated overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Email</TableHead>
                    <TableHead>Cohort</TableHead>
                    <TableHead className="hidden md:table-cell">Projects</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => {
                    const projectCount = mockProjects.filter(p => 
                      p.members.some(m => m.id === student.id)
                    ).length;
                    
                    return (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img 
                              src={student.avatar} 
                              alt={student.name}
                              className="h-8 w-8 rounded-full bg-muted"
                            />
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-muted-foreground">
                          {student.email}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{student.cohort}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {projectCount}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-popover border border-border">
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>View Projects</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Add Cohort Modal */}
      <Dialog open={showAddCohort} onOpenChange={setShowAddCohort}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Cohort</DialogTitle>
            <DialogDescription>
              Create a new cohort for students
            </DialogDescription>
          </DialogHeader>
          
          <form className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="cohortName">Cohort Name</Label>
              <Input
                id="cohortName"
                placeholder="MC-46"
                value={newCohort.name}
                onChange={(e) => setNewCohort({ ...newCohort, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newCohort.startDate}
                  onChange={(e) => setNewCohort({ ...newCohort, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newCohort.endDate}
                  onChange={(e) => setNewCohort({ ...newCohort, endDate: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setShowAddCohort(false)}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Create Cohort
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
