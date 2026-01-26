import React, { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
// NOTE: Assuming standard shadcn/ui component paths. If toast is required for feedback, 
// ensure '@/components/ui/use-toast' is configured in the project.

// --- Reusable Contact Form Component ---

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Placeholder for API call
    console.log('Submitting form data:', formData);

    // Simulate network delay and response
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Success handling: Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // In a real application, use toast or similar notification system here.
      console.log('Message Sent Successfully!');
      
    }, 1500);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Send us a message</CardTitle>
        <CardDescription>We'd love to hear from you. Fill out the form below.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              type="text"
              placeholder="Inquiry about..."
              value={formData.subject}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message here."
              value={formData.message}
              onChange={handleChange}
              rows={5}
              disabled={isSubmitting}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Submit Message'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};


// --- Main Page Component ---

function ContactUsPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-background">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground">
            Contact Us
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            We are dedicated to providing excellent support. Reach out to us using the form below or through our direct contact channels.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Information Section */}
          <div className="lg:col-span-1 space-y-8 p-6 rounded-lg border bg-card text-card-foreground h-fit">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Our Details</h2>
            
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">Email Support</h3>
              <p className="text-muted-foreground">support@example.com</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold text-lg">Phone</h3>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold text-lg">Office Hours</h3>
              <p className="text-muted-foreground">Mon - Fri: 9:00 AM - 5:00 PM (EST)</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold text-lg">Address</h3>
              <p className="text-muted-foreground">
                123 Tech Lane, Suite 400<br/>
                Innovation City, CA 90210
              </p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;