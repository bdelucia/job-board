import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebarClient } from "./_AppSidebarClient"
import { SignedIn } from "@/services/clerk/components/SignInStatus"
import { ReactNode } from "react"
import { Button } from "../ui/button"
import Link from "next/link"

export function AppSidebar({
  content,
  footerButton,
  children,
}: {
  content: ReactNode
  footerButton: ReactNode
  children: ReactNode
}) {
  return (
    <SidebarProvider className="overflow-y-hidden">
      <AppSidebarClient>
        <Sidebar collapsible="icon" className="overflow-hidden">
          <SidebarHeader className="flex-row">
            <SidebarTrigger />
            <Button
              variant="link"
              className="text-xl font-bold text-nowrap border"
              asChild
            >
              <Link href="/">Jobs By Bob</Link>
            </Button>
          </SidebarHeader>
          <SidebarContent>{content}</SidebarContent>
          <SignedIn>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>{footerButton}</SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </SignedIn>
        </Sidebar>
        <main className="flex-1">{children}</main>
      </AppSidebarClient>
    </SidebarProvider>
  )
}
