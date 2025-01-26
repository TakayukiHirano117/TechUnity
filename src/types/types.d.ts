import { Application, Hire, Like } from ".prisma/client";
import { ReactNode } from "react";

export type MainButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?:
    | "outline"
    | "link"
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export type SearchIconProps = {
  className?: string;
};

export type AvatarIconProps = {
  className?: string;
  ImageSrc: string;
  fallbackText: string;
};

export type MainDialogProps = {
  title?: string;
  description?: string;
  trigger: ReactNode;
  children: ReactNode;
  onOpenChange?(open: boolean): void;
  isOpen?: boolean;
};

export type RecruitCardProps = {
  id: number;
  title: string;
  description: string;
  authorId: string;
  authorName: string;
  avatarImageSrc: string;
  publishedAt: string;
  likes: Like[];
  applications: Application[];
  hires: Hire[];
  // remainingCount: number;
};

export type DashBoardRecruit = {
  id: string;
  title: string;
  creator: {
    id: string;
    name: string;
    image: string;
  };
  likes: Like[];
  applications: {
    user: {
      id: string;
      name: string;
      image: string;
    };
  }[];
  hires: Hire[];
  createdAt: string;
  updatedAt: string;
  // applicantId: string;
  isPublished: boolean;
  hires: Hire[];
  isHired: boolean;
  repositoryUrl: string;
};

export type ProfilesRecruitListProps = {
  recruits: {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    isPublished: boolean;
    likes: Like[];
    applications: Application[];
    hires: Hire[];
  }[];
};

export type UserProfileHeaderProps = {
  profile: {
    id: string;
    name: string;
    githubUrl: string;
    description: string;
    email: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  };
  className?: string;
};
