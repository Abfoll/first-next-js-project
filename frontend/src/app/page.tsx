'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { fetchProjects } from '@/store/slices/projectSlice';
import Link from 'next/link';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { projects, isLoading } = useAppSelector((state) => state.projects);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProjects(true)); // Fetch featured projects
  }, [dispatch]);

  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Welcome to My{' '}
          <span className="text-primary">Portfolio</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A modern full-stack application built with Next.js, Node.js, and Shadcn UI
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/projects">
              View Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">Contact Me</Link>
          </Button>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
          <p className="text-muted-foreground mt-2">
            Check out some of my recent work
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg" />
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-5/6" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            featuredProjects.map((project) => (
              <Card key={project._id} className="overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-48 w-full object-cover"
                />
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>
                    {project.technologies.slice(0, 3).join(' • ')}
                    {project.technologies.length > 3 && ' • ...'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex space-x-2">
                    {project.githubUrl && (
                      <Button variant="ghost" size="icon" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button variant="ghost" size="icon" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/projects/${project._id}`}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>

        <div className="text-center">
          <Button variant="outline" asChild>
            <Link href="/projects">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-muted/50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Tech Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Next.js', description: 'React Framework' },
            { name: 'Node.js', description: 'JavaScript Runtime' },
            { name: 'Express', description: 'Web Framework' },
            { name: 'MongoDB', description: 'Database' },
            { name: 'Redux', description: 'State Management' },
            { name: 'Tailwind', description: 'CSS Framework' },
            { name: 'Shadcn UI', description: 'Component Library' },
            { name: 'TypeScript', description: 'Type Safety' },
          ].map((tech) => (
            <Card key={tech.name} className="text-center">
              <CardHeader>
                <CardTitle className="text-lg">{tech.name}</CardTitle>
                <CardDescription>{tech.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* About Section */}
      {user && (
        <section className="text-center space-y-4">
          <div className="mx-auto h-24 w-24 overflow-hidden rounded-full bg-muted">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name ? `${user.name} avatar` : 'User avatar'}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-muted-foreground">
                {user.name?.charAt(0) ?? 'U'}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold">Welcome back, {user.name}!</h2>
            <p className="text-muted-foreground mt-2">{user.email}</p>
          </div>
          <Button asChild>
            <Link href="/profile">View Profile</Link>
          </Button>
        </section>
      )}
    </div>
  );
}