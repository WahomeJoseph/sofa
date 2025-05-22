"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { toast } from "react-hot-toast"
import { AlertTriangle, Eye, EyeOff, Github, Loader2, LockKeyhole, Mail, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FcGoogle } from "react-icons/fc";
import { Separator } from "@/components/ui/separator"

export const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  // Form validation states
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isPasswordValid = password.length >= 6

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isEmailValid || !isPasswordValid) {
      toast.error("Please check your email and password")
      return
    }

    setPending(true)
    setError("")

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (res?.ok) {
        toast.success("Welcome back to SofaLux!", {
          duration: 3000,
        })
        router.push("/shop")
      } else {
        setError(
          res?.error === "AccessDenied"
            ? "Invalid email or password. Please try again."
            : "Failed to login. Please try again.",
        )
        toast.error("Login failed", { duration: 3000 })
      }
    } catch (error) {
      console.error(error)
      toast.error("An unexpected error occurred", { duration: 3000 })
    } finally {
      setPending(false)
    }
  }

  const handleSocialSignIn = async (provider) => {
    setPending(true)
    try {
      await signIn(provider, { callbackUrl: "/shop" })
    } catch (err) {
      toast.error(`${provider} sign-in failed. Please try again.`)
      setPending(false)
    }
  }

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-gray-950 shadow-2xl rounded-xl overflow-hidden flex flex-col md:flex-row border border-amber-600/10">

        <div className="w-full md:w-1/2 bg-gradient-to-br from-amber-100/20 to-amber-100/5 flex flex-col items-center justify-center p-6 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="z-10 text-center">
            <div className="mb-6 flex justify-center">
              <div className="h-12 w-12 rounded-full bg-amber-600 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-gray-950" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl text-amber-600 font-bold text-center mb-4">Welcome Back to SofaLux</h1>

            <p className="text-amber-100/70 mb-8 max-w-xs mx-auto">
              Sign in to access your account, track orders, and discover our latest collections.
            </p>

            <Image
              src="/sign-in.svg"
              alt="SofaLux Illustration"
              width={320}
              height={320}
              className="object-contain w-full h-auto max-h-72 drop-shadow-lg"
              priority
            />
          </motion.div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 bg-gray-900/30 p-6 sm:p-8 relative">
          <div className="text-center mt-4 mb-8">
            <h2 className="text-2xl font-bold text-amber-600">Login to Your Account</h2>
            <p className="text-sm text-amber-100/70 mt-2">Access exclusive features and manage your orders</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-900/20 border border-red-500/30 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-200 mb-6 mx-4">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <p>{error}</p>
            </motion.div>
          )}

          <div className="space-y-6 px-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-amber-100/90 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-amber-600/80" />
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmailTouched(true)}
                    disabled={pending}
                    required
                    className={`w-full pl-4 pr-10 py-2 bg-gray-800/50 border ${emailTouched && !isEmailValid
                        ? "border-red-500/50 focus:ring-red-500/30"
                        : "border-amber-600/20 focus:ring-amber-600/30"
                      } focus:border-amber-600/40 text-amber-100 rounded-md placeholder-amber-100/30 transition-all duration-200`}
                    aria-invalid={emailTouched && !isEmailValid}
                  />
                  {emailTouched && !isEmailValid && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    </div>
                  )}
                </div>
                {emailTouched && !isEmailValid && (
                  <p className="text-xs text-red-400 mt-1">Please enter a valid email address</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-amber-100/90 flex items-center gap-2">
                    <LockKeyhole className="h-4 w-4 text-amber-600/80" />
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-amber-600 hover:text-amber-500 hover:underline transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setPasswordTouched(true)}
                    disabled={pending}
                    required
                    className={`w-full pl-4 pr-10 py-2 bg-gray-800/50 border ${passwordTouched && !isPasswordValid
                        ? "border-red-500/50 focus:ring-red-500/30"
                        : "border-amber-600/20 focus:ring-amber-600/30"
                      } focus:border-amber-600/40 text-amber-100 rounded-md placeholder-amber-100/30 transition-all duration-200`}
                    aria-invalid={passwordTouched && !isPasswordValid}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-amber-600/70 hover:text-amber-600 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {passwordTouched && !isPasswordValid && (
                  <p className="text-xs text-red-400 mt-1">Password must be at least 6 characters</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-gray-950 font-semibold rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={pending}>
                  {pending ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="relative my-6">
              <Separator className="bg-amber-600/20" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-950 px-2 text-xs text-amber-100/50">
                OR CONTINUE WITH
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialSignIn("google")}
                disabled={pending}
                className="w-full border-amber-600/20 hover:bg-amber-600/10 gap-2 text-amber-100">
                <FcGoogle />
                Google
              </Button>
            </div>

            <p className="text-center text-sm text-amber-100/70 mt-6">
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="text-amber-600 hover:text-amber-500 hover:underline font-medium transition-colors">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
