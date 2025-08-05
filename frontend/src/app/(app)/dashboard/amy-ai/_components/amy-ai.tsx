"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bot,
  Send,
  Sparkles,
  Lightbulb,
  Calendar,
  CheckCircle,
  TrendingUp,
  MessageSquare,
  Zap,
} from "lucide-react";

interface Message {
  id: number;
  type: "user" | "assistant";
  content: string;
  timestamp: string;
}

export function AmyUi() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "assistant",
      content:
        "Hello! I'm your AI assistant. I can help you manage your tasks, provide productivity insights, and suggest improvements to your workflow. How can I assist you today?",
      timestamp: "10:00 AM",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const suggestions = [
    {
      title: "Analyze my productivity",
      description: "Get insights about your task completion patterns",
      icon: TrendingUp,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/20",
    },
    {
      title: "Suggest task priorities",
      description: "Help me prioritize my current tasks",
      icon: Lightbulb,
      color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20",
    },
    {
      title: "Schedule optimization",
      description: "Optimize my daily schedule for better efficiency",
      icon: Calendar,
      color: "bg-green-100 text-green-600 dark:bg-green-900/20",
    },
    {
      title: "Task automation ideas",
      description: "Find tasks that can be automated",
      icon: Zap,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/20",
    },
  ];

  const quickActions = [
    "Create a task for tomorrow",
    "Show my overdue tasks",
    "What should I focus on today?",
    "Generate a weekly report",
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        type: "assistant",
        content: getAIResponse(inputMessage),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("productivity") ||
      lowerMessage.includes("analyze")
    ) {
      return "Based on your recent activity, you've completed 75% of your tasks this week! Your most productive hours are between 9-11 AM. I recommend scheduling your high-priority tasks during this time window.";
    } else if (
      lowerMessage.includes("priority") ||
      lowerMessage.includes("prioritize")
    ) {
      return "Here are my suggestions for task prioritization: 1) Focus on the overdue 'Database optimization' task first - it's blocking other work. 2) Complete 'Client meeting preparation' next as it has a tight deadline. 3) The documentation update can wait until later this week.";
    } else if (
      lowerMessage.includes("schedule") ||
      lowerMessage.includes("optimize")
    ) {
      return "I've analyzed your schedule and found some optimization opportunities: Consider batching similar tasks together, like doing all your code reviews in one session. Also, you have a 2-hour gap on Wednesday that would be perfect for deep work.";
    } else if (lowerMessage.includes("automation")) {
      return "I've identified several tasks that could be automated: 1) Daily standup reminders, 2) Automatic task status updates based on git commits, 3) Weekly progress reports. Would you like me to help set up any of these automations?";
    } else {
      return "I understand you're looking for help with your tasks. I can assist with task management, productivity analysis, scheduling optimization, and workflow improvements. What specific area would you like to focus on?";
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">AI Assistant</h1>
      </header>

      <div className="flex-1 flex flex-col p-6 max-h-screen">
        {/* Header */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                AI Assistant
              </h2>
              <p className="text-muted-foreground">
                Your intelligent productivity companion
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
          {/* Chat Area */}
          <div className="lg:col-span-2 flex flex-col">
            <Card className="flex-1 flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Chat
                </CardTitle>
                <CardDescription>
                  Ask me anything about your tasks and productivity
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col min-h-0">
                {/* Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto mb-4 pr-2">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.type === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.type === "assistant" && (
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <div
                        className={`max-w-[80%] ${
                          message.type === "user" ? "order-1" : ""
                        }`}
                      >
                        <div
                          className={`p-3 rounded-lg ${
                            message.type === "user"
                              ? "bg-primary text-primary-foreground ml-auto"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 px-1">
                          {message.timestamp}
                        </p>
                      </div>

                      {message.type === "user" && (
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask me anything about your tasks..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Common requests to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto p-3 bg-transparent"
                    onClick={() => handleSuggestionClick(action)}
                  >
                    <span className="text-sm">{action}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* AI Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  AI Suggestions
                </CardTitle>
                <CardDescription>
                  Intelligent recommendations for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleSuggestionClick(suggestion.title)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${suggestion.color}`}>
                        <suggestion.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">
                          {suggestion.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {suggestion.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  AI Insights
                </CardTitle>
                <CardDescription>
                  Performance analytics and trends
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Productivity Score</span>
                    <Badge variant="secondary">85%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tasks This Week</span>
                    <Badge variant="outline">12 completed</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Response Time</span>
                    <Badge variant="outline">2.3 days</Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Recent Insights</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-muted-foreground">
                        You're 20% more productive on Tuesdays
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-3 w-3 text-yellow-600" />
                      <span className="text-xs text-muted-foreground">
                        Consider batching similar tasks together
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
