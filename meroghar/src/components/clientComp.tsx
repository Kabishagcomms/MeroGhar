'use client';

import React, { useState, useEffect } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
}


//the mount is done late inorder to avoid hydration error caused due to ssr
export default function ClientComp({children}:ClientOnlyProps){
  const [hasMounted, setHasMounted] = useState(false);

  //runs once after the initial render
  useEffect(() => {
      setHasMounted(true);
  }, [])

  if (!hasMounted) return null;

  return (
    <>
      {children}
    </>
  );
};

