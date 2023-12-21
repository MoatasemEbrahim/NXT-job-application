import React, { useState, useCallback, PropsWithChildren, ReactNode } from "react";
import Head from "next/head";
import { twMerge } from "tailwind-merge";

import AppBar from "@/components/Layout/AppBar";
import Sidebar from "@/components/Layout/Sidebar";

type LayoutProps = {
  title?: string;
};

const Layout = ({ children, title }: PropsWithChildren<LayoutProps>) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);   

  const toggleSidebar = useCallback(() => {
    setIsOpen(prevState => !prevState);
  },[]);

  return (
    <div className="bg-black2 min-h-screen min-w-screen">
      <Head>
        <title>{title || "NXT solutions"}</title>
      </Head>
      <AppBar toggleSidebar={toggleSidebar} />
      <div className='flex w-screen'>
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <div 
          className={twMerge(
            "transform transition-all duration-200 ease-in-out",
            isOpen ?  "w-[calc(100vw-185px)] translate-x-[185px]" : "w-full translate-x-0"
          )}>
          {children}
        </div>
      </div>
    </div>
  );
};

type getLayoutProps = ReactNode & { props: LayoutProps };

export const getLayout = (page: getLayoutProps): JSX.Element => (
  <Layout title={page.props.title}>
    {page}
  </Layout>
);

export default Layout;
