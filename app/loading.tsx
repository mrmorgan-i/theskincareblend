import React from 'react';

const LoadingSpinner = () => (
  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
);

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="text-center">
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
        <h2 className="mt-4 text-xl font-semibold text-primary">Loading...</h2>
        <p className="mt-2 text-sm text-muted-foreground">Please wait while we prepare your content.</p>
      </div>
    </div>
  );
}