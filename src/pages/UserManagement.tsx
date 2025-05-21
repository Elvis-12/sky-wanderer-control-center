
import { useState } from "react";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, UserPlus, UserCheck, UserX, User as UserIcon, Check, X, Edit, RefreshCw } from "lucide-react";

// Mock user data for demonstration
const mockUsers = [
  {
    id: "1",
    email: "admin@skylines.com",
    name: "Admin User",
    role: UserRole.ADMIN,
    status: "active",
    lastLogin: "2023-05-20T08:30:00Z",
    createdAt: "2023-01-15T10:00:00Z"
  },
  {
    id: "2",
    email: "user@example.com",
    name: "Regular User",
    role: UserRole.USER,
    status: "active",
    lastLogin: "2023-05-19T14:20:00Z",
    createdAt: "2023-02-10T09:15:00Z"
  },
  {
    id: "3",
    email: "jane.doe@example.com",
    name: "Jane Doe",
    role: UserRole.USER,
    status: "inactive",
    lastLogin: "2023-04-01T11:45:00Z",
    createdAt: "2023-03-05T16:30:00Z"
  },
  {
    id: "4",
    email: "john.smith@example.com",
    name: "John Smith",
    role: UserRole.USER,
    status: "active",
    lastLogin: "2023-05-18T09:10:00Z",
    createdAt: "2023-01-20T13:45:00Z"
  },
  {
    id: "5",
    email: "manager@skylines.com",
    name: "Manager User",
    role: UserRole.ADMIN,
    status: "active",
    lastLogin: "2023-05-17T16:20:00Z",
    createdAt: "2023-01-10T08:30:00Z"
  }
];

const UserManagement = () => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = () => {
    // In a real app, this would make an API call to create a user
    const id = (users.length + 1).toString();
    
    const newUserData = {
      id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.isAdmin ? UserRole.ADMIN : UserRole.USER,
      status: "active",
      lastLogin: null,
      createdAt: new Date().toISOString()
    };
    
    setUsers([...users, newUserData]);
    
    toast({
      title: "User created",
      description: `${newUser.name} has been added as a ${newUser.isAdmin ? "admin" : "user"}`,
    });
    
    setNewUser({
      name: "",
      email: "",
      password: "",
      isAdmin: false,
    });
    
    setIsCreateDialogOpen(false);
  };

  const handleToggleUserStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: newStatus } : user
      )
    );
    
    const user = users.find((u) => u.id === id);
    
    toast({
      title: `User ${newStatus === "active" ? "activated" : "deactivated"}`,
      description: `${user.name} has been ${newStatus === "active" ? "activated" : "deactivated"}.`,
    });
  };

  const handleChangeUserRole = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              role: user.role === UserRole.ADMIN ? UserRole.USER : UserRole.ADMIN,
            }
          : user
      )
    );
    
    const user = users.find((u) => u.id === id);
    const newRole = user.role === UserRole.ADMIN ? UserRole.USER : UserRole.ADMIN;
    
    toast({
      title: "Role updated",
      description: `${user.name} is now a ${newRole === UserRole.ADMIN ? "admin" : "regular user"}.`,
    });
  };

  // Format date to more readable format
  const formatDate = (dateStr) => {
    if (!dateStr) return "Never";
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Redirect if not admin
  if (!isAdmin) {
    return (
      <div className="container-dashboard py-8">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You don't have permission to access this page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container-dashboard py-8 space-y-6">
      <div className="page-header">
        <h1 className="page-title">User Management</h1>
        <p className="page-subtitle">Manage system users and their access</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Create User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
                <DialogDescription>
                  Add a new user to the system. Users will receive an email with login instructions.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    id="admin"
                    checked={newUser.isAdmin}
                    onCheckedChange={(checked) => setNewUser({ ...newUser, isAdmin: checked })}
                  />
                  <Label htmlFor="admin">Create as Administrator</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateUser} disabled={!newUser.name || !newUser.email || !newUser.password}>
                  Create User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Users List */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>System Users</CardTitle>
          <CardDescription>
            {filteredUsers.length} users found {searchTerm && `for "${searchTerm}"`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === UserRole.ADMIN ? "default" : "outline"}>
                      {user.role === UserRole.ADMIN ? "Admin" : "User"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "default" : "secondary"}>
                      {user.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {formatDate(user.lastLogin)}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleChangeUserRole(user.id)}
                        title={`Change to ${
                          user.role === UserRole.ADMIN ? "regular user" : "admin"
                        }`}
                      >
                        {user.role === UserRole.ADMIN ? <UserIcon size={16} /> : <UserCheck size={16} />}
                      </Button>
                      <Button
                        size="sm"
                        variant={user.status === "active" ? "outline" : "default"}
                        onClick={() => handleToggleUserStatus(user.id, user.status)}
                        title={user.status === "active" ? "Deactivate" : "Activate"}
                      >
                        {user.status === "active" ? <UserX size={16} /> : <UserCheck size={16} />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
