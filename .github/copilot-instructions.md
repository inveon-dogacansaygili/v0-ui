# Beril UI - Multi-Agent Chat Platform Instructions

## Architecture Overview

This is a **Next.js 15 + TypeScript** multi-agent chat platform with a unique **singleton session management** architecture. The core pattern revolves around:

- **Chat sessions** managed by `lib/chat-manager.ts` singleton with UUID-based session IDs
- **Agent integration** via `agents/react` library using session-specific naming (`"session-{uuid}"`)
- **Real-time UI updates** through observer pattern between ChatManager and components
- **Shadcn/ui components** with Radix UI primitives and Tailwind CSS

## Key Architectural Patterns

### Session Management Flow
```typescript
// 1. New chat creates UUID session
const sessionId = chatManager.createNewSession()

// 2. useAgent integrates with backend using session name
const agent = useAgent({
  agent: "zero-agent", 
  name: "session-" + sessionId,
  host: "http://localhost:8787"
})

// 3. Session data flows: ChatInterface → ChatManager → Sidebar
```

### Observer Pattern for State Sync
- `ChatManager` notifies listeners when sessions change via `notifyListeners()`
- `Sidebar` subscribes with `chatManager.addListener()` for real-time updates
- **Critical**: Prevents polling/intervals that cause excessive re-renders

### Agent Type System
Agents are mapped through `agentMapping` object in `chat-interface.tsx`:
```typescript
const agentMapping = {
  "ui-agent": "UI Agent",
  "seo-agent": "SEO Agent", 
  // ... 5 total agent types with specific color coding
}
```

## Component Communication Patterns

### Main Data Flow
1. `app/page.tsx` - Root state container (currentChatId, activeAgent)
2. `ChatInterface` - Session creation/management, agent integration  
3. `Sidebar` - Session display grouped by agent, search functionality
4. `ChatManager` - Singleton state store with observer notifications

### Critical Props Patterns
- **Session ID callback**: `onChatIdChange` propagates new session IDs up to parent
- **Agent selection**: `onAgentChange` updates active agent across components
- **Chat selection**: `onChatSelect` switches between existing sessions

## Development Conventions

### File Organization
- `components/` - React components (chat-interface, chat-sidebar, chat-empty-state)
- `components/ui/` - Shadcn/ui component library (button, input, card, etc.)
- `lib/` - Utilities (chat-manager.ts, utils.ts with cn() helper)
- `app/` - Next.js app router (page.tsx, layout.tsx, globals.css)

### Styling Approach
- **Tailwind classes** with design system via CSS variables in `globals.css`
- **Glass morphism**: `bg-white/70 backdrop-blur-xl` pattern throughout
- **Component variants**: Use `cn()` utility for conditional classes
- **Color coding**: Agent types have specific `bg-{color}-500` assignments

### State Management Rules
- **Session state**: Always flows through ChatManager singleton
- **Message updates**: Use `updateSessionMessages()` to sync with backend
- **Session naming**: Auto-generated from first user message (50 char limit)
- **Debug logging**: All ChatManager methods have console.log instrumentation

## Integration Points

### External Dependencies
- **agents library**: Core agent framework (`useAgent`, `useAgentChat`)
- **Radix UI**: Primitive components (Dialog, Collapsible, ScrollArea)
- **Lucide React**: Icon system throughout UI
- **Next.js 15**: App router, server components, font optimization

### Backend Integration
- Agent host runs on `http://localhost:8787`
- Sessions persist in backend via `agents` library session naming
- Message history restored automatically by agent framework

## Common Debugging Patterns

### Session Issues
- Check browser console for ChatManager debug logs
- Verify `currentSessionId` state in ChatInterface
- Ensure `onChatIdChange` callback propagates to parent

### Re-render Problems  
- **Never** use `setInterval` for state updates
- Use ChatManager listener pattern instead of polling
- Check useEffect dependencies to prevent unnecessary session creation

### Agent Communication
- Verify `useAgent` name matches `"session-{uuid}"` pattern
- Check agent framework backend connectivity on port 8787
- Message format conversion in `formatAgentMessagesForUI()`

## Development Workflow

```bash
# Start development
npm run dev

# Build production
npm run build

# Lint codebase  
npm run lint
```

**Note**: No testing framework configured yet - manual testing via browser console logs.
