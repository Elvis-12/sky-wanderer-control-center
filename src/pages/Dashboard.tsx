
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart, LineChart, DonutChart } from "@/components/ui/chart";
import { 
  Plane, 
  Calendar, 
  Users, 
  CreditCard, 
  TrendingUp, 
  TrendingDown
} from "lucide-react";
import { format } from "date-fns";

const Dashboard = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === UserRole.ADMIN;

  // Mock data for charts and stats
  const currentDate = new Date();
  
  const revenueData = [
    { name: "Jan", value: 12000 },
    { name: "Feb", value: 19000 },
    { name: "Mar", value: 15000 },
    { name: "Apr", value: 22000 },
    { name: "May", value: 25000 },
    { name: "Jun", value: 32000 },
    { name: "Jul", value: 35000 },
    { name: "Aug", value: 30000 },
    { name: "Sep", value: 29000 },
    { name: "Oct", value: 34000 },
    { name: "Nov", value: 38000 },
    { name: "Dec", value: 42000 },
  ];

  const occupancyData = [
    { name: "Economy", value: 72 },
    { name: "Business", value: 45 },
    { name: "First Class", value: 23 },
  ];

  const bookingsData = [
    { name: format(new Date(currentDate.getTime() - 6 * 24 * 60 * 60 * 1000), "dd MMM"), value: 45 },
    { name: format(new Date(currentDate.getTime() - 5 * 24 * 60 * 60 * 1000), "dd MMM"), value: 52 },
    { name: format(new Date(currentDate.getTime() - 4 * 24 * 60 * 60 * 1000), "dd MMM"), value: 49 },
    { name: format(new Date(currentDate.getTime() - 3 * 24 * 60 * 60 * 1000), "dd MMM"), value: 63 },
    { name: format(new Date(currentDate.getTime() - 2 * 24 * 60 * 60 * 1000), "dd MMM"), value: 58 },
    { name: format(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000), "dd MMM"), value: 72 },
    { name: format(currentDate, "dd MMM"), value: 67 },
  ];

  // Recent flights data for user
  const userFlights = [
    {
      id: "FL-1234",
      origin: "New York (JFK)",
      destination: "London (LHR)",
      departureDate: new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000),
      status: "Confirmed",
    },
    {
      id: "FL-5678",
      origin: "London (LHR)",
      destination: "Paris (CDG)",
      departureDate: new Date(currentDate.getTime() + 8 * 24 * 60 * 60 * 1000),
      status: "Confirmed",
    },
    {
      id: "FL-9012",
      origin: "Paris (CDG)",
      destination: "New York (JFK)",
      departureDate: new Date(currentDate.getTime() + 15 * 24 * 60 * 60 * 1000),
      status: "Pending",
    },
  ];

  return (
    <div className="container-dashboard">
      <div className="page-header">
        <h1 className="page-title">Welcome, {user?.name}</h1>
        <p className="page-subtitle">
          {isAdmin 
            ? "Here's an overview of your airline's performance and activity"
            : "Here's a summary of your bookings and upcoming flights"
          }
        </p>
      </div>

      {/* Admin Dashboard */}
      {isAdmin && (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="stats-card">
              <CardHeader className="pb-2">
                <CardTitle className="stats-label">Total Flights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="stats-value">386</div>
                <p className="text-sm flex items-center mt-2 text-green-500">
                  <TrendingUp className="mr-1 h-4 w-4" /> 12% more than last month
                </p>
                <Plane className="stats-icon h-12 w-12" />
              </CardContent>
            </Card>

            <Card className="stats-card">
              <CardHeader className="pb-2">
                <CardTitle className="stats-label">Total Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="stats-value">2,583</div>
                <p className="text-sm flex items-center mt-2 text-green-500">
                  <TrendingUp className="mr-1 h-4 w-4" /> 8% more than last month
                </p>
                <Calendar className="stats-icon h-12 w-12" />
              </CardContent>
            </Card>

            <Card className="stats-card">
              <CardHeader className="pb-2">
                <CardTitle className="stats-label">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="stats-value">$348,921</div>
                <p className="text-sm flex items-center mt-2 text-green-500">
                  <TrendingUp className="mr-1 h-4 w-4" /> 15% more than last month
                </p>
                <CreditCard className="stats-icon h-12 w-12" />
              </CardContent>
            </Card>

            <Card className="stats-card">
              <CardHeader className="pb-2">
                <CardTitle className="stats-label">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="stats-value">1,489</div>
                <p className="text-sm flex items-center mt-2 text-red-500">
                  <TrendingDown className="mr-1 h-4 w-4" /> 3% less than last month
                </p>
                <Users className="stats-icon h-12 w-12" />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Annual Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <BarChart data={revenueData} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Flight Occupancy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <DonutChart data={occupancyData} />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <LineChart data={bookingsData} />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" asChild>
              <Link to="/flights">Manage Flights</Link>
            </Button>
            <Button asChild>
              <Link to="/bookings">View All Bookings</Link>
            </Button>
          </div>
        </>
      )}

      {/* User Dashboard */}
      {!isAdmin && (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Your Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="stats-card bg-transparent shadow-none border-0">
                  <div className="stats-value">3</div>
                  <div className="stats-label">Upcoming Flights</div>
                </div>
                <div className="stats-card bg-transparent shadow-none border-0">
                  <div className="stats-value">7,250</div>
                  <div className="stats-label">Miles Earned</div>
                </div>
                <div className="stats-card bg-transparent shadow-none border-0">
                  <div className="stats-value">Silver</div>
                  <div className="stats-label">Member Status</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Upcoming Flights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userFlights.map((flight) => (
                  <div key={flight.id} className="flex items-center p-4 rounded-lg border hover:border-primary transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center mb-1">
                        <span className="font-medium">{flight.origin}</span>
                        <Plane className="mx-2 h-4 w-4" />
                        <span className="font-medium">{flight.destination}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span>{format(flight.departureDate, "EEEE, MMMM d, yyyy 'at' h:mm a")}</span>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col items-end">
                      <span className="text-sm font-medium">{flight.id}</span>
                      <span 
                        className={`badge ${
                          flight.status === "Confirmed" ? "badge-success" : "badge-warning"
                        }`}
                      >
                        {flight.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" asChild>
              <Link to="/flights">Browse Flights</Link>
            </Button>
            <Button asChild>
              <Link to="/bookings">View My Bookings</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
