import React from 'react'
import ReadMore from '../../components/read-more';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <>
        {children}
        <ReadMore/>
        </>
  );
}
