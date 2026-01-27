import { Project } from '@/types';
import { TechBadge } from './TechBadge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Users, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <Card 
      className="card-interactive group overflow-hidden"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors truncate">
              {project.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {project.cohort}
            </p>
          </div>
          <div className="flex -space-x-2">
            {project.members.slice(0, 3).map((member, index) => (
              <Avatar key={member.id} className="h-8 w-8 border-2 border-card">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            ))}
            {project.members.length > 3 && (
              <div className="h-8 w-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs font-medium text-muted-foreground">
                +{project.members.length - 3}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
          {project.techStack.length > 4 && (
            <span className="text-xs text-muted-foreground px-2 py-0.5">
              +{project.techStack.length - 4} more
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {project.members.length}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true })}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.githubUrl, '_blank');
            }}
          >
            <Github className="h-4 w-4" />
          </Button>
          {project.liveUrl && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.liveUrl, '_blank');
              }}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
