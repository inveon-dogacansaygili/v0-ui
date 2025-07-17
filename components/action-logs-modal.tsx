"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import {
  FileText,
  CheckCircle2,
  XCircle,
  Zap,
  Calendar,
  ChevronDown,
  ChevronRight,
  Undo2,
  Eye,
  ArrowRight,
  Lightbulb,
} from "lucide-react"

interface ActionLogsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const actionLogs = [
  {
    id: "1",
    type: "automated",
    title: "SEO Audit Completed",
    description: "Analyzed 247 pages and generated optimization recommendations",
    timestamp: "2 hours ago",
    status: "success",
    agent: "SEO Agent",
    canUndo: false,
    steps: [
      "Crawled website structure and identified 247 pages",
      "Analyzed meta titles and descriptions for keyword optimization",
      "Checked page loading speeds and Core Web Vitals",
      "Evaluated internal linking structure and anchor text",
      "Generated comprehensive SEO report with 23 recommendations",
    ],
    nextActions: [
      "Implement high-priority meta tag updates",
      "Optimize images for better loading speed",
      "Create internal linking strategy",
    ],
  },
  {
    id: "2",
    type: "triggered",
    title: "Campaign Performance Alert",
    description: "CTR dropped below 2.5% threshold, optimization suggested",
    timestamp: "4 hours ago",
    status: "warning",
    agent: "Performance Marketing Agent",
    canUndo: true,
    steps: [
      "Monitored campaign performance metrics in real-time",
      "Detected CTR drop from 3.2% to 2.1% over 2-hour period",
      "Analyzed audience engagement patterns and ad placement",
      "Identified underperforming ad creatives and keywords",
      "Triggered automatic alert and paused low-performing ads",
    ],
    nextActions: [
      "Review and update ad creatives",
      "Adjust audience targeting parameters",
      "Increase bid for high-performing keywords",
    ],
  },
  {
    id: "3",
    type: "completed",
    title: "UI Component Library Updated",
    description: "Added 12 new components with accessibility improvements",
    timestamp: "6 hours ago",
    status: "success",
    agent: "UI Agent",
    canUndo: true,
    steps: [
      "Reviewed existing component library for gaps and inconsistencies",
      "Designed 12 new components following design system guidelines",
      "Implemented WCAG 2.1 AA accessibility standards",
      "Added comprehensive documentation and usage examples",
      "Deployed components to staging environment for testing",
    ],
    nextActions: [
      "Update design documentation",
      "Train development team on new components",
      "Plan migration timeline for existing components",
    ],
  },
  {
    id: "4",
    type: "automated",
    title: "Product Feed Sync",
    description: "Synchronized 1,247 products with updated pricing and inventory",
    timestamp: "8 hours ago",
    status: "success",
    agent: "Merchandising Agent",
    canUndo: false,
    steps: [
      "Connected to product management system API",
      "Retrieved updated product data for 1,247 items",
      "Validated pricing and inventory information",
      "Updated product catalog with new information",
      "Refreshed search index and category filters",
    ],
    nextActions: [
      "Review pricing strategy for updated products",
      "Update product descriptions for better SEO",
      "Create promotional campaigns for new inventory",
    ],
  },
  {
    id: "5",
    type: "failed",
    title: "API Integration Error",
    description: "Failed to connect to analytics API, retrying in 30 minutes",
    timestamp: "10 hours ago",
    status: "error",
    agent: "Campaign Agent",
    canUndo: false,
    steps: [
      "Attempted connection to Google Analytics API",
      "Encountered authentication timeout error",
      "Verified API credentials and permissions",
      "Implemented exponential backoff retry strategy",
      "Scheduled automatic retry in 30 minutes",
    ],
    nextActions: [
      "Check API credential expiration",
      "Contact IT team for firewall review",
      "Set up alternative data source as backup",
    ],
  },
]

export function ActionLogsModal({ open, onOpenChange }: ActionLogsModalProps) {
  const [expandedActions, setExpandedActions] = useState<string[]>([])
  const [showNextActions, setShowNextActions] = useState<string[]>([])

  const toggleActionDetails = (actionId: string) => {
    setExpandedActions((prev) => (prev.includes(actionId) ? prev.filter((id) => id !== actionId) : [...prev, actionId]))
  }

  const toggleNextActions = (actionId: string) => {
    setShowNextActions((prev) => (prev.includes(actionId) ? prev.filter((id) => id !== actionId) : [...prev, actionId]))
  }

  const handleUndo = (actionId: string, title: string) => {
    // Simulate undo action
    console.log(`Undoing action: ${title}`)
    // In a real app, this would trigger the undo API call
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl bg-white/95 backdrop-blur-xl border-slate-200/50 shadow-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-slate-800">
            <FileText className="w-5 h-5" />
            <span>Action Logs</span>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-96 mt-4">
          <div className="space-y-4">
            {actionLogs.map((action, index) => (
              <Card key={action.id} className="border-slate-200/50 hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    {/* Timeline Line */}
                    {index < actionLogs.length - 1 && (
                      <div className="absolute left-6 top-16 w-0.5 h-16 bg-slate-200" />
                    )}

                    <div className="p-4">
                      <div className="flex items-start space-x-4">
                        {/* Status Icon */}
                        <div className="flex-shrink-0 mt-1">
                          {action.status === "success" && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                          {action.status === "error" && <XCircle className="w-6 h-6 text-red-500" />}
                          {action.status === "warning" && <Zap className="w-6 h-6 text-orange-500" />}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-slate-800">{action.title}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {action.agent}
                              </Badge>
                              {action.canUndo && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleUndo(action.id, action.title)}
                                  className="h-7 px-2 text-xs text-slate-600 hover:text-slate-900"
                                >
                                  <Undo2 className="w-3 h-3 mr-1" />
                                  Undo
                                </Button>
                              )}
                            </div>
                          </div>

                          <p className="text-sm text-slate-600 mb-3">{action.description}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-xs text-slate-500">
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                <span>{action.timestamp}</span>
                              </div>
                              <Badge
                                variant={action.type === "automated" ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {action.type}
                              </Badge>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleActionDetails(action.id)}
                                className="h-7 px-2 text-xs text-slate-600 hover:text-slate-900"
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                View Details
                                {expandedActions.includes(action.id) ? (
                                  <ChevronDown className="w-3 h-3 ml-1" />
                                ) : (
                                  <ChevronRight className="w-3 h-3 ml-1" />
                                )}
                              </Button>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleNextActions(action.id)}
                                className="h-7 px-2 text-xs text-blue-600 hover:text-blue-700"
                              >
                                <Lightbulb className="w-3 h-3 mr-1" />
                                Next Actions
                                {showNextActions.includes(action.id) ? (
                                  <ChevronDown className="w-3 h-3 ml-1" />
                                ) : (
                                  <ChevronRight className="w-3 h-3 ml-1" />
                                )}
                              </Button>
                            </div>
                          </div>

                          {/* Detailed Steps */}
                          <Collapsible open={expandedActions.includes(action.id)}>
                            <CollapsibleContent className="mt-4">
                              <div className="bg-slate-50/50 rounded-lg p-4 border border-slate-200/50">
                                <h4 className="font-medium text-slate-700 mb-3 flex items-center">
                                  <Eye className="w-4 h-4 mr-2" />
                                  Detailed Steps
                                </h4>
                                <div className="space-y-2">
                                  {action.steps.map((step, stepIndex) => (
                                    <div key={stepIndex} className="flex items-start space-x-3">
                                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                                        <span className="text-xs font-medium text-blue-600">{stepIndex + 1}</span>
                                      </div>
                                      <p className="text-sm text-slate-600 leading-relaxed">{step}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </CollapsibleContent>
                          </Collapsible>

                          {/* Next Best Actions */}
                          <Collapsible open={showNextActions.includes(action.id)}>
                            <CollapsibleContent className="mt-4">
                              <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-200/50">
                                <h4 className="font-medium text-slate-700 mb-3 flex items-center">
                                  <Lightbulb className="w-4 h-4 mr-2 text-blue-600" />
                                  Suggested Next Actions
                                </h4>
                                <div className="space-y-2">
                                  {action.nextActions.map((nextAction, actionIndex) => (
                                    <div
                                      key={actionIndex}
                                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200/30 hover:border-blue-300/50 transition-colors"
                                    >
                                      <div className="flex items-center space-x-3">
                                        <ArrowRight className="w-4 h-4 text-blue-500" />
                                        <span className="text-sm text-slate-700">{nextAction}</span>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 px-3 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-100/50"
                                      >
                                        Execute
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
