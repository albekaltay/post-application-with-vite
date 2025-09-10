import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="container mx-auto px-4 py-2 md:py-0 flex h-24 md:h-16 items-center flex flex-col md:flex-row justify-between">
        <div className="md:mr-4 flex mb-2 md:mb-0">
          <Link to="/" className="md:mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">Post Application</span>
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link to="/users">Users</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/posts">Posts</Link>
          </Button>
        </nav>
      </div>
    </nav>
  )
}