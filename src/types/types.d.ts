import { Application, User } from ".prisma/client";
import { Like } from "@prisma/client";
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
  remainingCount: number;
};

export type DashBoardRecruits = {
  id: string;
  title: string;
  // content: string;
  creator: {
    id: string;
    // name: string;
    // image: string;
  };
  likes: Like[];
  applications: {
    user: {
      id: string;
      name: string;
	  image: string;
    };
  }[];
  createdAt: string;
  updatedAt: string;
  // applicantId: string;
  isPublished: boolean;
};
