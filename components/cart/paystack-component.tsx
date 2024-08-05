import { useState, useEffect } from "react";
import { PaystackButton } from "react-paystack";
import { PaystackProps } from "react-paystack/dist/types";
import { useCartStore, CartItem } from "@/lib/client-store";
import { toast } from "sonner";
import { createOrder } from "@/server/actions/create-order";
import { User, Mail, Phone } from "lucide-react";
import { Button } from "../ui/button";

type ReferenceObj = {
    message: string;
    reference: string;
    status: "success" | "failure";
    trans: string;
    transaction: string;
    trxref: string;
};

interface PaystackComponentProps {
    publicKey: string;
    cart: CartItem[];
}

const PaystackComponent: React.FC<PaystackComponentProps> = ({ publicKey, cart }): JSX.Element => {
    const { clearCart, setCheckoutProgress, setCartOpen } = useCartStore();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [ref, setRef] = useState("");

    useEffect(() => {
        setRef("" + Math.floor(Math.random() * 1000000000 + 1));
    }, []);

    const totalPrice = cart.reduce((acc, item) => {
        return acc + item.price * item.variant.quantity;
    }, 0);

    const handlePaymentSuccess = async (reference: ReferenceObj) => {
        try {
            const orderProducts = cart.map(item => ({
                productID: item.id,
                variantID: item.variant.variantID,
                quantity: item.variant.quantity
            }));

            const result = await createOrder({
                products: orderProducts,
                status: "paid",
                total: totalPrice
            });

            if ('error' in result) {
                toast.error("An error occurred, please try again");
            } else {
                toast.success("Thanks for doing business with us! Come back soon!!");
                setCheckoutProgress("confirmation-page");
                clearCart();
                setCartOpen(true);
            }
        } catch (error) {
            console.error("Error creating order:", error);
            toast.error("There was an error processing your order. Please try again.");
        }
    };

    const config: PaystackProps = {
        reference: ref,
        email: email,
        amount: totalPrice * 100, // Amount in kobo
        publicKey: publicKey,
        firstname: name,
        lastname: surname,
        phone,
        label: `${name} ${surname}`,
        currency: "GHS",
        channels: ["card", "mobile_money", "bank"],
    };

    const componentProps = {
        ...config,
        text: "Pay Now",
        onSuccess: (reference: ReferenceObj) => handlePaymentSuccess(reference),
        onClose: () => toast.error("Payment cancelled"),
    };

    return (
        <div className="flex flex-col md:flex-row gap-6">
            {/* Form Section */}
            <div className="md:w-2/3 bg-card p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-center text-foreground">Checkout</h2>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">
                            First Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                            <input
                                type="text"
                                id="name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="John"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="surname" className="block text-sm font-medium text-muted-foreground">
                            Last Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                            <input
                                type="text"
                                id="surname"
                                required
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Doe"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                            <input
                                type="email"
                                id="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="john.doe@example.com"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground">
                            Phone
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                            <input
                                type="tel"
                                id="phone"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="+233 XX XXX XXXX"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Summary Section */}
            <div className="md:w-1/3 bg-secondary p-6 rounded-lg shadow-md self-start">
                <h3 className="text-lg font-semibold mb-4 text-secondary-foreground">Order Summary</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {cart.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">{item.name} x {item.variant.quantity}</span>
                            <span className="text-sm font-medium text-foreground">₵{(item.price * item.variant.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                <div className="border-t border-border mt-4 pt-4 flex justify-between items-center">
                    <span className="font-semibold text-foreground">Total:</span>
                    <span className="font-semibold text-primary">₵{totalPrice.toFixed(2)}</span>
                </div>
                <div className="mt-6">
                    <Button onClick={() => setCartOpen(false)} className="w-full" variant={'ghost'}>
                        <PaystackButton
                            {...componentProps}
                            className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-md hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center"
                        />
                    </Button>
                    
                </div>
            </div>
            
        </div>
    );
};

export default PaystackComponent;