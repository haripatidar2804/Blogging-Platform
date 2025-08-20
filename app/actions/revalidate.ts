"use server";
import { revalidatePath } from "next/cache";

export async function revalidatePosts() {
  revalidatePath("/blog");
  revalidatePath("/");
}