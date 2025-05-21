
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Calendar, Ticket, Plane, ArrowRight } from "lucide-react";

// Mock booking data
const mockBookings = [
  {
    id: "B1001",
    flightNumber: "SK101",
    origin: "New York (JFK)",
    destination: "London (LHR)",
    departureDate: "2023-06-15",
    returnDate: "2023-06-22",
    passengers: 1,
    totalPrice: 450.99,
    status: "confirmed",
  },
  {
    id: "B1002",
    flightNumber: "SK205",
    origin: "San Francisco (SFO)",
    destination: "Tokyo (HND)",
    departureDate: "2023-07-10",
    returnDate: null,
    passengers: 2,
    totalPrice: 1200.50,
    status: "processing",
  },
  {
    id: "B1003",
    flightNumber: "SK310",
    origin: "Paris (CDG)",
    destination: "Rome (FCO)",
    departureDate: "2023-08-05",
    returnDate: "2023-08-12",
    passengers: 3,
    totalPrice: 780.25,
    status: "confirmed",
  },
  {
    id: "B1004",
    flightNumber: "SK422",
    origin: "London (LHR)",
    destination: "New York (JFK)",
    departureDate: "2023-05-20",
    returnDate: "2023-06-01",
    passengers: 1,
    totalPrice: 520.75,
    status: "completed",
  },
];

const MyBookings = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState(mockBookings);
  
  // Filter bookings based on search term
  const filteredBookings = bookings.filter(
    (booking) =>
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to get badge color based on status
  const getBadgeVariant = (status: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (status) {
      case "confirmed":
        return "default";
      case "processing":
        return "secondary";
      case "completed":
        return "outline";
      default:
        return "default";
    }
  };

  // Format date to more readable format
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="container-dashboard py-8 space-y-6">
      <div className="page-header">
        <h1 className="page-title">My Bookings</h1>
        <p className="page-subtitle">View and manage your flight bookings</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by booking ID, flight or destination..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter size={16} /> Filter
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Calendar size={16} /> Date
          </Button>
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Your Bookings</CardTitle>
            <CardDescription>
              {filteredBookings.length} bookings found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Flight</TableHead>
                  <TableHead className="hidden sm:table-cell">Route</TableHead>
                  <TableHead>Departure</TableHead>
                  <TableHead className="hidden md:table-cell">Return</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{booking.flightNumber}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex items-center gap-1 text-sm">
                        <span>{booking.origin}</span>
                        <ArrowRight size={12} />
                        <span>{booking.destination}</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(booking.departureDate)}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {formatDate(booking.returnDate)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          <Ticket size={16} />
                          <span className="hidden sm:inline ml-1">View</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card className="flex flex-col items-center justify-center p-10 text-center">
          <Plane className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No Bookings Found</h3>
          <p className="text-muted-foreground mb-4">
            You haven't made any bookings yet or no bookings match your search.
          </p>
          <Button>Book a Flight</Button>
        </Card>
      )}
    </div>
  );
};

export default MyBookings;
