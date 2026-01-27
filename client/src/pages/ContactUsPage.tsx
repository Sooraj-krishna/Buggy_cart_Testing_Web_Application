import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, MapPin } from 'lucide-react';

// Shadcn UI components
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx';
import { useToast } from '@/hooks/use-toast.ts';

// Define the schema for the contact form
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  subject: z.string().min(5, {
    message: 'Subject must be at least 5 characters.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const defaultValues: ContactFormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

function ContactUsPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    console.log('Contact Form Submitted:', data);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real application, you would send this data to a backend endpoint.
    try {
      // const response = await api.post('/contact', data);
      
      toast({
        title: 'Message Sent!',
        description: 'Thank you for reaching out. We will respond shortly.',
        variant: 'default',
      });
      form.reset();
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: 'There was an error sending your message. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Get In Touch
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          We'd love to hear from you! Send us a message or find our contact details below.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Information Section */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Reach out to us through our primary channels.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <a href="mailto:support@ecommerce.com" className="text-sm text-muted-foreground hover:text-primary">
                    support@ecommerce.com
                  </a>
                </div>
              </div>
              <Separator />
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Office Address</p>
                  <p className="text-sm text-muted-foreground">
                    123 Commerce Street, Suite 400
                    <br />
                    Tech City, CA 90210
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
            <CardDescription>Fill out the form below and we will get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} disabled={isSubmitting} />
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
                          <Input type="email" placeholder="john.doe@example.com" {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Subject Field */}
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Inquiry about product X" {...field} disabled={isSubmitting} />
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
                          placeholder="Type your message here..."
                          rows={6}
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ContactUsPage;