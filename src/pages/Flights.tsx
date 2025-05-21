
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import {
  Calendar,
  Filter,
  Plus,
  Search,
  ArrowUp,
  ArrowDown,
  Plane,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock flights data
const mockFlights = [
  {
    id: "FL-1001",
    flightNumber: "SW-101",
    origin: "New York (JFK)",
    destination: "London (LHR)",
    departureDate: new Date(2025, 5, 15, 9, 0),
    arrivalDate: new Date(2025, 5, 15, 21, 30),
    price: 549.99,
    availableSeats: 42,
    status: "Scheduled",
  },
  {
    id: "FL-1002",
    flightNumber: "SW-202",
    origin: "London (LHR)",
    destination: "Paris (CDG)",
    departureDate: new Date(2025, 5, 16, 10, 15),
    arrivalDate: new Date(2025, 5, 16, 12, 30),
    price: 199.99,
    availableSeats: 28,
    status: "Scheduled",
  },
  {
    id: "FL-1003",
    flightNumber: "SW-305",
    origin: "Paris (CDG)",
    destination: "Rome (FCO)",
    departureDate: new Date(2025, 5, 16, 14, 0),
    arrivalDate: new Date(2025, 5, 16, 16, 15),
    price: 249.99,
    availableSeats: 15,
    status: "Scheduled",
  },
  {
    id: "FL-1004",
    flightNumber: "SW-410",
    origin: "Rome (FCO)",
    destination: "Barcelona (BCN)",
    departureDate: new Date(2025, 5, 17, 7, 30),
    arrivalDate: new Date(2025, 5, 17, 9, 45),
    price: 179.99,
    availableSeats: 32,
    status: "Scheduled",
  },
  {
    id: "FL-1005",
    flightNumber: "SW-520",
    origin: "Barcelona (BCN)",
    destination: "New York (JFK)",
    departureDate: new Date(2025, 5, 18, 12, 0),
    arrivalDate: new Date(2025, 5, 18, 22, 30),
    price: 599.99,
    availableSeats: 5,
    status: "Scheduled",
  },
  {
    id: "FL-1006",
    flightNumber: "SW-630",
    origin: "New York (JFK)",
    destination: "Miami (MIA)",
    departureDate: new Date(2025, 5, 19, 8, 0),
    arrivalDate: new Date(2025, 5, 19, 11, 15),
    price: 299.99,
    availableSeats: 0,
    status: "Sold Out",
  },
];

const Flights = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === UserRole.ADMIN;
  
  // Filtering and sorting states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 5;

  // Filter and sort flights
  let filteredFlights = [...mockFlights];
  
  // Apply search term filter
  if (searchTerm) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    filteredFlights = filteredFlights.filter(
      (flight) =>
        flight.flightNumber.toLowerCase().includes(lowerSearchTerm) ||
        flight.origin.toLowerCase().includes(lowerSearchTerm) ||
        flight.destination.toLowerCase().includes(lowerSearchTerm)
    );
  }
  
  // Apply status filter
  if (statusFilter !== "all") {
    filteredFlights = filteredFlights.filter(
      (flight) => flight.status === statusFilter
    );
  }
  
  // Apply sorting
  if (sortField) {
    filteredFlights.sort((a, b) => {
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];
      
      if (aValue === bValue) return 0;
      
      const comparison = aValue < bValue ? -1 : 1;
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }
  
  // Calculate pagination values
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = filteredFlights.slice(indexOfFirstFlight, indexOfLastFlight);
  const totalPages = Math.ceil(filteredFlights.length / flightsPerPage);
  
  // Handle sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="container-dashboard">
      <div className="page-header">
        <h1 className="page-title">{isAdmin ? "Flight Management" : "Browse Flights"}</h1>
        <p className="page-subtitle">
          {isAdmin
            ? "Create, view, update, and delete flight information"
            : "Find and book your next journey"}
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search Flights</CardTitle>
          <CardDescription>Filter and find the flights you need</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div>
              <Input
                placeholder="Search flight number, origin, or destination"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-2"
              />
            </div>
            <div>
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Delayed">Delayed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                  <SelectItem value="Sold Out">Sold Out</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}>
                Clear Filters
              </Button>
              <Button>
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
            {isAdmin && (
              <div className="flex justify-end">
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add New Flight
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Flight List</CardTitle>
          <CardDescription>
            Showing {currentFlights.length} of {filteredFlights.length} flights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer" 
                    onClick={() => handleSort("flightNumber")}
                  >
                    <div className="flex items-center">
                      Flight #
                      {sortField === "flightNumber" && (
                        sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer" 
                    onClick={() => handleSort("origin")}
                  >
                    <div className="flex items-center">
                      Origin
                      {sortField === "origin" && (
                        sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer" 
                    onClick={() => handleSort("destination")}
                  >
                    <div className="flex items-center">
                      Destination
                      {sortField === "destination" && (
                        sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer" 
                    onClick={() => handleSort("departureDate")}
                  >
                    <div className="flex items-center">
                      Departure
                      {sortField === "departureDate" && (
                        sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer" 
                    onClick={() => handleSort("price")}
                  >
                    <div className="flex items-center">
                      Price
                      {sortField === "price" && (
                        sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer" 
                    onClick={() => handleSort("availableSeats")}
                  >
                    <div className="flex items-center">
                      Seats
                      {sortField === "availableSeats" && (
                        sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer" 
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center">
                      Status
                      {sortField === "status" && (
                        sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentFlights.length > 0 ? (
                  currentFlights.map((flight) => (
                    <TableRow key={flight.id}>
                      <TableCell className="font-medium">{flight.flightNumber}</TableCell>
                      <TableCell>{flight.origin}</TableCell>
                      <TableCell>{flight.destination}</TableCell>
                      <TableCell>{formatDate(flight.departureDate)}</TableCell>
                      <TableCell>${flight.price.toFixed(2)}</TableCell>
                      <TableCell>{flight.availableSeats}</TableCell>
                      <TableCell>
                        <span 
                          className={`badge ${
                            flight.status === "Scheduled" ? "badge-success" :
                            flight.status === "Delayed" ? "badge-warning" :
                            flight.status === "Sold Out" ? "badge-info" :
                            "badge-danger"
                          }`}
                        >
                          {flight.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {isAdmin ? (
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="destructive" size="sm">Delete</Button>
                          </div>
                        ) : (
                          <Button 
                            variant="default" 
                            size="sm"
                            disabled={flight.availableSeats === 0}
                          >
                            Book
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Plane className="h-12 w-12 mb-2 opacity-20" />
                        <p>No flights found matching your criteria</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={currentPage === page}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Flights;
