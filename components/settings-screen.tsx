"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Shield, CreditCard, Crown, User, Bell, Moon, Key, Database, Zap, CheckCircle2 } from "lucide-react"

interface SettingsScreenProps {
  onBackToChat: () => void
}

export function SettingsScreen({ onBackToChat }: SettingsScreenProps) {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-slate-200/50 p-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBackToChat}
              className="h-10 w-10 rounded-full hover:bg-slate-100/50"
            >
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Settings</h1>
              <p className="text-sm text-slate-500">Manage your account and preferences</p>
            </div>
          </div>
          <Button
            onClick={onBackToChat}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl px-6"
          >
            Back to Chat
          </Button>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Admin Panel */}
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-slate-800">Admin Panel</CardTitle>
                  <CardDescription>Manage users, permissions, and system settings</CardDescription>
                </div>
                <Badge variant="destructive" className="ml-auto">
                  Admin Only
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
                  <div className="text-left">
                    <p className="font-medium">User Management</p>
                    <p className="text-sm text-slate-500">Add, remove, and manage users</p>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
                  <div className="text-left">
                    <p className="font-medium">System Logs</p>
                    <p className="text-sm text-slate-500">View system activity and errors</p>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
                  <div className="text-left">
                    <p className="font-medium">Agent Configuration</p>
                    <p className="text-sm text-slate-500">Configure AI agent settings</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Billing Management */}
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CreditCard className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-slate-800">Billing Management</CardTitle>
                  <CardDescription>View invoices, payment methods, and usage</CardDescription>
                </div>
                <Badge variant="secondary" className="ml-auto bg-green-50 text-green-700">
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-slate-700">Current Plan</h4>
                  <div className="p-4 bg-slate-50/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Pro Plan</span>
                      <Badge>$49/month</Badge>
                    </div>
                    <p className="text-sm text-slate-500">10,000 AI requests per month</p>
                    <div className="mt-2 bg-slate-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">7,500 / 10,000 requests used</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-slate-700">Payment Method</h4>
                  <div className="p-4 bg-slate-50/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-slate-500" />
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-slate-500">Expires 12/25</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline">View Invoices</Button>
                <Button variant="outline">Update Payment</Button>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Settings */}
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Crown className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-slate-800">Subscription Settings</CardTitle>
                  <CardDescription>Upgrade plan, manage features, and limits</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-slate-200 rounded-lg">
                  <h4 className="font-medium mb-2">Starter</h4>
                  <p className="text-2xl font-bold mb-2">
                    $19<span className="text-sm font-normal">/month</span>
                  </p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                      1,000 requests
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                      Basic agents
                    </li>
                  </ul>
                </div>
                <div className="p-4 border-2 border-blue-200 bg-blue-50/30 rounded-lg relative">
                  <Badge className="absolute -top-2 left-4 bg-blue-600">Current</Badge>
                  <h4 className="font-medium mb-2">Pro</h4>
                  <p className="text-2xl font-bold mb-2">
                    $49<span className="text-sm font-normal">/month</span>
                  </p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                      10,000 requests
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                      All agents
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                      Priority support
                    </li>
                  </ul>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg">
                  <h4 className="font-medium mb-2">Enterprise</h4>
                  <p className="text-2xl font-bold mb-2">
                    $199<span className="text-sm font-normal">/month</span>
                  </p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                      Unlimited requests
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                      Custom agents
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                      Dedicated support
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Preferences */}
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-slate-800">Account Preferences</CardTitle>
                  <CardDescription>Profile, notifications, and privacy settings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Settings */}
              <div className="space-y-4">
                <h4 className="font-medium text-slate-700 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Profile Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john@example.com" />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Notification Settings */}
              <div className="space-y-4">
                <h4 className="font-medium text-slate-700 flex items-center">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-slate-500">Receive updates via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Agent Completion Alerts</p>
                      <p className="text-sm text-slate-500">Get notified when agents complete tasks</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weekly Usage Reports</p>
                      <p className="text-sm text-slate-500">Receive weekly usage summaries</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Appearance Settings */}
              <div className="space-y-4">
                <h4 className="font-medium text-slate-700 flex items-center">
                  <Moon className="w-4 h-4 mr-2" />
                  Appearance
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-slate-500">Switch to dark theme</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Compact Mode</p>
                      <p className="text-sm text-slate-500">Reduce spacing for more content</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Privacy & Security */}
              <div className="space-y-4">
                <h4 className="font-medium text-slate-700 flex items-center">
                  <Key className="w-4 h-4 mr-2" />
                  Privacy & Security
                </h4>
                <div className="space-y-3">
                  <Button variant="outline" className="justify-start bg-transparent">
                    <Key className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent">
                    <Database className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline" className="justify-start text-red-600 hover:text-red-700 bg-transparent">
                    <Zap className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
