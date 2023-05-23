import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const SANITY_WEBHOOK_SECRET = `${process.env.SANITY_WEBHOOK_SECRET}`;
 
export async function POST(request: NextRequest) {
  // Await the response from our request.
  const res = await request.json();
  
  // Get headers.
  const headersList = headers();

  // Get Sanity webhook signature header name.
  const signature = `${headersList.get(SIGNATURE_HEADER_NAME)}`;
  const isValid = isValidSignature(JSON.stringify(res), signature, SANITY_WEBHOOK_SECRET);

  // Log out validity of request. 
  console.log(`===== Is the webhook request valid? ${isValid}`);

  // If not valid, return.
  if (!isValid) {
    NextResponse.json({ success: false, message: 'Invalid signature' });
    return;
  }

  const slug = res.slug;
  const locale = res.locale;
  const type = res.type;
  let pathToRevalidate = "";

  if (type === "home") {
    pathToRevalidate = `${slug}`
  } else {
    pathToRevalidate = `/${locale}${slug}`
  }

  revalidatePath(pathToRevalidate);

  console.log(`===== Revalidated path: ${pathToRevalidate}`);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}