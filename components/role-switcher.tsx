"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown, User, Briefcase, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { getCurrentUser, switchRole, type Role, type User } from "@/lib/local-db"
import { useRouter } from "next/navigation"

const ROLES = [
  { value: "customer" as Role, label: "Customer", icon: User, color: "#00FFFF" },
  { value: "vendor" as Role, label: "Vendor", icon: Briefcase, color: "#7A00FF" },
  { value: "admin" as Role, label: "Admin", icon: Shield, color: "#FF0080" },
]

export function RoleSwitcher() {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    setCurrentUser(getCurrentUser())
  }, [])

  const handleRoleSwitch = (newRole: Role) => {
    switchRole(newRole)
    setCurrentUser(getCurrentUser())
    // Refresh the page to update all role-dependent UI
    router.refresh()
  }

  if (!mounted || !currentUser) {
    return null
  }

  const currentRole = ROLES.find((r) => r.value === currentUser.role) || ROLES[0]
  const CurrentIcon = currentRole.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-[#00FFFF]/50 text-white hover:bg-[#00FFFF]/10 gap-2 min-w-[120px]"
          aria-label="Switch role"
        >
          <CurrentIcon className="w-4 h-4" style={{ color: currentRole.color }} />
          <span className="hidden sm:inline">{currentRole.label}</span>
          <ChevronDown className="w-4 h-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-[#1a1a1a] border-[#2a2a2a]">
        <DropdownMenuLabel className="text-gray-400 text-xs">Switch Role (Demo)</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#2a2a2a]" />
        {ROLES.map((role) => {
          const Icon = role.icon
          const isActive = role.value === currentUser.role
          return (
            <DropdownMenuItem
              key={role.value}
              onClick={() => handleRoleSwitch(role.value)}
              className="flex items-center justify-between cursor-pointer hover:bg-[#2a2a2a] focus:bg-[#2a2a2a]"
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4" style={{ color: role.color }} />
                <span className={isActive ? "font-semibold" : ""}>{role.label}</span>
              </div>
              {isActive && <Check className="w-4 h-4 text-[#00FFFF]" />}
            </DropdownMenuItem>
          )
        })}
        <DropdownMenuSeparator className="bg-[#2a2a2a]" />
        <div className="px-2 py-1.5 text-xs text-gray-500">
          Current: {currentUser.name}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

