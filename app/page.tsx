import Products from "@/components/products/products";
import { db } from "@/server";
import Algolia from "@/components/products/algolia";
import ProductTags from "@/components/products/product-tags";
import WelcomeBanner from "@/components/navigation/welcome-banner";
import { Suspense } from "react";

export const revalidate = 3600

export default async function Home() {
  const data = await db.query.productVariants.findMany({
    with: {
      variantImages: true,
      variantTags: true,
      product: true,
    },
    orderBy: (productVariants, {desc}) => [desc(productVariants.id)],
  })

    return (
      <main className="">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductTags />
        </Suspense>
        <WelcomeBanner />
        <div id="products-section">
          <Suspense fallback={<div>Loading products...</div>}>
            <Products variants={data} />
          </Suspense>
      </div>
      </main>
    );
}
