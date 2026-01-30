import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import ContactForm from '@/components/ContactForm.tsx';

function ContactUsPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Get in Touch
          </CardTitle>
          <p className="text-lg text-muted-foreground mt-3">
            We're here to help! Send us a message and we'll get back to you as soon as possible.
          </p>
        </CardHeader>
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default ContactUsPage;