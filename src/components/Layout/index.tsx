import React, { useState, useCallback, PropsWithChildren, ReactNode, useEffect } from "react";
import { Inter } from "next/font/google";
import Head from "next/head";
import { twMerge } from "tailwind-merge";

import AppBar from "@/components/Layout/AppBar";
import Sidebar from "@/components/Layout/Sidebar";
import useMobile from "@/hooks/useMobile";

const inter = Inter({ subsets: ["latin"] });

type LayoutProps = {
  title?: string;
};

const Layout = ({ children, title }: PropsWithChildren<LayoutProps>) => {
  const { isMobile } = useMobile();
  const [isOpen, setIsOpen] = useState<boolean>(!isMobile);  

  const toggleSidebar = useCallback(() => {
    setIsOpen(prevState => !prevState);
  },[]);

  useEffect(() => {
    setIsOpen(!isMobile);
  },[isMobile]);


  return (
    <main
      className={twMerge("bg-black2 min-h-screen w-screen", inter.className)}
    >
      <Head>
        <title>{title || "NXT solutions"}</title>
      </Head>
      <AppBar toggleSidebar={toggleSidebar} />
      <div className='flex w-screen h-[calc(100vh-64px)]'>
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} />
        <div 
          className={twMerge(
            "transform transition-all duration-200 ease-in-out w-full",
            !isMobile && (isOpen ?  "w-[calc(100vw-185px)] translate-x-[185px]" : "w-full translate-x-0")
          )}>
          {children}
        </div>
      </div>
    </main>
  );
};

type getLayoutProps = ReactNode & { props: LayoutProps };

export const getLayout = (page: getLayoutProps): JSX.Element => (
  <Layout title={page.props.title}>
    {page}
  </Layout>
);

export default Layout;
