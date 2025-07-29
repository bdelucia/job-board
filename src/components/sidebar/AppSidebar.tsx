import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebarClient } from "./_AppSidebarClient"
import Link from "next/link"
import { LogInIcon } from "lucide-react"
import { SignedOut } from "@/services/clerk/components/SignInStatus"
import { SidebarUserButton } from "@/features/users/components/SidebarUserButton"
import { ReactNode } from "react"

export function AppSidebar({ content }: { content: ReactNode }) {
  return (
    <SidebarProvider className="overflow-y-hidden">
      <AppSidebarClient>
        <Sidebar collapsible="icon" className="overflow-hidden">
          <SidebarHeader className="flex-row">
            <SidebarTrigger />
            <span className="text-xl text-nowrap">Jobs by Bob</span>
          </SidebarHeader>
          <SidebarContent>{content}</SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarUserButton />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1">hello</main>
      </AppSidebarClient>
    </SidebarProvider>
  )
}
