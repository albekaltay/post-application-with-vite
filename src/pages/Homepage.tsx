import { motion } from "motion/react"
import { Users, FileText } from "lucide-react"
import { FeatureCard } from "@/components/FeatureCard"

export function Homepage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        className="text-center mb-8"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
          }
        }}
      >
        <motion.h1 
          className="text-4xl font-bold mb-4"
          variants={{ 
            hidden: { opacity: 0, y: -30 }, 
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
          }}
        >
          Welcome to Post Application
        </motion.h1>
        <motion.p 
          className="text-xl text-muted-foreground"
          variants={{ 
            hidden: { opacity: 0, y: -20 }, 
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
          }}
        >
          Manage users and posts with full CRUD operations
        </motion.p>
      </motion.div>

      <motion.div 
        className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { 
              staggerChildren: 0.2,
              delayChildren: 0.3
            }
          }
        }}
      >
        <FeatureCard
          icon={Users}
          title="Users Management"
          description="View, create, edit, and delete users. Manage user information including name, username, and email."
          linkTo="/users"
          buttonText="Go to Users"
        />

        <FeatureCard
          icon={FileText}
          title="Posts Management"
          description="View, create, edit, and delete posts. Manage posts with title, content, and user relationships."
          linkTo="/posts"
          buttonText="Go to Posts"
        />
      </motion.div>

      <motion.div 
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <p className="text-sm text-muted-foreground">
          You can easily create, edit, and manage posts and users with this modern CRUD application
        </p>
      </motion.div>
    </div>
  )
}