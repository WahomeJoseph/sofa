"use client"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Toaster, toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio"
import { Separator } from "../ui/separator"
import { CheckCircle, Truck, CreditCard, Phone, ArrowRight, ShoppingBag, User, Calendar, Mail, MapPin, Shield, AlertCircle, ChevronLeft } from "lucide-react"
import Payment from "./Payment"

export default function Checkout() {
    const cartItems = useSelector((state) => state.cart.items)
    const [loading, setLoading] = useState(false)
    const [showPayment, setShowPayment] = useState(false)
    const [formData, setFormData] = useState({
        name: "Test",
        email: "test@gmail.com",
        phone: "072826829",
        address: "NBO",
        city: "City NBO",
        postalCode: "0100",
        deliveryMethod: "",
        paymentMethod: "",
        paymentTime: ""
    })

    // Form validation states
    const [touched, setTouched] = useState({})
    const [errors, setErrors] = useState({})
    const [formComplete, setFormComplete] = useState(false)

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const deliveryFee = formData.deliveryMethod === "Express" ? 2500 : 1500
    const tax = subtotal * 0.16 // 16% VAT
    const total = subtotal + deliveryFee + tax

    // Validate form fields
    useEffect(() => {
        const validateForm = () => {
            const newErrors = {}

            if (touched.name && !formData.name) newErrors.name = "Name is required"
            if (touched.email) {
                if (!formData.email) {
                    newErrors.email = "Email is required"
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                    newErrors.email = "Please enter a valid email"
                }
            }
            if (touched.phone && !formData.phone) newErrors.phone = "Phone number is required"
            if (touched.address && !formData.address) newErrors.address = "Address is required"
            if (touched.city && !formData.city) newErrors.city = "City is required"
            if (touched.postalCode && !formData.postalCode) newErrors.postalCode = "Postal code is required"

            setErrors(newErrors)

            // Check if form is complete
            const isComplete =
                formData.name &&
                formData.email &&
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
                formData.phone &&
                formData.address &&
                formData.city &&
                formData.postalCode &&
                formData.deliveryMethod &&
                formData.paymentMethod &&
                formData.paymentTime

            setFormComplete(isComplete)
        }

        validateForm()
    }, [formData, touched])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        setTouched((prev) => ({ ...prev, [name]: true }))
    }

    const handleBlur = (e) => {
        const { name } = e.target
        setTouched((prev) => ({ ...prev, [name]: true }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const allFields = {
            name: true,
            email: true,
            phone: true,
            address: true,
            city: true,
            postalCode: true,
        }
        setTouched(allFields)

        if (!formComplete) {
            toast.error("Please fill in all required fields correctly")
            return
        }

        setLoading(true)
        setShowPayment(true)

        try {
            const res = await fetch("http://localhost:3000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    orderItems: cartItems,
                    totalAmount: total,
                }),
            })
            const data = await res.json()
            if (res.ok) {
                toast.success("Order placed successfully!", {
                    description: "Thank you for your purchase!",
                    duration: 5000,
                })
            } else {
                toast.error(data.message || "Something went wrong. Please try again.")
                return
            }
            setFormData({
                name: "",
                email: "",
                phone: "",
                address: "",
                city: "",
                postalCode: "",
                deliveryMethod: "Standard",
                paymentMethod: "Card",
            })
            setTouched({})
        } catch (error) {
            toast.error("Checkout failed. Please try again.")
            console.error("Checkout error:", error)
        } finally {
            setLoading(false)
        }
    }

    const handlePaymentSuccess = async () => {
        setLoading(true)
        try {
            const res = await fetch("http://localhost:3000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    orderItems: cartItems,
                    totalAmount: total,
                }),
            })
            const data = await res.json()
            if (res.ok) {
                toast.success("Order placed successfully!", {
                    description: "Thank you for your purchase!",
                    duration: 5000,
                })
                // Reset form after successful submission
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    address: "",
                    city: "",
                    postalCode: "",
                    deliveryMethod: "Standard",
                    paymentMethod: "Card",
                })
                setTouched({})
            } else {
                toast.error(data.message || "Something went wrong. Please try again.")
            }
        } catch (error) {
            toast.error("Checkout failed. Please try again.")
            console.error("Checkout error:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-transparent text-amber-100/90">
            <Toaster position="top-center" richColors />
            <Payment 
            isOpen={showPayment}
            onClose={() => setShowPayment(false)}
            onPaymentSuccess={handlePaymentSuccess}
            orderData={{
                total,
                items: cartItems,
                customerInfo: formData
            }}
            paymentMethod={formData.paymentMethod}
            />

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <motion.div
                            className="lg:col-span-2 space-y-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}>
                            <Card className="border border-amber-600/5 bg-gray-900/50 shadow-xl overflow-hidden">
                                <CardHeader className="pb-4 border-b border-amber-600/20">
                                    <div className="flex items-center">
                                        <div className="p-2 rounded-full bg-amber-600/10 mr-3">
                                            <User size={30} className="text-amber-600" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl text-amber-100">Customer Information</CardTitle>
                                            <CardDescription className="text-amber-100/60">Please fill in required details</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid grid-cols-1 gap-5">
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-sm font-medium text-amber-100/80 flex items-center gap-2">
                                                    <User className="h-4 w-4 text-amber-600/80" />
                                                    Full Name
                                                </Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={`h-12 rounded-md bg-gray-900/60 border ${touched.name && errors.name
                                                        ? "border-red-500/50 focus:ring-red-500/30"
                                                        : "border-gray-600/20 focus:ring-amber-600/30"
                                                        } focus:border-amber-600/40 text-amber-100 placeholder-amber-100/30 transition-all duration-200`}
                                                    placeholder="John Doe"
                                                    required
                                                />
                                                {touched.name && errors.name && (
                                                    <motion.p
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        className="text-xs text-red-400 flex items-center gap-1 mt-1">
                                                        <AlertCircle className="h-3 w-3" />
                                                        {errors.name}
                                                    </motion.p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-sm font-medium text-amber-100/80 flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-amber-600/80" />
                                                Email
                                            </Label>
                                            <Input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`h-12 rounded-md bg-gray-900/60 border ${touched.email && errors.email
                                                    ? "border-red-500/50 focus:ring-red-500/30"
                                                    : "border-gray-600/20 focus:ring-amber-600/30"
                                                    } focus:border-amber-600/40 text-amber-100 placeholder-amber-100/30 transition-all duration-200`}
                                                placeholder="your.email@example.com"
                                                required
                                            />
                                            {touched.email && errors.email && (
                                                <motion.p
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    className="text-xs text-red-400 flex items-center gap-1 mt-1">
                                                    <AlertCircle className="h-3 w-3" />
                                                    {errors.email}
                                                </motion.p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-sm font-medium text-amber-100/80 flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-amber-600/80" />
                                                Phone Number
                                            </Label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-4 h-4 w-4 text-amber-600/50" />
                                                <Input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={`h-12 rounded-md bg-gray-900/60 border ${touched.phone && errors.phone
                                                        ? "border-red-500/50 focus:ring-red-500/30"
                                                        : "border-gray-600/20 focus:ring-amber-600/30"
                                                        } focus:border-amber-600/40 text-amber-100 pl-10 placeholder-amber-100/30 transition-all duration-200`}
                                                    placeholder="+254 700 000 000"
                                                    required
                                                />
                                            </div>
                                            {touched.phone && errors.phone && (
                                                <motion.p
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    className="text-xs text-red-400 flex items-center gap-1 mt-1">
                                                    <AlertCircle className="h-3 w-3" />
                                                    {errors.phone}
                                                </motion.p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="address"
                                                className="text-sm font-medium text-amber-100/80 flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-amber-600/80" />
                                                Delivery Address
                                            </Label>
                                            <Input
                                                id="address"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`h-12 rounded-md bg-gray-900/60 border ${touched.address && errors.address
                                                    ? "border-red-500/50 focus:ring-red-500/30"
                                                    : "border-gray-600/20 focus:ring-amber-600/30"
                                                    } focus:border-amber-600/40 text-amber-100 placeholder-amber-100/30 transition-all duration-200`}
                                                placeholder="4th St, Paradise Apartment 4B"
                                                required
                                            />
                                            {touched.address && errors.address && (
                                                <motion.p
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    className="text-xs text-red-400 flex items-center gap-1 mt-1">
                                                    <AlertCircle className="h-3 w-3" />
                                                    {errors.address}
                                                </motion.p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <Label htmlFor="city" className="text-sm font-medium text-amber-100/80 flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-amber-600/80" />
                                                    City
                                                </Label>
                                                <Input
                                                    id="city"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={`h-12 rounded-md bg-gray-900/60 border ${touched.city && errors.city
                                                        ? "border-red-500/50 focus:ring-red-500/30"
                                                        : "border-gray-600/20 focus:ring-amber-600/30"
                                                        } focus:border-amber-600/40 text-amber-100 placeholder-amber-100/30 transition-all duration-200`}
                                                    placeholder="Nairobi"
                                                    required
                                                />
                                                {touched.city && errors.city && (
                                                    <motion.p
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        className="text-xs text-red-400 flex items-center gap-1 mt-1">
                                                        <AlertCircle className="h-3 w-3" />
                                                        {errors.city}
                                                    </motion.p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="postalCode"
                                                    className="text-sm font-medium text-amber-100/80 flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-amber-600/80" />
                                                    Postal Code
                                                </Label>
                                                <Input
                                                    id="postalCode"
                                                    name="postalCode"
                                                    value={formData.postalCode}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={`h-12 rounded-md bg-gray-900/60 border ${touched.postalCode && errors.postalCode
                                                        ? "border-red-500/50 focus:ring-red-500/30"
                                                        : "border-gray-600/20 focus:ring-amber-600/30"
                                                        } focus:border-amber-600/40 text-amber-100 placeholder-amber-100/30 transition-all duration-200`}
                                                    placeholder="00100"
                                                    required
                                                />
                                                {touched.postalCode && errors.postalCode && (
                                                    <motion.p
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        className="text-xs text-red-400 flex items-center gap-1 mt-1">
                                                        <AlertCircle className="h-3 w-3" />
                                                        {errors.postalCode}
                                                    </motion.p>
                                                )}
                                            </div>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}>
                                <Card className="border border-amber-600/10 bg-gray-900/80 shadow-xl overflow-hidden">
                                    <CardHeader className="pb-4 border-b border-amber-600/20">
                                        <div className="flex items-center">
                                            <div className="p-2 rounded-full bg-amber-600/10 mr-3">
                                                <Truck size={30} className="text-amber-600" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-xl text-amber-100">Delivery Options</CardTitle>
                                                <CardDescription className="text-amber-100/60">
                                                    Choose your preferred delivery method
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <RadioGroup
                                            value={formData.deliveryMethod}
                                            onValueChange={(value) => setFormData({ ...formData, deliveryMethod: value })}
                                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                            disabled={loading}>
                                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                <label
                                                    htmlFor="standard"
                                                    className={`flex flex-col p-5 border rounded-lg cursor-pointer transition-all ${formData.deliveryMethod === "Standard"
                                                        ? "border-amber-600/10 bg-amber-600/10"
                                                        : "border-amber-600/20 bg-gray-800/50 hover:border-amber-600/40"
                                                        }`}>
                                                    <div className="flex items-start">
                                                        <RadioGroupItem value="Standard" id="standard" className="mt-1" />
                                                        <div className="ml-3">
                                                            <span className="font-medium text-amber-100">Standard Delivery</span>
                                                            <div className="flex items-center mt-1 text-sm text-amber-100/60">
                                                                <Calendar className="h-3.5 w-3.5 mr-1.5 text-amber-600/70" />
                                                                <span>3-5 business days</span>
                                                            </div>
                                                            <p className="text-sm font-medium mt-3 text-amber-600">KES 1,500</p>
                                                        </div>
                                                    </div>
                                                </label>
                                            </motion.div>

                                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                <label
                                                    htmlFor="express"
                                                    className={`flex flex-col p-5 border rounded-lg cursor-pointer transition-all ${formData.deliveryMethod === "Express"
                                                        ? "border-amber-600/10 bg-amber-600/10"
                                                        : "border-amber-600/20 bg-gray-800/50 hover:border-amber-600/40"
                                                        }`}>
                                                    <div className="flex items-start">
                                                        <RadioGroupItem value="Express" id="express" className="mt-1" />
                                                        <div className="ml-3">
                                                            <span className="font-medium text-amber-100">Express Delivery</span>
                                                            <div className="flex items-center mt-1 text-sm text-amber-100/60">
                                                                <Calendar className="h-3.5 w-3.5 mr-1.5 text-amber-600/70" />
                                                                <span>1-2 business days</span>
                                                            </div>
                                                            <p className="text-sm font-medium mt-3 text-amber-600">KES 2,500</p>
                                                        </div>
                                                    </div>
                                                </label>
                                            </motion.div>
                                        </RadioGroup>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* payment */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}>
                                <Card className="border border-amber-600/10 bg-gray-900/80 shadow-xl overflow-hidden">
                                    <CardHeader className="pb-4 border-b border-amber-600/20">
                                        <div className="flex items-center">
                                            <div className="p-2 rounded-full bg-amber-600/10 mr-3">
                                                <CreditCard size={30} className="text-amber-600" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-xl text-amber-100">Payment Method</CardTitle>
                                                <CardDescription className="text-amber-100/60">Select how you'd like to pay</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <RadioGroup
                                            value={formData.paymentMethod}
                                            onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                            disabled={loading}>
                                            {/* Card Payment Option */}
                                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                <div
                                                    className={`flex flex-col p-5 border rounded-lg cursor-pointer transition-all ${formData.paymentMethod === "Card"
                                                        ? "border-amber-600/10 bg-amber-600/10"
                                                        : "border-amber-600/20 bg-gray-800/50 hover:border-amber-600/40"
                                                        }`}>
                                                    <label htmlFor="card" className="flex items-start cursor-pointer">
                                                        <RadioGroupItem value="Card" id="card" className="mt-1" />
                                                        <div className="ml-3">
                                                            <span className="font-medium text-amber-100">Credit/Debit Card</span>
                                                            <p className="text-sm text-amber-100/60 mt-1">Pay securely with your card</p>
                                                            <div className="flex space-x-2 mt-3">
                                                                <div className="px-2 py-1 bg-gray-800 rounded flex items-center justify-center text-xs text-amber-100/80 border border-amber-600/20">
                                                                    VISA
                                                                </div>
                                                                <div className="px-2 py-1 bg-gray-800 rounded flex items-center justify-center text-xs text-amber-100/80 border border-amber-600/20">
                                                                    DISCOVER
                                                                </div>
                                                                <div className="px-2 py-1 bg-gray-800 rounded flex items-center justify-center text-xs text-amber-100/80 border border-amber-600/20">
                                                                    MASTERCARD
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                            </motion.div>

                                            {/* M-Pesa Payment Option */}
                                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                <div
                                                    className={`flex flex-col p-5 border rounded-lg cursor-pointer transition-all ${formData.paymentMethod === "Mpesa"
                                                        ? "border-amber-600/10 bg-amber-600/10"
                                                        : "border-amber-600/20 bg-gray-800/50 hover:border-amber-600/40"
                                                        }`}>
                                                    <label htmlFor="mpesa" className="flex items-start cursor-pointer">
                                                        <RadioGroupItem value="Mpesa" id="mpesa" className="mt-1" />
                                                        <div className="ml-3">
                                                            <span className="font-medium text-amber-100">M-Pesa</span>
                                                            <p className="text-sm text-amber-100/60 mt-1">Pay using M-Pesa mobile money</p>
                                                            <div className="px-3 py-1 bg-[#1a7f36] rounded mt-3 inline-flex items-center justify-center text-xs text-white font-medium">
                                                                M-PESA
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                            </motion.div>
                                        </RadioGroup>

                                        {/* Conditional payment time form */}
                                        <RadioGroup
                                            value={formData.paymentTime}
                                            onValueChange={(value) => setFormData({ ...formData, paymentTime: value })}
                                            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10"
                                            disabled={loading}>
                                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                <div
                                                    className={`flex flex-col p-5 border rounded-lg cursor-pointer transition-all ${formData.paymentTime === "Pay Now"
                                                        ? "border-amber-600/10 bg-amber-600/10"
                                                        : "border-amber-600/20 bg-gray-800/50 hover:border-amber-600/40"
                                                        }`}>
                                                    <label htmlFor="pay-now" className="flex items-start cursor-pointer">
                                                        <RadioGroupItem value="Pay Now" id="pay-now" className="mt-1" />
                                                        <div className="ml-3">
                                                            <span className="font-medium text-amber-100">Pay Now</span>
                                                            <p className="text-sm text-amber-100/60 mt-1">Make instant pay</p>
                                                        </div>
                                                    </label>
                                                </div>
                                            </motion.div>

                                            {/* M-Pesa Payment Option */}
                                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                <div
                                                    className={`flex flex-col p-5 border rounded-lg cursor-pointer transition-all ${formData.paymentTime === "Pay On Delivery"
                                                        ? "border-amber-600/10 bg-amber-600/10"
                                                        : "border-amber-600/20 bg-gray-800/50 hover:border-amber-600/40"
                                                        }`}>
                                                    <label htmlFor="pay-on-delivery" className="flex items-start cursor-pointer">
                                                        <RadioGroupItem value="Pay On Delivery" id="pay-on-delivery" className="mt-1" />
                                                        <div className="ml-3">
                                                            <span className="font-medium text-amber-100">Pay On Delivery</span>
                                                            <p className="text-sm text-amber-100/60 mt-1">Make payment on goods delivery</p>
                                                        </div>
                                                    </label>
                                                </div>
                                            </motion.div>
                                        </RadioGroup>

                                    </CardContent>
                                </Card>
                            </motion.div>
                        </motion.div>

                        {/* Order Summary */}
                        <motion.div
                            className="lg:col-span-1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}>
                            <div className="sticky top-6">
                                <Card className="border border-amber-600/10 bg-gray-900/50 shadow-xl overflow-hidden">
                                    <CardHeader className="pb-4 border-b border-amber-600/20">
                                        <div className="flex items-center">
                                            <div className="p-2 rounded-full bg-amber-600/10 mr-3">
                                                <ShoppingBag className="h-5 w-5 text-amber-600" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-xl text-amber-100">Order Summary</CardTitle>
                                                <CardDescription className="text-amber-100/60">
                                                    {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <div className="space-y-5">
                                            <div className="max-h-80 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                                                <AnimatePresence>
                                                    {cartItems.map((item, index) => (
                                                        <motion.div
                                                            key={item.id}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: index * 0.1 }}
                                                            className="flex gap-4 p-3 rounded-lg bg-gray-800/50 border border-amber-600/10 hover:border-amber-600/30 transition-all duration-200">
                                                            <div className="w-20 h-20 bg-gray-800 rounded-md overflow-hidden flex-shrink-0 border border-amber-600/10">
                                                                {item.image ? (
                                                                    <img
                                                                        src={item.image || "/placeholder.svg?height=80&width=80"}
                                                                        alt={item.name}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center">
                                                                        <ShoppingBag className="h-8 w-8 text-amber-600/30" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="font-medium line-clamp-2 text-amber-100">{item.name}</p>
                                                                <div className="flex items-center mt-1 text-sm text-amber-100/60">
                                                                    <span className="px-2 py-0.5 bg-gray-800 rounded-full text-xs border border-amber-600/20">
                                                                        Qty: {item.quantity}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="font-medium text-amber-600">
                                                                    KES {(item.price * item.quantity).toLocaleString()}
                                                                </p>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </AnimatePresence>
                                            </div>

                                            <div className="p-4 rounded-lg bg-gray-800/50 border border-amber-600/10 space-y-3">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-amber-100/60">Subtotal</span>
                                                    <span className="text-amber-100">KES {subtotal.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-amber-100/60">VAT (16%)</span>
                                                    <span className="text-amber-100">KES {tax.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-amber-100/60">Delivery</span>
                                                    <span className="text-amber-100">KES {deliveryFee.toLocaleString()}</span>
                                                </div>
                                                <Separator className="bg-amber-600/20" />
                                                <div className="flex justify-between font-medium text-lg pt-2">
                                                    <span className="text-amber-100">Total</span>
                                                    <span className="text-amber-600">KES {total.toLocaleString()}</span>
                                                </div>
                                            </div>

                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={handleSubmit}
                                                    className="w-full h-14 text-base font-medium bg-transparent border border-amber-600/20 hover:bg-amber-600/10 text-[#ddd6cb] rounded-md transition-colors duration-200 flex items-center justify-center"
                                                    disabled={loading || cartItems.length === 0 || !formComplete}>
                                                    {loading ? 'Processing...' : 'Complete Order'}
                                                </motion.button>


                                            <div className="flex flex-col space-y-3 mt-4">
                                                <div className="flex items-center text-sm text-amber-100/60">
                                                    <CheckCircle className="h-4 w-4 mr-2 text-amber-600" />
                                                    <span>Free returns within 30 days</span>
                                                </div>
                                                <div className="flex items-center text-sm text-amber-100/60">
                                                    <Truck className="h-4 w-4 mr-2 text-amber-600" />
                                                    <span>Delivery tracking included</span>
                                                </div>
                                                <div className="flex items-center text-sm text-amber-100/60">
                                                    <Shield className="h-4 w-4 mr-2 text-amber-600" />
                                                    <span>Secure payment processing</span>
                                                </div>
                                            </div>

                                            <p className="text-xs text-amber-100/40 text-center">
                                                By completing your order, you agree to our Terms of Service and Privacy Policy.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(251, 191, 36, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(251, 191, 36, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(251, 191, 36, 0.3);
                }
            `}</style>
        </div>
    )
}
