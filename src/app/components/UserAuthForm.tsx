"use client";

import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Button, buttonVariants } from "./ui/Button";
import { Icons } from "./Icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      // TODO: toast notification
      toast({
        title: "There was a problem",
        description: "There was an error logging in. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-3 justify-center", className)}
      {...props}
    >
      <Link className={buttonVariants()} href="/api/auth/signin">
        Create Account
      </Link>
      <Button
        onClick={loginWithGoogle}
        isLoading={isLoading}
        size="sm"
        className="w-full"
      >
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
