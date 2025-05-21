
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Bell, Moon, Languages, Shield, CreditCard, LogOut, Save } from "lucide-react";

const Settings = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [promotionalEmails, setPromotionalEmails] = useState(true);
  const [flightUpdates, setFlightUpdates] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  
  // Display settings
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [language, setLanguage] = useState("english");
  
  // Privacy settings
  const [shareData, setShareData] = useState(false);
  const [cookiePreference, setCookiePreference] = useState("essential");
  const [locationTracking, setLocationTracking] = useState(true);
  
  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // In a real app, this would call an API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Settings Saved",
        description: "Your preference settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: error instanceof Error ? error.message : "An error occurred while saving your settings.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="container-dashboard py-8 space-y-6">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your app settings and preferences</p>
      </div>
      
      <Card>
        <Tabs defaultValue="notifications">
          <CardHeader className="border-b pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Preferences</CardTitle>
              <TabsList>
                <TabsTrigger value="notifications">
                  <Bell className="h-4 w-4 mr-2" /> Notifications
                </TabsTrigger>
                <TabsTrigger value="display">
                  <Moon className="h-4 w-4 mr-2" /> Display
                </TabsTrigger>
                <TabsTrigger value="privacy">
                  <Shield className="h-4 w-4 mr-2" /> Privacy
                </TabsTrigger>
                <TabsTrigger value="payment">
                  <CreditCard className="h-4 w-4 mr-2" /> Payment
                </TabsTrigger>
              </TabsList>
            </div>
            <CardDescription>
              Configure how you want the application to work
            </CardDescription>
          </CardHeader>
          
          <TabsContent value="notifications" className="p-6">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Notification Channels</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                  </div>
                  <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                </div>
              </div>
              
              <Separator />
              
              <h3 className="text-lg font-medium">Notification Types</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Promotional Emails</p>
                    <p className="text-sm text-muted-foreground">Receive promotional offers and discounts</p>
                  </div>
                  <Switch checked={promotionalEmails} onCheckedChange={setPromotionalEmails} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Flight Updates</p>
                    <p className="text-sm text-muted-foreground">Notifications about gate changes, delays, etc.</p>
                  </div>
                  <Switch checked={flightUpdates} onCheckedChange={setFlightUpdates} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Price Alerts</p>
                    <p className="text-sm text-muted-foreground">Get notified when prices drop for your saved routes</p>
                  </div>
                  <Switch checked={priceAlerts} onCheckedChange={setPriceAlerts} />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="display" className="p-6">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Appearance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">Use dark theme throughout the application</p>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">High Contrast</p>
                    <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                  </div>
                  <Switch checked={highContrast} onCheckedChange={setHighContrast} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Large Text</p>
                    <p className="text-sm text-muted-foreground">Increase text size for better readability</p>
                  </div>
                  <Switch checked={largeText} onCheckedChange={setLargeText} />
                </div>
              </div>
              
              <Separator />
              
              <h3 className="text-lg font-medium">Language & Region</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Languages className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Language</p>
                      <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                    </div>
                  </div>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="rounded-md border border-input px-3 py-2 bg-background"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="japanese">Japanese</option>
                  </select>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="privacy" className="p-6">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Data Privacy</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Share Usage Data</p>
                    <p className="text-sm text-muted-foreground">Help improve our services by sharing anonymous usage data</p>
                  </div>
                  <Switch checked={shareData} onCheckedChange={setShareData} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Cookie Preferences</p>
                    <p className="text-sm text-muted-foreground">Control which cookies are used on this site</p>
                  </div>
                  <select
                    value={cookiePreference}
                    onChange={(e) => setCookiePreference(e.target.value)}
                    className="rounded-md border border-input px-3 py-2 bg-background"
                  >
                    <option value="all">Accept All</option>
                    <option value="essential">Essential Only</option>
                    <option value="none">Reject All</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Location Tracking</p>
                    <p className="text-sm text-muted-foreground">Allow location-based features and recommendations</p>
                  </div>
                  <Switch checked={locationTracking} onCheckedChange={setLocationTracking} />
                </div>
              </div>
              
              <Separator />
              
              <h3 className="text-lg font-medium">Account</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Download My Data</p>
                    <p className="text-sm text-muted-foreground">Get a copy of all your personal data</p>
                  </div>
                  <Button variant="outline" size="sm">Request Data</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-destructive">Delete Account</p>
                    <p className="text-sm text-muted-foreground">Permanently remove your account and all data</p>
                  </div>
                  <Button variant="destructive" size="sm">Delete</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="payment" className="p-6">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Payment Methods</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted rounded-md p-2">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                
                <Button variant="outline" className="w-full">
                  + Add Payment Method
                </Button>
              </div>
              
              <Separator />
              
              <h3 className="text-lg font-medium">Billing Address</h3>
              <div className="space-y-2">
                <p>123 Flight Way</p>
                <p>Skytown, CA 90210</p>
                <p>United States</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Update Address
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <CardContent className="flex items-center justify-between p-6 border-t">
            <div className="flex space-x-4">
              <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
            <Button onClick={handleSaveSettings} disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save Settings"}
            </Button>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Settings;
