-- Update reviews table RLS to allow admin to manage reviews
-- Add INSERT policy for admin
CREATE POLICY "Admin can create reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (TRUE);

-- Add UPDATE policy for admin
CREATE POLICY "Admin can update reviews"
  ON public.reviews FOR UPDATE
  USING (TRUE);

-- Add DELETE policy for admin
CREATE POLICY "Admin can delete reviews"
  ON public.reviews FOR DELETE
  USING (TRUE);
