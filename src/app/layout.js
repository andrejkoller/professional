import { League_Spartan } from "next/font/google";
import LayoutClient from "./layoutClient";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
});

export const metadata = {
  title: "Andrej Koller",
  description: "Portfolio of Andrej Koller",
};

export default function RootLayout({ children }) {
  const fontClass = leagueSpartan.variable;

  return (
    <html lang="en">
      <body className={fontClass}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
