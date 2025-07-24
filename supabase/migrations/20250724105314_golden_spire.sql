/*
  # Add image_urls column to cars table

  1. Changes
    - Add `image_urls` column to store multiple image URLs as JSON array
    - This allows cars to have multiple images while maintaining backward compatibility

  2. Notes
    - Existing `image_url` column remains for primary image
    - New `image_urls` column stores array of all images
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'cars' AND column_name = 'image_urls'
  ) THEN
    ALTER TABLE cars ADD COLUMN image_urls jsonb;
  END IF;
END $$;