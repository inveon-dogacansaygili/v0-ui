"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle2, XCircle, Zap, Calendar } from "lucide-react"

interface TimingJourneyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const journeyEvents = [
  {
    id: "1",
    type: "automated",
    title: "SEO Audit Completed",
    description: "Analyzed 247 pages and generated optimization recommendations",
    timestamp: "2 hours ago",
    status: "success",
    agent: "SEO Agent",
  },
  {
    id: "2",
    type: "triggered",
    title: "Campaign Performance Alert",
    description: "CTR dropped below 2.5% threshold, optimization suggested",
    timestamp: "4 hours ago",
    status: "warning",
    agent: "Performance Marketing Agent",
  },
  {
    id: "3",
    type: "completed",
    title: "UI Component Library Updated",
    description: "Added 12 new components with accessibility improvements",
    timestamp: "6 hours ago",
    status: "success",
    agent: "UI Agent",
  },
  {
    id: "4",
    type: "automated",
    title: "Product Feed Sync",
    description: "Synchronized 1,247 products with updated pricing and inventory",
    timestamp: "8 hours ago",
    status: "success",
    agent: "Merchandising Agent",
  },
  {
    id: "5",
    type: "failed",
    title: "API Integration Error",
    description: "Failed to connect to analytics API, retrying in 30 minutes",
    timestamp: "10 hours ago",
    status: "error",
    agent: "Campaign Agent",
  },
]

export function TimingJourneyModal({ open, onOpenChange }: TimingJourneyModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-white/95 backdrop-blur-xl border-slate-200/50 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-slate-800">
            <Clock className="w-5 h-5" />
            <span>Action Logs</span>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-96 mt-4">
          <div className="space-y-4">
            {journeyEvents.map((event, index) => (
              <div key={event.id} className="relative">
                {/* Timeline Line */}
                {index < journeyEvents.length - 1 && <div className="absolute left-6 top-12 w-0.5 h-8 bg-slate-200" />}

                <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-slate-50/50 transition-colors">
                  {/* Status Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {event.status === "success" && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                    {event.status === "error" && <XCircle className="w-6 h-6 text-red-500" />}
                    {event.status === "warning" && <Zap className="w-6 h-6 text-orange-500" />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-slate-800">{event.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {event.agent}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{event.description}</p>
                    <div className="flex items-center space-x-2 text-xs text-slate-500">
                      <Calendar className="w-3 h-3" />
                      <span>{event.timestamp}</span>
                      <Badge variant={event.type === "automated" ? "default" : "secondary"} className="text-xs">
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
