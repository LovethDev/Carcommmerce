/*
  # Create cars table for e-commerce website

  1. New Tables
    - `cars`
      - `id` (uuid, primary key)
      - `model` (text) - Car model name
      - `brand` (text) - Car brand/manufacturer
      - `year` (integer) - Manufacturing year
      - `price` (numeric) - Car price
      - `description` (text) - Car description and specs
      - `image_url` (text) - URL to car image
      - `created_at` (timestamp) - Record creation time
      - `updated_at` (timestamp) - Record update time

  2. Security
    - Enable RLS on `cars` table
    - Add policy for public read access
    - Add policy for authenticated users to manage cars
*/

CREATE TABLE IF NOT EXISTS cars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model text NOT NULL,
  brand text NOT NULL,
  year integer NOT NULL,
  price numeric(10,2) NOT NULL,
  description text,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- Policy for public read access
CREATE POLICY "Anyone can view cars"
  ON cars
  FOR SELECT
  TO public
  USING (true);

-- Policy for authenticated users to insert cars
CREATE POLICY "Authenticated users can insert cars"
  ON cars
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy for authenticated users to update cars
CREATE POLICY "Authenticated users can update cars"
  ON cars
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy for authenticated users to delete cars
CREATE POLICY "Authenticated users can delete cars"
  ON cars
  FOR DELETE
  TO authenticated
  USING (true);

-- Create storage bucket for car images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('car-images', 'car-images', true)
ON CONFLICT (id) DO NOTHING;

-- Policy for public access to car images
CREATE POLICY "Anyone can view car images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'car-images');

-- Policy for authenticated users to upload car images
CREATE POLICY "Authenticated users can upload car images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'car-images');

-- Policy for authenticated users to delete car images
CREATE POLICY "Authenticated users can delete car images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'car-images');