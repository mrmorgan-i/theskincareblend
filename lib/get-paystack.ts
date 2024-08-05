const getPaystackPublicKey = () => {
    const publicKey = process.env.NEXT_PUBLIC_PUBLISH_KEY!;
    if (!publicKey) {
      throw new Error("Paystack public key is not set in environment variables");
    }
    return publicKey;
  }
  
  export default getPaystackPublicKey;
  