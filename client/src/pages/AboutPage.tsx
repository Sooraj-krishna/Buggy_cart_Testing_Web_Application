import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Separator } from '@/components/ui/separator.tsx';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">About Our Company</h1>
        <p className="mt-2 text-lg text-muted-foreground">Our vision, mission, and core values driving us forward.</p>
      </header>

      <div className="space-y-10">
        {/* Mission Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-semibold">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              To revolutionize the e-commerce experience by providing high-quality, sustainable products accessible to everyone, fostering a community built on trust, innovation, and exceptional customer service. We strive to make conscious consumption the standard, not the exception.
            </p>
          </CardContent>
        </Card>

        <Separator className="my-6" />

        {/* Values Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-semibold">Our Core Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Value 1: Integrity */}
              <div className="p-4 border rounded-lg bg-background shadow-sm">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  Integrity
                </h3>
                <p className="text-sm text-muted-foreground">
                  We operate with transparency and honesty in all our dealings, ensuring trust with our customers and partners.
                </p>
              </div>

              {/* Value 2: Innovation */}
              <div className="p-4 border rounded-lg bg-background shadow-sm">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  Innovation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Continuously seeking better ways to serve our customers, improve our products, and streamline our operations.
                </p>
              </div>

              {/* Value 3: Sustainability */}
              <div className="p-4 border rounded-lg bg-background shadow-sm">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  Sustainability
                </h3>
                <p className="text-sm text-muted-foreground">
                  Committed to minimizing our environmental footprint through responsible sourcing and eco-friendly practices.
                </p>
              </div>

              {/* Value 4: Customer Focus */}
              <div className="p-4 border rounded-lg bg-background shadow-sm">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  Customer Focus
                </h3>
                <p className="text-sm text-muted-foreground">
                  Placing the needs and satisfaction of our customers at the heart of every decision we make.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;