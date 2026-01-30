import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { Button } from '@/components/ui/button.tsx';

function AboutPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-extrabold text-primary">About Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 text-lg text-gray-700 dark:text-gray-300">
          <p>
            Welcome to our e-commerce platform! We are a passionate team dedicated to bringing you a seamless and enjoyable online shopping experience. Our mission is to connect you with high-quality products that enhance your daily life, all while providing exceptional customer service.
          </p>

          <Separator />

          <section>
            <h3 className="text-2xl font-semibold text-secondary mb-4">Our Story</h3>
            <p>
              Founded in [Year], our journey began with a simple idea: to create an online marketplace where quality meets convenience. We started small, driven by a commitment to curate a diverse selection of products and build a community around shared values. Over the years, we've grown, but our core principles remain the same.
            </p>
          </section>

          <Separator />

          <section>
            <h3 className="text-2xl font-semibold text-secondary mb-4">Our Values</h3>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Customer Satisfaction:</strong> Your happiness is our ultimate goal. We strive to exceed your expectations with every interaction.</li>
              <li><strong>Quality Assurance:</strong> We meticulously select and vet every product to ensure it meets our high standards of quality and durability.</li>
              <li><strong>Integrity & Transparency:</strong> We believe in honest communication and ethical practices in all our dealings.</li>
              <li><strong>Innovation:</strong> We continuously seek new ways to improve our platform, product offerings, and services to serve you better.</li>
              <li><strong>Community:</strong> We aim to foster a vibrant and supportive community, valuing feedback and building lasting relationships.</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h3 className="text-2xl font-semibold text-secondary mb-4">Our Commitment</h3>
            <p>
              We are committed to providing a secure, user-friendly, and reliable shopping environment. From browsing to checkout, we ensure your data is protected and your experience is smooth. We also believe in giving back and are actively involved in [mention any social/environmental initiatives if applicable, or remove this sentence].
            </p>
          </section>

          <p className="text-center pt-6 text-xl font-medium">
            Thank you for being a part of our journey. We look forward to serving you!
          </p>

          <div className="flex justify-center pt-6">
            {/* This button could navigate to the home page or a contact page, depending on routing setup */}
            <Button className="px-8 py-3 text-lg">Explore Products</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AboutPage;