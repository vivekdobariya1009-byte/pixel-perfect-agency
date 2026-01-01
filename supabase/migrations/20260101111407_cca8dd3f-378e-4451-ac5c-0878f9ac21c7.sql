-- Create enum for admin roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create inquiries table to store contact form submissions
CREATE TABLE public.inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create SMTP settings table
CREATE TABLE public.smtp_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  host TEXT NOT NULL DEFAULT 'smtp.gmail.com',
  port INTEGER NOT NULL DEFAULT 587,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  from_email TEXT NOT NULL,
  from_name TEXT NOT NULL DEFAULT 'Shunyek Infotech',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  UNIQUE (user_id, role)
);

-- Enable RLS on all tables
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.smtp_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for inquiries (admins can read/update, anyone can insert)
CREATE POLICY "Anyone can submit inquiries"
ON public.inquiries
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view all inquiries"
ON public.inquiries
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update inquiries"
ON public.inquiries
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete inquiries"
ON public.inquiries
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS policies for SMTP settings (admins only)
CREATE POLICY "Admins can manage SMTP settings"
ON public.smtp_settings
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for updated_at
CREATE TRIGGER update_inquiries_updated_at
BEFORE UPDATE ON public.inquiries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_smtp_settings_updated_at
BEFORE UPDATE ON public.smtp_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();