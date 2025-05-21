
import { useAuth, UserRole } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Plane,
  LogOut,
  Search,
  Settings,
  Ticket,
  Book,
  Users,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const { user, logout, isAdmin } = useAuth();

  // Navigation items based on user role
  const getNavigationItems = () => {
    const baseItems = [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Flights",
        url: "/flights",
        icon: Plane,
      }
    ];

    // Different labels for admin vs regular user
    const bookingsItem = {
      title: isAdmin ? "Bookings" : "My Bookings",
      url: "/bookings",
      icon: Book,
    };

    const ticketsItem = {
      title: isAdmin ? "Tickets" : "My Tickets",
      url: "/tickets",
      icon: Ticket,
    };

    const adminItems = [
      {
        title: "User Management",
        url: "/users",
        icon: Users,
      },
    ];

    return isAdmin 
      ? [...baseItems, bookingsItem, ticketsItem, ...adminItems] 
      : [...baseItems, bookingsItem, ticketsItem];
  };

  const navigationItems = getNavigationItems();

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center h-14 p-4 border-b">
        <Link to="/dashboard" className="flex items-center gap-2 font-bold text-lg">
          <Plane className="h-5 w-5 text-primary" />
          <span>FLYAIR</span>
        </Link>
        <div className="ml-auto lg:hidden">
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/profile" className="flex items-center gap-3">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/settings" className="flex items-center gap-3">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full text-foreground border-border hover:bg-accent hover:text-accent-foreground"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
