import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { type ComponentType } from "react"

interface FeatureCardProps {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
  linkTo: string
  buttonText: string
}

export function FeatureCard({ icon: Icon, title, description, linkTo, buttonText }: FeatureCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { 
          opacity: 1, 
          y: 0, 
          transition: { duration: 0.5, ease: "easeOut" }
        }
      }}
    >
      <Card className="hover:shadow-lg transition-shadow h-full">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Icon className="h-6 w-6 text-primary" />
            <CardTitle>{title}</CardTitle>
          </div>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link to={linkTo}>{buttonText}</Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}