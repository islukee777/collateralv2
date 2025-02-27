
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, CreditCard, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { 
  Elements, 
  PaymentElement,
  useStripe, 
  useElements,
  CardElement,
  AddressElement 
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe with your publishable key
// In a real application, this should come from an environment variable
const stripePromise = loadStripe("pk_test_51OsjYVAANVMK4MbzOlBMhpO6rkTgdJlLv4Eha3u7WYGWZXJpynHGnZBv6uMXDgHuDgkj1eYAeFxRYc5zKqP0zMy300XZuJSTDm");

interface OrderFormProps {
  onBack: () => void;
  onComplete: () => void;
}

interface OrderDetails {
  venueName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  tableNumbers: string;
  quantity: number;
}

// The main OrderForm component that will wrap the payment form
const OrderForm = ({ onBack, onComplete }: OrderFormProps) => {
  return (
    <div className="bg-white/5 rounded-3xl p-6 premium-shadow animate-slide-in w-full max-w-2xl">
      <Elements stripe={stripePromise}>
        <OrderFormContent onBack={onBack} onComplete={onComplete} />
      </Elements>
    </div>
  );
};

// The actual form content component, wrapped with Stripe Elements
const OrderFormContent = ({ onBack, onComplete }: OrderFormProps) => {
  const { toast } = useToast();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    venueName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    tableNumbers: "",
    quantity: 1
  });

  const [errors, setErrors] = useState<Partial<OrderDetails>>({});
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Price calculations
  const PRICE_PER_COLLATERAL = 5.50;
  const VAT_RATE = 0.10; // 10%
  
  const subtotal = PRICE_PER_COLLATERAL * orderDetails.quantity;
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;

  const validateForm = (): boolean => {
    const newErrors: Partial<OrderDetails> = {};
    
    if (!orderDetails.venueName) newErrors.venueName = "Venue name is required";
    if (!orderDetails.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(orderDetails.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!orderDetails.phone) newErrors.phone = "Phone number is required";
    if (!orderDetails.address) newErrors.address = "Address is required";
    if (!orderDetails.city) newErrors.city = "City is required";
    if (!orderDetails.zipCode) newErrors.zipCode = "ZIP code is required";
    if (!orderDetails.tableNumbers) newErrors.tableNumbers = "Table numbers are required";
    if (orderDetails.quantity < 1) newErrors.quantity = "At least 1 collateral is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Create separate handlers for different input types
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof OrderDetails]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  // Handle quantity changes (number input)
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This is the problematic line - we need to convert the string to a number
    // The parseInt function converts a string to an integer
    const value = e.target.value;
    
    // If the value is empty, use 1 as default
    if (value === "") {
      setOrderDetails(prev => ({ ...prev, quantity: 1 }));
    } else {
      // Parse the string to a number and ensure it's a valid number
      const numValue = parseInt(value, 10);
      
      // Only update if it's a valid number
      if (!isNaN(numValue)) {
        setOrderDetails(prev => ({ ...prev, quantity: numValue }));
      }
    }
    
    // Clear error when field is edited
    if (errors.quantity) {
      setErrors(prev => ({ ...prev, quantity: undefined }));
    }
  };

  // In a real application, this function would create a payment intent
  // on your backend server and return the client secret
  const createPaymentIntent = async () => {
    // This would be a fetch call to your backend server
    // For example:
    /*
    try {
      const response = await fetch('https://your-server.com/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(total * 100), // Convert to cents
          currency: 'usd',
          metadata: {
            order_details: JSON.stringify(orderDetails)
          }
        }),
      });
      
      const data = await response.json();
      
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        throw new Error('Failed to get client secret');
      }
    } catch (error) {
      console.error('Error creating payment intent:', error);
      setPaymentError('Could not create payment. Please try again.');
      setIsProcessing(false);
    }
    */
    
    // For this demo, we'll simulate a client secret after a delay
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // In a real app, this would be returned from the server
        // setClientSecret('pi_3L7DjgAANVMK4Mbz1g6MrGk9_secret_A2lsrDk6K0nVnCQbGXZitIiqG');
        resolve();
      }, 1000);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe hasn't loaded yet
      toast({
        title: "Payment System Error",
        description: "The payment system is still initializing. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    // Reset payment error
    setPaymentError(null);
    
    // Validate form
    if (!validateForm()) {
      toast({
        title: "Form Validation Error",
        description: "Please check the form for errors and try again.",
        variant: "destructive",
      });
      return;
    }
    
    // Start payment processing
    setIsProcessing(true);
    
    try {
      // In a real app, you would:
      // 1. Create a payment intent on your server 
      // await createPaymentIntent();
      
      // 2. Confirm the card payment with the client secret
      /*
      if (clientSecret) {
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              name: orderDetails.venueName,
              email: orderDetails.email,
              address: {
                line1: orderDetails.address,
                city: orderDetails.city,
                postal_code: orderDetails.zipCode,
              }
            }
          }
        });

        if (error) {
          setPaymentError(error.message || "An error occurred with your payment.");
          setIsProcessing(false);
        } else if (paymentIntent.status === 'succeeded') {
          // Payment successful
          toast({
            title: "Payment Successful",
            description: `Thank you! Your payment of $${total.toFixed(2)} has been processed.`,
            variant: "default",
          });
          
          toast({
            title: "Order Placed Successfully",
            description: `Your order for ${orderDetails.quantity} collaterals has been placed.`,
            variant: "default",
          });
          
          setIsProcessing(false);
          onComplete();
        }
      }
      */
      
      // For demo, we'll simulate a successful payment after a delay
      setTimeout(async () => {
        // Simulate a successful payment
        toast({
          title: "Payment Successful",
          description: `Thank you! Your payment of $${total.toFixed(2)} has been processed.`,
          variant: "default",
        });
        
        toast({
          title: "Order Placed Successfully",
          description: `Your order for ${orderDetails.quantity} collaterals has been placed.`,
          variant: "default",
        });
        
        setIsProcessing(false);
        onComplete();
      }, 2000);
    } catch (err) {
      console.error('Payment error:', err);
      setPaymentError("An unexpected error occurred. Please try again.");
      setIsProcessing(false);
      
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Complete Your Order</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="border-white/20 text-white hover:bg-white/10"
          disabled={isProcessing}
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Design
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="venue-name">Venue Name</Label>
            <Input
              id="venue-name"
              name="venueName"
              value={orderDetails.venueName}
              onChange={handleTextChange}
              className={`bg-white/10 text-white ${errors.venueName ? "border-red-500" : ""}`}
              disabled={isProcessing}
            />
            {errors.venueName && (
              <p className="text-xs text-red-500">{errors.venueName}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={orderDetails.email}
              onChange={handleTextChange}
              className={`bg-white/10 text-white ${errors.email ? "border-red-500" : ""}`}
              disabled={isProcessing}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              value={orderDetails.phone}
              onChange={handleTextChange}
              className={`bg-white/10 text-white ${errors.phone ? "border-red-500" : ""}`}
              disabled={isProcessing}
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone}</p>
            )}
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Shipping Address</Label>
            <Input
              id="address"
              name="address"
              value={orderDetails.address}
              onChange={handleTextChange}
              className={`bg-white/10 text-white ${errors.address ? "border-red-500" : ""}`}
              disabled={isProcessing}
            />
            {errors.address && (
              <p className="text-xs text-red-500">{errors.address}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              value={orderDetails.city}
              onChange={handleTextChange}
              className={`bg-white/10 text-white ${errors.city ? "border-red-500" : ""}`}
              disabled={isProcessing}
            />
            {errors.city && (
              <p className="text-xs text-red-500">{errors.city}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              name="zipCode"
              value={orderDetails.zipCode}
              onChange={handleTextChange}
              className={`bg-white/10 text-white ${errors.zipCode ? "border-red-500" : ""}`}
              disabled={isProcessing}
            />
            {errors.zipCode && (
              <p className="text-xs text-red-500">{errors.zipCode}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tableNumbers">Table Numbers (e.g., 1-100, A-Z)</Label>
            <Input
              id="tableNumbers"
              name="tableNumbers"
              value={orderDetails.tableNumbers}
              onChange={handleTextChange}
              placeholder="e.g., 1-100 or A-Z"
              className={`bg-white/10 text-white ${errors.tableNumbers ? "border-red-500" : ""}`}
              disabled={isProcessing}
            />
            {errors.tableNumbers && (
              <p className="text-xs text-red-500">{errors.tableNumbers}</p>
            )}
            <p className="text-xs text-gray-400">
              Specify the range or specific table numbers needed for your collaterals
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity">Number of Collaterals Needed</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              value={orderDetails.quantity}
              onChange={handleQuantityChange}
              className={`bg-white/10 text-white ${errors.quantity ? "border-red-500" : ""}`}
              disabled={isProcessing}
            />
            {errors.quantity && (
              <p className="text-xs text-red-500">{errors.quantity}</p>
            )}
          </div>
        </div>
        
        {/* Payment Section */}
        <div className="space-y-4 pt-6 border-t border-white/10">
          <h3 className="text-lg font-semibold text-white">Payment Information</h3>
          
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="space-y-4">
              <div>
                <Label htmlFor="card-element">Card Details</Label>
                <div className="mt-1 p-3 bg-white/10 rounded-md">
                  <CardElement 
                    id="card-element"
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#ffffff',
                          '::placeholder': {
                            color: '#aab7c4',
                          },
                        },
                        invalid: {
                          color: '#ef4444',
                        },
                      },
                    }}
                  />
                </div>
                {paymentError && (
                  <p className="mt-1 text-xs text-red-500">{paymentError}</p>
                )}
                <p className="mt-2 text-xs text-gray-400">
                  Your payment information is securely processed by Stripe. We don't store your card details.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="pt-6 border-t border-white/10">
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Price per collateral:</span>
                <span>${PRICE_PER_COLLATERAL.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Quantity:</span>
                <span>{orderDetails.quantity}</span>
              </div>
              <div className="flex justify-between items-center font-medium">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>VAT (10%):</span>
                <span>${vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-white/10 text-lg font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <Button 
            type="submit" 
            className="meandu-button" 
            disabled={isProcessing || !stripe || !elements}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Pay ${total.toFixed(2)}
                <CreditCard className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </>
  );
};

export default OrderForm;
