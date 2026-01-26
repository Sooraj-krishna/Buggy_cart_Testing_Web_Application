import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

// Define the schema for the contact form
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }).max(50, {
    message: 'Name must not exceed 50 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  subject: z.string().min(5, {
    message: 'Subject must be at least 5 characters.',
  }).max(100, {
    message: 'Subject must not exceed 100 characters.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }).max(500, {
    message: 'Message must not exceed 500 characters.',
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// Default values for the form
const defaultValues: Partial<ContactFormValues> = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  // Handle form submission
  function onSubmit(data: ContactFormValues) {
    // Simulate API call
    console.log('Contact Form Submitted:', data);

    // Simulate a delay for submission feedback
    form.setValue('name', data.name); // Keep name value during submission simulation
    form.setValue('email', data.email); // Keep email value during submission simulation
    
    // In a real application, you would handle the API call here
    setTimeout(() => {
        toast({
            title: 'Message Sent!',
            description: `Thank you, ${data.name}. We have received your message and will respond to ${data.email} shortly.`,
        });

        // Reset the form after successful submission
        form.reset(defaultValues);
    }, 1000);
  }

  return (
    <div className="flex justify-center p-4 sm:p-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Contact Us</CardTitle>
          <CardDescription>
            We'd love to hear from you! Fill out the form below and we will get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
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
                    <FormDescription>
                      We will never share your email.
                    </FormDescription>
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
                        placeholder="Type your message here..."
                        className="resize-y min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ContactForm;