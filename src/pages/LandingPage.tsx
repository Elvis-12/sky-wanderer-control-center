
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Plane,
  Search,
  Shield,
  Star,
  Clock,
  ChevronRight,
  MapPin,
  Calendar,
} from "lucide-react";

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  
  // Popular destinations data
  const popularDestinations = [
    {
      id: 1,
      name: "New York",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1470&auto=format&fit=crop",
      price: 349,
    },
    {
      id: 2,
      name: "Paris",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1473&auto=format&fit=crop",
      price: 399,
    },
    {
      id: 3,
      name: "Tokyo",
      image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=1336&auto=format&fit=crop",
      price: 599,
    },
    {
      id: 4,
      name: "London",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1470&auto=format&fit=crop",
      price: 449,
    },
  ];

  // Features data
  const features = [
    {
      icon: Plane,
      title: "Worldwide Coverage",
      description: "Fly to over 300 destinations across 6 continents with FLYAIR",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Industry-leading safety measures and secure booking process",
    },
    {
      icon: Star,
      title: "Premium Experience",
      description: "Enjoy top-rated service and comfort on every journey",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Our customer service team is always available to assist you",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-xl font-bold">
              <Plane className="h-6 w-6" />
              <span>FLYAIR</span>
            </div>
            <div className="space-x-4">
              {isAuthenticated ? (
                <Button variant="outline" asChild>
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/signup">Sign up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24 px-4">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold">Your Journey Begins with FLYAIR</h1>
            <p className="text-lg opacity-90">
              Experience exceptional service, competitive prices, and a seamless booking experience.
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <Link to="/signup">
                  Book Your Flight <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">Explore Destinations</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1474&auto=format&fit=crop"
              alt="Airplane view"
              className="rounded-lg max-w-md w-full shadow-xl transform rotate-1"
            />
          </div>
        </div>
      </section>

      {/* Search Box */}
      <section className="bg-background py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-5xl mx-auto -mt-16 z-10 shadow-lg">
            <CardHeader>
              <CardTitle>Find your next destination</CardTitle>
              <CardDescription>
                Search for flights to hundreds of destinations worldwide.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">From</label>
                  <div className="flex items-center border rounded-md p-2 bg-background">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Departure city"
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">To</label>
                  <div className="flex items-center border rounded-md p-2 bg-background">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Arrival city"
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <div className="flex items-center border rounded-md p-2 bg-background">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Select date"
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full sm:w-auto" onClick={() => alert("To search for flights, please sign up or log in")}>
                <Search className="mr-2 h-4 w-4" /> Search Flights
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-2">Popular Destinations</h2>
          <p className="text-muted-foreground text-center mb-12">
            Discover our most sought-after flight destinations
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination) => (
              <Card key={destination.id} className="overflow-hidden hover-scale">
                <div className="h-48 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold">{destination.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-muted-foreground">From</span>
                    <span className="text-xl font-bold">${destination.price}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/signup">View Flights</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-2">Why Choose FLYAIR</h2>
          <p className="text-muted-foreground text-center mb-12">
            We're committed to making your travel experience exceptional
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover-shadow bg-white dark:bg-card">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start your journey?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied travelers who choose FLYAIR for their travel needs. 
            Sign up today and unlock exclusive deals and promotions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/signup">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 mt-auto">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xl font-bold mb-4">
                <Plane className="h-5 w-5" />
                <span>FLYAIR</span>
              </div>
              <p className="text-slate-300">
                Your trusted companion for air travel around the globe.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/login" className="text-slate-300 hover:text-white">Book a Flight</Link></li>
                <li><Link to="/login" className="text-slate-300 hover:text-white">Check-in</Link></li>
                <li><Link to="/login" className="text-slate-300 hover:text-white">Flight Status</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-slate-300">
                <li>123 Airport Road</li>
                <li>Global City, CA 90210</li>
                <li>support@flyair.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} FLYAIR. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
