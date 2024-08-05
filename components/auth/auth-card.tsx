import React from 'react';
import Socials from "./socials";
import { BackButton } from "./back-button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

type CardWrapperProps = {
  children: React.ReactNode;
  cardTitle: string;
  backButtonHref: string;
  backButtonLabel: string;
  backButtonPrefix?: string;
  showSocials?: boolean;
};

export const AuthCard = ({
  children,
  cardTitle,
  backButtonHref,
  backButtonLabel,
  backButtonPrefix,
  showSocials,
}: CardWrapperProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocials && (
        <CardFooter>
          <Socials />
        </CardFooter>
      )}
      <CardFooter className="flex items-center justify-center">
      {backButtonHref && backButtonLabel && (
      <div className="flex items-center">
        {backButtonPrefix && <span className="flex-shrink-0 text-sm font-semibold">{backButtonPrefix}</span>}
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </div>
    )}
    </CardFooter>
    </Card>
  );
};



