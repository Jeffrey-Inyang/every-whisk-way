-- Remove category constraint from merchandise table if it exists
ALTER TABLE public.merchandise DROP CONSTRAINT IF EXISTS merchandise_category_check;

-- Verify the merchandise table has correct schema
-- The table should only have: id, name, image_url, price, created_at, updated_at
SELECT * FROM information_schema.columns 
WHERE table_name = 'merchandise' 
ORDER BY ordinal_position;
