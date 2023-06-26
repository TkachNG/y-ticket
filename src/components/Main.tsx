import React from "react";


export const MainComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='main'>
      {children}
    </main>
  );
}
