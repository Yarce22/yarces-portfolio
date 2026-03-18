import { revalidateTag, revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const body = await req.json();
  const contentType = body?.sys?.contentType?.sys?.id;

  const tagMap: Record<string, string[]> = {
    portfolioProject: ["projects"],
    certificate: ["certificates"],
    tool: ["tools"],
  };

  const tags = tagMap[contentType] ?? ["all"];
  for (const tag of tags) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (revalidateTag as (tag: string) => void)(tag);
  }
  revalidatePath("/");
  revalidatePath("/proyectos");
  revalidatePath("/certificados");

  return NextResponse.json({ revalidated: true, tags });
}
