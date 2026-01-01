import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InquiryRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { name, email, phone, message }: InquiryRequest = await req.json();

    console.log("Received inquiry from:", name, email);

    // Validate input
    if (!name || !email || !phone || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Save inquiry to database
    const { data: inquiry, error: dbError } = await supabase
      .from("inquiries")
      .insert({
        name,
        email,
        phone,
        message,
        status: "pending",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save inquiry" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Inquiry saved:", inquiry.id);

    // Try to get SMTP settings
    const { data: smtpSettings } = await supabase
      .from("smtp_settings")
      .select("*")
      .limit(1)
      .maybeSingle();

    // If SMTP is configured, send email
    if (smtpSettings) {
      console.log("SMTP settings found, attempting to send email...");
      
      try {
        // Construct email content
        const emailContent = `
          New Inquiry from Website
          
          Name: ${name}
          Email: ${email}
          Phone: ${phone}
          
          Message:
          ${message}
          
          ---
          This inquiry was submitted on ${new Date().toLocaleString()}
        `;

        // Use nodemailer-compatible approach for Deno
        const smtpAuth = btoa(`${smtpSettings.username}:${smtpSettings.password}`);
        
        console.log("Email notification would be sent to:", smtpSettings.from_email);
        // Note: Full SMTP implementation requires additional setup
        // For now, the inquiry is saved and can be viewed in admin panel
        
      } catch (emailError) {
        console.error("Email send error:", emailError);
        // Don't fail the request if email fails - inquiry is still saved
      }
    } else {
      console.log("No SMTP settings configured - skipping email notification");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Inquiry submitted successfully",
        id: inquiry.id 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error: any) {
    console.error("Error in submit-inquiry function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);