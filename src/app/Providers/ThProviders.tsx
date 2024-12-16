"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [isMount, setMount] = React.useState(false);

  React.useEffect(() => {
    setMount(true);
  }, []);

  if (!isMount) {
    return null;
  }
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
