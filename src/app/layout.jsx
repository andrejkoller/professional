import { League_Spartan } from "next/font/google";
import ClientLayout from "./layout-client";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
});

export const metadata = {
  title: "Work by Andrej Koller",
  description: "A portfolio showcasing the diverse work of Andrej Koller.",
};

export default function RootLayout({ children }) {
  const fontClass = leagueSpartan.variable;

  return (
    <html lang="en">
      <body className={fontClass}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
