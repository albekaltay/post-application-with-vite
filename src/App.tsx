import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "@/store"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"
import { Homepage } from "@/pages/Homepage"
import { Users } from "@/pages/Users"
import { Posts } from "@/pages/Posts"
import { Toaster } from "@/components/ui/sonner"
import { ErrorBoundary } from "@/components/ErrorBoundary"

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Router>
            <div className="min-h-screen bg-background flex flex-col">
              <Navbar />
              <main className="flex-1">
                <ErrorBoundary>
                  <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/posts" element={<Posts />} />
                  </Routes>
                </ErrorBoundary>
              </main>
              <Footer />
              <Toaster />
            </div>
          </Router>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  )
}

export default App