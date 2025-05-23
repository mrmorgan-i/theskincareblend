import Products from "@/components/products/products";
import { db } from "@/server";
import Algolia from "@/components/products/algolia";
import ProductTags from "@/components/products/product-tags";
import WelcomeBanner from "@/components/navigation/welcome-banner";

export const revalidate = 60 * 60

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
        <ProductTags />
        <WelcomeBanner />
        <div id="products-section">
          <Products variants={data} />
      </div>
      </main>
    );
}
