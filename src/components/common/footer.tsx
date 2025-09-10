import { motion } from "motion/react"
import { Github, Linkedin, Heart } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          {/* Made by section */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
            <span>by</span>
            <span className="font-semibold text-foreground">Albek Altay</span>
          </div>

          {/* Social links and theme toggle */}
          <div className="flex items-center gap-3">
            <motion.a
              href="https://github.com/albekaltay"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted/50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="GitHub"
            >
              <Github className="h-5 w-5" />
            </motion.a>
            
            <motion.a
              href="https://www.linkedin.com/in/albek-altay-18364a14a"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted/50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </motion.a>

            <div className="border-l border-border/40 pl-3 ml-1">
              <ThemeToggle />
            </div>
          </div>
        </motion.div>
        
        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center pt-4 text-xs text-muted-foreground border-t border-border/40 mt-4"
        >
          <p>© {new Date().getFullYear()} Post Application. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}