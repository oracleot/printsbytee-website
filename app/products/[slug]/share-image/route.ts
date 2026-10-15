import path from "node:path";
import sharp from "sharp";
import { getProductBySlug, products } from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const product = getProductBySlug((await params).slug);
  if (!product?.images[0]) {
    return new Response("Product not found", { status: 404 });
  }

  // Only catalog-owned local files are read; the full photo stays uncropped.
  const image = await sharp(path.join(process.cwd(), "public", product.images[0]))
    .rotate()
    .resize(1200, 630, { fit: "contain", background: "#F5F0E8" })
    .jpeg({ quality: 75, mozjpeg: true })
    .toBuffer();

  if (image.byteLength > 300_000) {
    throw new Error(`Share image exceeds the size budget: ${product.slug}`);
  }

  return new Response(new Uint8Array(image), {
    headers: { "Content-Type": "image/jpeg" },
  });
}
