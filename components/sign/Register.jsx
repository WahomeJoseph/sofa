'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { AlertTriangle, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, User, ArrowLeft } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Toaster } from 'sonner'

export const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [pending, setPending] = useState(false)
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const router = useRouter()

    const [passwordStrength, setPasswordStrength] = useState(0)
    const [touched, setTouched] = useState({
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
    })

    const isNameValid = formData.username.length >= 2
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    const isPasswordValid = formData.password.length >= 8
    const doPasswordsMatch = formData.password === formData.confirmPassword

    const checkPasswordStrength = (password) => {
        let strength = 0
        if (password.length >= 8) strength += 1
        if (/[A-Z]/.test(password)) strength += 1
        if (/[0-9]/.test(password)) strength += 1
        if (/[^A-Za-z0-9]/.test(password)) strength += 1
        return strength
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (name === 'password') {
            setPasswordStrength(checkPasswordStrength(value))
        }
    }

    const handleBlur = (e) => {
        const { name } = e.target
        setTouched((prev) => ({ ...prev, [name]: true }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setTouched({
            username: true,
            email: true,
            password: true,
            confirmPassword: true,
        })
        if (!isNameValid || !isEmailValid || !isPasswordValid || !doPasswordsMatch) {
            toast.error('Please check for mismatch or empty details')
            return
        }
        setPending(true)
        setError('')
        try {
            console.log('Sending Data:', {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username.trim(),
                    email: formData.email.trim(),
                    password: formData.password.trim()
                })
            });
            const data = await res.json();
            console.log('Response:', data);

            if (!res.ok) {
                throw new Error(data.error || data.message || 'Registration failed');
            }
            toast.success('Account created successfully', { duration: 3000 });
            console.log('Response data:', data);
            router.push('/sign-in');
        } catch (error) {
            console.error('Registration error:', error);
            setError(error.message);
            toast.error(error.message || 'Failed to create account. Please try again.');
        } finally {
            setPending(false);
        }
    }

    const handleSocialSignUp = async (provider) => {
        setPending(true)
        try {
            toast.success(`Signed up with ${provider} successfully!`, {
                duration: 3000,
            })

            router.push('/shop')
        } catch (err) {
            toast.error(`${provider} sign-up failed. Please try again.`)
        } finally {
            setPending(false)
        }
    }

    return (
        <div className='min-h-screen bg-transparent flex items-center justify-center px-4 py-26 sm:px-6 lg:px-8'>
            <Toaster position='top-center' richColors />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='w-full max-w-4xl bg-gray-950 shadow-2xl rounded-xl overflow-hidden flex flex-col md:flex-row border border-amber-600/10'>
                {/* Image Section */}
                <div className='w-full md:w-1/2 bg-gradient-to-br from-amber-100/20 to-amber-100/5 flex flex-col items-center justify-center p-6 relative overflow-hidden'>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className='z-10 text-center'>
                        <div className='mb-6 flex justify-center'>
                            <div className='h-12 w-12 rounded-full bg-amber-600 flex items-center justify-center'>
                                <ShieldCheck className='h-6 w-6 text-gray-950' />
                            </div>
                        </div>
                        <h1 className='text-2xl sm:text-3xl text-amber-600 font-bold text-center mb-4'>Join SofaLux Today</h1>
                        <p className='text-amber-100/70 mb-8 max-w-xs mx-auto'>
                            Create an account to enjoy exclusive benefits, track orders, and discover our latest collections.
                        </p>
                    </motion.div>
                </div>

                {/* Form Section */}
                <div className='w-full md:w-1/2 bg-gray-900/30 p-6 sm:p-8 relative'>
                    <div className='text-center mt-4 mb-8'>
                        <h2 className='text-2xl font-bold text-amber-600'>Create Your Account</h2>
                        <p className='text-sm text-amber-100/70 mt-2'>Join our community of furniture enthusiasts</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='bg-red-900/20 border border-red-500/30 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-200 mb-6 mx-4'>
                            <AlertTriangle className='h-4 w-4 text-red-400' />
                            <p>{error}</p>
                        </motion.div>
                    )}

                    <div className='space-y-6 px-4'>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <div className='space-y-2'>
                                <Label htmlFor='name' className='text-sm font-medium text-amber-100/90 flex items-center gap-2'>
                                    <User className='h-4 w-4 text-amber-600/80' />
                                    Full Name
                                </Label>
                                <div className='relative'>
                                    <Input
                                        id='username'
                                        name='username'
                                        type='text'
                                        placeholder='John Doe'
                                        value={formData.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={pending}
                                        required
                                        className={`w-full pl-4 pr-10 py-2 bg-gray-800/50 border ${touched.username && !isNameValid
                                            ? 'border-red-500/50 focus:ring-red-500/30'
                                            : 'border-amber-600/20 focus:ring-amber-600/30'
                                            } focus:border-amber-600/40 text-amber-100 rounded-md placeholder-amber-100/30 transition-all duration-200`}
                                        aria-invalid={touched.username && !isNameValid}
                                    />
                                    {touched.username && !isNameValid && (
                                        <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
                                            <AlertTriangle className='h-4 w-4 text-red-500' />
                                        </div>
                                    )}
                                </div>
                                {touched.username && !isNameValid && (
                                    <p className='text-xs text-red-400 mt-1'>Name must be at least 2 characters</p>
                                )}
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='email' className='text-sm font-medium text-amber-100/90 flex items-center gap-2'>
                                    <Mail className='h-4 w-4 text-amber-600/80' />
                                    Email
                                </Label>
                                <div className='relative'>
                                    <Input
                                        id='email'
                                        name='email'
                                        type='email'
                                        placeholder='you@example.com'
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={pending}
                                        required
                                        className={`w-full pl-4 pr-10 py-2 bg-gray-800/50 border ${touched.email && !isEmailValid
                                            ? 'border-red-500/50 focus:ring-red-500/30'
                                            : 'border-amber-600/20 focus:ring-amber-600/30'
                                            } focus:border-amber-600/40 text-amber-100 rounded-md placeholder-amber-100/30 transition-all duration-200`}
                                        aria-invalid={touched.email && !isEmailValid}
                                    />
                                    {touched.email && !isEmailValid && (
                                        <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
                                            <AlertTriangle className='h-4 w-4 text-red-500' />
                                        </div>
                                    )}
                                </div>
                                {touched.email && !isEmailValid && (
                                    <p className='text-xs text-red-400 mt-1'>Please enter a valid email address</p>
                                )}
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='password' className='text-sm font-medium text-amber-100/90 flex items-center gap-2'>
                                    <LockKeyhole className='h-4 w-4 text-amber-600/80' />
                                    Password
                                </Label>
                                <div className='relative'>
                                    <Input
                                        id='password'
                                        name='password'
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder='••••••••'
                                        value={formData.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={pending}
                                        required
                                        className={`w-full pl-4 pr-10 py-2 bg-gray-800/50 border ${touched.password && !isPasswordValid
                                            ? 'border-red-500/50 focus:ring-red-500/30'
                                            : 'border-amber-600/20 focus:ring-amber-600/30'
                                            } focus:border-amber-600/40 text-amber-100 rounded-md placeholder-amber-100/30 transition-all duration-200`}
                                        aria-invalid={touched.password && !isPasswordValid}
                                    />
                                    <button
                                        type='button'
                                        onClick={() => setShowPassword(!showPassword)}
                                        className='absolute inset-y-0 right-0 flex items-center pr-3 text-amber-600/70 hover:text-amber-600 transition-colors'
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}>
                                        {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                                    </button>
                                </div>
                                {touched.password && !isPasswordValid && (
                                    <p className='text-xs text-red-400 mt-1'>Password must be at least 8 characters</p>
                                )}

                                {/* Password strength indicator */}
                                {formData.password && (
                                    <div className='mt-2'>
                                        <div className='flex justify-between mb-1'>
                                            <span className='text-xs text-amber-100/60'>Password strength</span>
                                            <span className='text-xs text-amber-100/60'>
                                                {passwordStrength === 0 && 'Weak'}
                                                {passwordStrength === 1 && 'Fair'}
                                                {passwordStrength === 2 && 'Good'}
                                                {passwordStrength === 3 && 'Strong'}
                                                {passwordStrength === 4 && 'Very Strong'}
                                            </span>
                                        </div>
                                        <div className='h-1.5 w-full bg-gray-800 rounded-full overflow-hidden'>
                                            <div
                                                className={`h-full ${passwordStrength === 0
                                                    ? 'bg-red-500 w-1/4'
                                                    : passwordStrength === 1
                                                        ? 'bg-orange-500 w-2/4'
                                                        : passwordStrength === 2
                                                            ? 'bg-yellow-500 w-3/4'
                                                            : passwordStrength === 3
                                                                ? 'bg-green-500 w-full'
                                                                : 'bg-emerald-500 w-full'
                                                    } transition-all duration-300`}></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className='space-y-2'>
                                <Label
                                    htmlFor='confirmPassword'
                                    className='text-sm font-medium text-amber-100/90 flex items-center gap-2'>
                                    <LockKeyhole className='h-4 w-4 text-amber-600/80' />
                                    Confirm Password
                                </Label>
                                <div className='relative'>
                                    <Input
                                        id='confirmPassword'
                                        name='confirmPassword'
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder='••••••••'
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={pending}
                                        required
                                        className={`w-full pl-4 pr-10 py-2 bg-gray-800/50 border ${touched.confirmPassword && !doPasswordsMatch
                                            ? 'border-red-500/50 focus:ring-red-500/30'
                                            : 'border-amber-600/20 focus:ring-amber-600/30'
                                            } focus:border-amber-600/40 text-amber-100 rounded-md placeholder-amber-100/30 transition-all duration-200`}
                                        aria-invalid={touched.confirmPassword && !doPasswordsMatch}
                                    />
                                    <button
                                        type='button'
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className='absolute inset-y-0 right-0 flex items-center pr-3 text-amber-600/70 hover:text-amber-600 transition-colors'
                                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}>
                                        {showConfirmPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                                    </button>
                                </div>
                                {touched.confirmPassword && !doPasswordsMatch && (
                                    <p className='text-xs text-red-400 mt-1'>Passwords do not match</p>
                                )}
                            </div>

                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    type='submit'
                                    className='w-full py-2 bg-amber-600 hover:bg-amber-700 text-gray-950 font-semibold rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                                    disabled={pending}>
                                    {pending ? 'Signing up...' : 'Sign Up'}
                                </Button>
                            </motion.div>
                        </form>

                        <div className='relative my-6'>
                            <Separator className='bg-amber-600/20' />
                            <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-950 px-2 text-xs text-amber-100/50'>
                                OR SIGN UP WITH
                            </span>
                        </div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                                type='button'
                                variant='outline'
                                onClick={() => handleSocialSignUp('google')}
                                disabled={pending}
                                className='w-full border-amber-600/20 hover:bg-amber-600/10 text-amber-100'>
                                <FcGoogle className='mr-2 h-5 w-5' />
                                Sign up with Google
                            </Button>
                        </motion.div>

                        <p className='text-center text-sm text-amber-100/70 mt-6'>
                            Already have an account?{' '}
                            <Link
                                href='/sign-in'
                                className='text-amber-600 hover:text-amber-500 hover:underline font-medium transition-colors'>
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default SignUp
