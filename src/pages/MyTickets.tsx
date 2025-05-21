
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Download, Plane, Clock, Calendar, User, MapPin, QrCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock ticket data
const mockTickets = [
  {
    id: "T9876",
    bookingId: "B1001",
    flightNumber: "SK101",
    passengerName: "John Doe",
    seatNumber: "14A",
    gate: "C12",
    boardingTime: "10:15",
    departureTime: "11:00",
    departureDate: "2023-06-15",
    origin: "New York (JFK)",
    destination: "London (LHR)",
    status: "upcoming",
    terminal: "T4",
  },
  {
    id: "T9875",
    bookingId: "B1003",
    flightNumber: "SK310",
    passengerName: "John Doe",
    seatNumber: "22C",
    gate: "A04",
    boardingTime: "13:30",
    departureTime: "14:15",
    departureDate: "2023-08-05",
    origin: "Paris (CDG)",
    destination: "Rome (FCO)",
    status: "upcoming",
    terminal: "T2",
  },
  {
    id: "T9874",
    bookingId: "B1003",
    flightNumber: "SK311",
    passengerName: "John Doe",
    seatNumber: "18B",
    gate: "B07",
    boardingTime: "10:45",
    departureTime: "11:30",
    departureDate: "2023-08-12",
    origin: "Rome (FCO)",
    destination: "Paris (CDG)",
    status: "upcoming",
    terminal: "T1",
  },
  {
    id: "T9873",
    bookingId: "B1004",
    flightNumber: "SK422",
    passengerName: "John Doe",
    seatNumber: "5D",
    gate: "D15",
    boardingTime: "18:20",
    departureTime: "19:05",
    departureDate: "2023-06-01",
    origin: "London (LHR)",
    destination: "New York (JFK)",
    status: "past",
    terminal: "T3",
  },
];

const MyTickets = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("upcoming");
  const [tickets, setTickets] = useState(mockTickets);
  
  // Filter tickets based on search term and active tab
  const filteredTickets = tickets.filter(
    (ticket) => 
      (ticket.status === activeTab) &&
      (ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
       ticket.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
       ticket.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
       ticket.destination.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Format date to more readable format
  const formatDate = (dateStr: string) => {
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
        <h1 className="page-title">My Tickets</h1>
        <p className="page-subtitle">Access and download your flight tickets</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by ticket ID, flight or destination..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Flights</TabsTrigger>
          <TabsTrigger value="past">Past Flights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-4">
          {filteredTickets.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredTickets.map((ticket) => (
                <Card key={ticket.id} className="overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-lg">{ticket.flightNumber}</h3>
                        <p className="text-sm opacity-90">{ticket.id}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="bg-white/20">
                          {ticket.status === "upcoming" ? "Upcoming" : "Past"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-center">
                        <p className="text-muted-foreground text-xs">From</p>
                        <p className="font-bold">{ticket.origin.split(" ")[0]}</p>
                        <p className="text-sm text-muted-foreground">{ticket.origin.match(/\(([^)]+)\)/)?.[1]}</p>
                      </div>
                      
                      <div className="flex-1 mx-2 flex items-center justify-center">
                        <div className="w-full h-[1px] bg-muted relative">
                          <Plane className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-muted-foreground text-xs">To</p>
                        <p className="font-bold">{ticket.destination.split(" ")[0]}</p>
                        <p className="text-sm text-muted-foreground">{ticket.destination.match(/\(([^)]+)\)/)?.[1]}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Date</p>
                          <p className="font-medium">{formatDate(ticket.departureDate)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Time</p>
                          <p className="font-medium">{ticket.departureTime}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Gate</p>
                          <p className="font-medium">{ticket.gate}, Terminal {ticket.terminal}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Seat</p>
                          <p className="font-medium">{ticket.seatNumber}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between items-center border-t p-4 bg-muted/20">
                    <div className="text-sm">
                      <p className="text-xs text-muted-foreground">Boarding</p>
                      <p className="font-medium">{ticket.boardingTime}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <QrCode size={16} className="mr-1" /> View
                      </Button>
                      <Button size="sm">
                        <Download size={16} className="mr-1" /> Download
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="flex flex-col items-center justify-center p-10 text-center">
              <Plane className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No Upcoming Tickets</h3>
              <p className="text-muted-foreground mb-4">
                You don't have any upcoming flights or no tickets match your search.
              </p>
              <Button>Book a Flight</Button>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="mt-4">
          {/* Similar structure as above but for past tickets */}
          {tickets.filter(t => t.status === "past").length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {tickets
                .filter(t => t.status === "past")
                .map((ticket) => (
                  <Card key={ticket.id} className="overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                    <div className="bg-gradient-to-r from-gray-500 to-gray-600 p-4 text-white">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-lg">{ticket.flightNumber}</h3>
                          <p className="text-sm opacity-90">{ticket.id}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="bg-white/10 border-white/20">
                            Completed
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="text-center">
                          <p className="text-muted-foreground text-xs">From</p>
                          <p className="font-bold">{ticket.origin.split(" ")[0]}</p>
                          <p className="text-sm text-muted-foreground">{ticket.origin.match(/\(([^)]+)\)/)?.[1]}</p>
                        </div>
                        
                        <div className="flex-1 mx-2 flex items-center justify-center">
                          <div className="w-full h-[1px] bg-muted relative">
                            <Plane className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-muted-foreground text-xs">To</p>
                          <p className="font-bold">{ticket.destination.split(" ")[0]}</p>
                          <p className="text-sm text-muted-foreground">{ticket.destination.match(/\(([^)]+)\)/)?.[1]}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                        <div className="flex items-start gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground">Date</p>
                            <p className="font-medium">{formatDate(ticket.departureDate)}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground">Time</p>
                            <p className="font-medium">{ticket.departureTime}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground">Gate</p>
                            <p className="font-medium">{ticket.gate}, Terminal {ticket.terminal}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground">Seat</p>
                            <p className="font-medium">{ticket.seatNumber}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between items-center border-t p-4 bg-muted/20">
                      <div className="text-sm">
                        <p className="font-medium text-muted-foreground">Flight Completed</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download size={16} className="mr-1" /> Download Receipt
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          ) : (
            <Card className="flex flex-col items-center justify-center p-10 text-center">
              <Plane className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No Past Tickets</h3>
              <p className="text-muted-foreground mb-4">
                You don't have any past flights or no tickets match your search.
              </p>
              <Button>Book a Flight</Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyTickets;
