import React from 'react';
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Shadcn UI Components (assuming standard paths)
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// --- Zod Schema Definition ---

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters long.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// --- Contact Form Component ---

interface ContactFormProps {
  onSubmit: (values: ContactFormValues) => void;
}

/**
 * Reusable contact form component utilizing react-hook-form and shadcn/ui.
 */
function ContactForm({ onSubmit }: ContactFormProps) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const handleSubmit = (values: ContactFormValues) => {
    // Simulate API call delay
    setTimeout(() => {
      onSubmit(values);
      form.reset();
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Subject Field */}
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Inquiry about..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message Field */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us how we can help you..."
                  className="resize-y min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
}

// --- ContactUsPage Component (Main Export) ---

function ContactUsPage() {
  const [submissionStatus, setSubmissionStatus] = React.useState<string | null>(null);

  const handleFormSubmit = (values: ContactFormValues) => {
    // In a real application, this is where you'd call an API (e.g., axios.post('/api/contact', values))
    console.log("Attempting to submit:", values);
    
    // Simulate success
    setSubmissionStatus("Thank you for reaching out! We have received your message and will respond shortly.");
    
    // Clear status after 5 seconds
    setTimeout(() => setSubmissionStatus(null), 5000);
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Contact Our Team</h1>
          <p className="mt-3 text-xl text-muted-foreground">
            We are here to answer your questions and provide support.
          </p>
        </header>

        {submissionStatus && (
          <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300 transition-opacity duration-300">
            {submissionStatus}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Contact Form Card (2/3 width on large screens) */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm onSubmit={handleFormSubmit} />
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Sidebar (1/3 width on large screens) */}
          <div className="lg:col-span-1 space-y-8 pt-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">General Inquiries</h3>
              <p className="text-muted-foreground">
                Email: <a href="mailto:info@example.com" className="text-primary hover:underline">info@example.com</a>
              </p>
              <p className="text-muted-foreground">
                Phone: (555) 123-4567
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Technical Support</h3>
              <p className="text-muted-foreground">
                For technical issues or bug reports, please contact:
              </p>
              <p className="text-muted-foreground">
                Email: <a href="mailto:support@example.com" className="text-primary hover:underline">support@example.com</a>
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Office Location</h3>
              <p className="text-muted-foreground">
                123 Main Street
                <br />
                Suite 400
                <br />
                Metropolis, 10001
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;