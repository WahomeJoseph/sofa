"use client"

import { useState } from "react"
import { Calendar, Clock, CheckCircle } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio"
import Link from "next/link"
import { toast } from "sonner"

export default function Services() {
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    address: "",
    message: "",
    preferredContact: "email",
  })

  const validateForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.phone) newErrors.phone = "Phone number is required";
    if (!form.service) newErrors.service = "Service type is required"
    if (!form.date) newErrors.date = "Preferred date is required";
    if (!form.time) newErrors.time = "Preferred time is required";
    if (!form.address) newErrors.address = "Address is required";
    if (!form.message) newErrors.message = "Message is required";
    if (!form.preferredContact) newErrors.preferredContact = "Preferred contact method is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      toast.error("Please fill all the required fields!")
      return;
    }
    try {
      setIsLoading(true)
      const res = await fetch('http://localhost:3001/api/contact', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      if (res.ok) {
        
        toast.success(data.message || "Contact submitted successfully!")
        setErrors({})
        setTimeout(() => {
          setForm({ name: "", email: "", phone: "", service: "", date: "", time: "", address: "", message: "", preferredContact: "email" })
          setIsSubmitted(true)
        }, 3000)
      } else {
        toast.error(data.message || "Failed to submit contact!")
      }
    } catch (error) {
      console.log("Failed to submit contact!", error.message)
      toast.error("Failed to submit contact!")
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value) => {
    setForm((prev) => ({ ...prev, preferredContact: value }))
  }



  if (isSubmitted) {
    return (
      <div className="bg-gray-800 p-8 rounded-lg text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-amber-600">Booking Request Received!</h3>
        <p className="mb-6">
          Thank you for booking with SofaLux. We'll contact you within 24 hours to confirm your appointment.
        </p>
        <Button onClick={() => setIsSubmitted(false)} className="bg-amber-600 hover:bg-amber-500 text-gray-950">
          Book Another Service
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-950/30 p-8 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            required
            className="bg-gray-900 border-amber-600/20 focus:border-amber-600"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your email address"
            required
            className="bg-gray-900 border-amber-600/20 focus:border-amber-600"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Your phone number"
            required
            className="bg-gray-900 border-amber-600/20 focus:border-amber-600"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="service">Service Type</Label>
          <Select value={form.service} onValueChange={(value) => handleSelectChange("service", value)}>
            <SelectTrigger className="bg-gray-900 border-amber-600/20 focus:border-amber-600">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent className='bg-[#ddd6cb]'>
              <SelectItem value="Sofa Revamp">Sofa Revamp</SelectItem>
              <SelectItem value="Custom Sofa Design">Custom Sofa Design</SelectItem>
              <SelectItem value="Sofa Cleaning">Sofa Cleaning</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Preferred Date</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
              className="bg-gray-900 border-amber-600/20 focus:border-amber-600 pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Preferred Time</Label>
          <div className="relative">
            <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="time"
              name="time"
              type="time"
              value={form.time}
              onChange={handleChange}
              required
              className="bg-gray-900 border-amber-600/20 focus:border-amber-600 pl-10"
            />
          </div>
        </div>
      </div>
      <div className="space-y-2 mb-6">
        <Label htmlFor="email">Address/Loaction</Label>
        <Input
          id="address"
          name="address"
          type="test"
          value={form.address}
          onChange={handleChange}
          placeholder="Your location or address"
          required
          className="bg-gray-900 border-amber-600/20 focus:border-amber-600"
        />
      </div>

      <div className="space-y-2 mb-6">
        <Label htmlFor="message">Additional Details</Label>
        <Textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us more about your requirements or any specific details we should know"
          rows={4}
          className="bg-gray-900 border border-amber-600/20 focus:border-amber-600/30"
        />
      </div>

      <div className="space-y-2 mb-8">
        <Label>Preferred Contact Method</Label>
        <RadioGroup value={form.preferredContact} onValueChange={handleRadioChange} className="flex space-x-6">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="contact-email" />
            <Label htmlFor="contact-email">Email</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="phone" id="contact-phone" />
            <Label htmlFor="contact-phone">Phone</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="whatsapp" id="contact-whatsapp" />
            <Label htmlFor="contact-whatsapp">WhatsApp</Label>
          </div>
        </RadioGroup>
      </div>

      <Button
        type="submit"
        className="w-full bg-amber-600 hover:bg-amber-500 text-gray-950 font-bold py-3"
        disabled={isLoading}>
        {isLoading ? "Processing..." : "Book Service"}
      </Button>

      <p className="text-center text-sm mt-4 text-gray-400">
        By submitting this form, you agree to our{" "}
        <Link href="/terms" className="text-amber-600 hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-amber-600 hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  )
}
