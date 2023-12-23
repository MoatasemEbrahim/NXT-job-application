import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type CustomNextPage = NextPage & { getLayout: (page: JSX.Element) => JSX.Element }

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = (Component as CustomNextPage).getLayout ?? ((page: JSX.Element) => page);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {getLayout(<Component {...pageProps} />)}
    </LocalizationProvider>
  );
}
