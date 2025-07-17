"use client"

import { useState } from "react"
import { Sidebar } from "@/components/chat-sidebar"
import { ChatInterface } from "@/components/chat-interface"
import { SettingsScreen } from "@/components/settings-screen"
import { ActionLogsModal } from "@/components/action-logs-modal"
import { AgentsPanelModal } from "@/components/agents-panel-modal"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ChatPlatform() {
  const [currentScreen, setCurrentScreen] = useState<"chat" | "settings">("chat")
  const [actionLogsOpen, setActionLogsOpen] = useState(false)
  const [agentsPanelOpen, setAgentsPanelOpen] = useState(false)
  const [activeAgent, setActiveAgent] = useState<string>("UI Agent")
  const [currentChatId, setCurrentChatId] = useState<string>("new")

  const createNewChat = () => {
    setCurrentChatId("new")
  }

  const navigateToSettings = () => {
    setCurrentScreen("settings")
  }

  const navigateToChat = () => {
    setCurrentScreen("chat")
  }

  if (currentScreen === "settings") {
    return <SettingsScreen onBackToChat={navigateToChat} />
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      {/* Settings Icon - Top Right */}
      <div className="absolute top-4 right-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={navigateToSettings}
          className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-white"
        >
          <Settings className="h-5 w-5 text-slate-600" />
        </Button>
      </div>

      <div className="flex h-full">
        {/* Left Sidebar */}
        <Sidebar
          onActionLogsClick={() => setActionLogsOpen(true)}
          onAgentsPanelClick={() => setAgentsPanelOpen(true)}
          currentChatId={currentChatId}
          onChatSelect={setCurrentChatId}
          onNewChat={createNewChat}
        />

        {/* Main Chat Interface */}
        <ChatInterface activeAgent={activeAgent} chatId={currentChatId} onAgentChange={setActiveAgent} />
      </div>

      {/* Modals */}
      <ActionLogsModal open={actionLogsOpen} onOpenChange={setActionLogsOpen} />
      <AgentsPanelModal open={agentsPanelOpen} onOpenChange={setAgentsPanelOpen} />
    </div>
  )
}
