export interface MediaAsset {
  id: string;
  url: string;
  pathname?: string;
  alt?: string;
  width?: number;
  height?: number;
  mimeType?: string;
}

export interface GalleryCategory {
  id: string;
  name: string;
  slug: string;
}

export interface GalleryItem {
  id: string;
  title?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  alt: string;
  artist?: string;
  artistUrl?: string;
  sourceUrl?: string;
  categoryId: string;
  publishedAt?: string; // ISO-8601
  isFeatured?: boolean;
}
