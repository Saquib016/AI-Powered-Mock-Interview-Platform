import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider
} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/ThemeProvider.tsx"
const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Rizq AI Interview",
    template: "%s | Rizq AI Interview",
  },
  description:
    "Practice with AI-powered mock interviews and get instant personalized feedback. Ace your next job interview.",
  keywords: ["mock interview", "AI interview", "interview practice", "job interview prep"],
};


export default function RootLayout({ children }) {
  return (
    
    <ClerkProvider >
      <html lang="en">
        <body className={font.className}>
          <Toaster />
          <ThemeProvider
            attribute="class"
            defaultTheme="white"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          </body>
      </html>
    </ClerkProvider>
  );
}
