"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { X, Phone, Truck, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { toast } from "sonner"

export default function PaymentModal({ isOpen, onClose, onPaymentSuccess, orderData, paymentMethod }) {
  const [selectedMethod, setSelectedMethod] = useState(
    paymentMethod === "Mpesa" ? "mpesa" : "pay_on_delivery"
  )
  const [phoneNumber, setPhoneNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState("idle")

  const handlePayment = async () => {
    if (selectedMethod === "mpesa" && (!phoneNumber || phoneNumber.length < 10)) {
      toast.error("Please enter a valid M-Pesa phone number")
      return
    }
    setLoading(true)
    setPaymentStatus("processing")

    try {
      const res = await fetch('http://localhost:3000/api/mpesa', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber
        })
      });

      if (res.ok) {
        setPaymentStatus("success");
        toast.success(
          selectedMethod === "mpesa"
            ? "Payment initiated! Check your phone for M-Pesa prompt"
            : "Order confirmed! Payment will be collected on delivery"
        );
      }

      onPaymentSuccess({
        method: selectedMethod,
        amount: orderData.total,
        transactionId: selectedMethod === "mpesa" ? `MPESA-${Date.now()}` : null,
        phoneNumber: selectedMethod === "mpesa" ? phoneNumber : null
      })

      setTimeout(onClose, 2000)
    } catch (error) {
      setPaymentStatus("error")
      toast.error("Payment failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-gray-900 border border-amber-600/20 rounded-lg max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-amber-600/20">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-amber-100">
              Complete Payment
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-amber-600/10 transition-colors">
              <X className="w-5 h-5 text-amber-100/70" />
            </button>
          </div>
          <p className="text-sm text-amber-100/60 mt-1">
            Total: KSh {orderData.total.toLocaleString()}
          </p>
        </div>

        {/* Payment Content */}
        <div className="p-6 space-y-4">
          {/* Payment Method Selection */}
          <RadioGroup
            value={selectedMethod}
            onValueChange={setSelectedMethod}
            className="space-y-3"
            disabled={loading}>
            <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:border-amber-600/40 transition-colors">
              <RadioGroupItem
                value="mpesa"
                id="mpesa"
                className="text-green-500"
              />
              <Label htmlFor="mpesa" className="flex-1 cursor-pointer">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium text-amber-100">Pay with M-Pesa</p>
                    <p className="text-sm text-amber-100/60">Instant mobile payment</p>
                  </div>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:border-amber-600/40 transition-colors">
              <RadioGroupItem
                value="pay_on_delivery"
                id="pay_on_delivery"
                className="text-amber-500"
              />
              <Label htmlFor="pay_on_delivery" className="flex-1 cursor-pointer">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-amber-500" />
                  <div>
                    <p className="font-medium text-amber-100">Pay on Delivery</p>
                    <p className="text-sm text-amber-100/60">Cash payment when order arrives</p>
                  </div>
                </div>
              </Label>
            </div>
          </RadioGroup>

          {/* M-Pesa Phone Number Input */}
          {selectedMethod === "mpesa" && (
            <div className="space-y-2">
              <Label htmlFor="mpesa-phone" className="text-amber-100">
                M-Pesa Phone Number
              </Label>
              <Input
                id="mpesa-phone"
                type="tel"
                placeholder="254712345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="bg-gray-800 border-gray-700 text-amber-100"
                disabled={loading}
              />
              <p className="text-xs text-amber-100/50">
                Enter your Safaricom M-Pesa registered number
              </p>
            </div>
          )}

          {/* Pay on Delivery Info */}
          {selectedMethod === "pay_on_delivery" && (
            <Card className="bg-gray-900 border-gray-800 mb-6">
              <CardHeader>
                <CardTitle className="text-[#ddd6cb] flex items-center gap-2">
                  <Truck className="w-5 h-5 text-amber-500" />
                  Pay on Delivery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-amber-100/70">
                  <p className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-500" />
                    Payment will be collected when your order is delivered
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-500" />
                    Cash payment accepted
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-500" />
                    Please have exact amount ready
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-500" />
                    Delivery fee may apply
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Status Messages */}
          {paymentStatus === "processing" && (
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-md text-blue-400 text-sm">
              Processing payment... Please wait
            </div>
          )}

          {paymentStatus === "success" && (
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md text-green-400 text-sm">
              Payment successful! Your order is being processed.
            </div>
          )}
        </div>

        {/* Footer with Action Buttons */}
        <div className="p-4 border-t border-amber-600/20 bg-gray-900/50">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-amber-600/20 text-amber-100 hover:bg-amber-600/10"
              disabled={loading}>
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              disabled={
                loading ||
                (selectedMethod === "mpesa" && !phoneNumber)
              }
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {selectedMethod === "mpesa" ? (
                    "Pay with M-Pesa"
                  ) : (
                    "Confirm Order"
                  )}
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}