import { v2 as cloudinary } from 'cloudinary';

let isCloudinaryConfigured = false;

function ensureCloudinary() {
  if (isCloudinaryConfigured) return true;
  
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  
  if (!cloudName || !apiKey || !apiSecret) {
    console.warn('⚠️ Cloudinary credentials (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are not configured. Images will fallback gracefully.');
    return false;
  }
  
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
  });
  
  isCloudinaryConfigured = true;
  return true;
}

/**
 * Uploads a base64 image or a remote URL to Cloudinary
 * @param base64OrUrl Base64 data string or remote image URL
 * @returns Cloudinary secure secure_url or original string if skipped/failed
 */
export async function uploadToCloudinary(base64OrUrl: string): Promise<string> {
  if (!base64OrUrl) return '';
  if (!base64OrUrl.startsWith('data:image/')) {
    // Return unchanged if it is already a public link
    return base64OrUrl;
  }
  
  const configured = ensureCloudinary();
  if (!configured) {
    return base64OrUrl;
  }
  
  try {
    const result = await cloudinary.uploader.upload(base64OrUrl, {
      folder: 'motogear-hub',
      resource_type: 'image'
    });
    return result.secure_url;
  } catch (err) {
    console.error('Cloudinary Upload Error:', err);
    return base64OrUrl;
  }
}

/**
 * Deletes an image from Cloudinary given its public secure URL
 * @param url Cloudinary secure URL
 * @returns boolean indicating success of the operation
 */
export async function deleteFromCloudinary(url: string): Promise<boolean> {
  if (!url || !url.includes('cloudinary.com')) return false;
  const configured = ensureCloudinary();
  if (!configured) return false;
  
  try {
    // Secure url formats: https://res.cloudinary.com/cloud_name/image/upload/v12345/folder/public_id.ext
    const parts = url.split('/');
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex === -1) return false;
    
    // Extract everything after /upload/vXXXXXX/ to get the full public id (excluding file extension)
    const publicIdWithVersionAndFolder = parts.slice(uploadIndex + 1).join('/');
    // Strip version prefix if present (e.g. v1234567/)
    let publicIdWithFolder = publicIdWithVersionAndFolder;
    const versionMatch = publicIdWithVersionAndFolder.match(/^v\d+\/(.+)$/);
    if (versionMatch) {
      publicIdWithFolder = versionMatch[1];
    }
    
    // Remove the extension
    const publicId = publicIdWithFolder.replace(/\.[^/.]+$/, "");
    
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (err) {
    console.error('Cloudinary Deletion Error:', err);
    return false;
  }
}
