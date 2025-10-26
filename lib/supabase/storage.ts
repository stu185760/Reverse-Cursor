"use client"

import { getSupabaseClient } from "./client"

export type StorageBucket = "ad-images" | "classified-images" | "profile-photos"

/**
 * Upload an image to Supabase Storage
 * @param bucket - The storage bucket (ad-images, classified-images, or profile-photos)
 * @param file - The file to upload
 * @param userId - The user ID (creates a folder for organization)
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(
  bucket: StorageBucket,
  file: File,
  userId: string
): Promise<string> {
  const supabase = getSupabaseClient()
  
  // Create unique filename
  const fileExt = file.name.split(".").pop()
  const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  
  // Upload file
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    })
  
  if (error) {
    console.error("Error uploading image:", error)
    throw new Error(`Failed to upload image: ${error.message}`)
  }
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path)
  
  return publicUrl
}

/**
 * Upload multiple images to Supabase Storage
 * @param bucket - The storage bucket
 * @param files - Array of files to upload
 * @param userId - The user ID
 * @returns Array of public URLs
 */
export async function uploadImages(
  bucket: StorageBucket,
  files: File[],
  userId: string
): Promise<string[]> {
  const uploadPromises = files.map((file) => uploadImage(bucket, file, userId))
  return Promise.all(uploadPromises)
}

/**
 * Delete an image from Supabase Storage
 * @param bucket - The storage bucket
 * @param imageUrl - The public URL of the image to delete
 */
export async function deleteImage(bucket: StorageBucket, imageUrl: string): Promise<void> {
  const supabase = getSupabaseClient()
  
  // Extract the path from the public URL
  const urlParts = imageUrl.split(`/${bucket}/`)
  if (urlParts.length < 2) {
    throw new Error("Invalid image URL")
  }
  
  const filePath = urlParts[1]
  
  const { error } = await supabase.storage
    .from(bucket)
    .remove([filePath])
  
  if (error) {
    console.error("Error deleting image:", error)
    throw new Error(`Failed to delete image: ${error.message}`)
  }
}

/**
 * Delete multiple images from Supabase Storage
 * @param bucket - The storage bucket
 * @param imageUrls - Array of public URLs to delete
 */
export async function deleteImages(bucket: StorageBucket, imageUrls: string[]): Promise<void> {
  const deletePromises = imageUrls.map((url) => deleteImage(bucket, url))
  await Promise.all(deletePromises)
}

/**
 * Convert File to base64 data URL (for preview before upload)
 * @param file - The file to convert
 * @returns Base64 data URL
 */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * Validate image file
 * @param file - The file to validate
 * @param maxSizeMB - Maximum file size in MB (default: 5)
 * @returns true if valid, throws error otherwise
 */
export function validateImageFile(file: File, maxSizeMB: number = 5): boolean {
  // Check file type
  const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
  if (!validTypes.includes(file.type)) {
    throw new Error("Invalid file type. Please upload a JPEG, PNG, or WebP image.")
  }
  
  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  if (file.size > maxSizeBytes) {
    throw new Error(`File size exceeds ${maxSizeMB}MB limit.`)
  }
  
  return true
}

/**
 * Resize and compress image before upload (client-side)
 * @param file - The file to resize
 * @param maxWidth - Maximum width in pixels (default: 1200)
 * @param maxHeight - Maximum height in pixels (default: 1200)
 * @param quality - JPEG quality (default: 0.8)
 * @returns Compressed File
 */
export async function compressImage(
  file: File,
  maxWidth: number = 1200,
  maxHeight: number = 1200,
  quality: number = 0.8
): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target?.result as string
      img.onload = () => {
        const canvas = document.createElement("canvas")
        let width = img.width
        let height = img.height
        
        // Calculate new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height
            height = maxHeight
          }
        }
        
        canvas.width = width
        canvas.height = height
        
        const ctx = canvas.getContext("2d")
        ctx?.drawImage(img, 0, 0, width, height)
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              })
              resolve(compressedFile)
            } else {
              reject(new Error("Failed to compress image"))
            }
          },
          "image/jpeg",
          quality
        )
      }
      img.onerror = reject
    }
    reader.onerror = reject
  })
}

