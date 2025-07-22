import { Suspense } from "react";

export function SidebarUserButton(){
    return <Suspense>
        <SidebarUserSuspense />
    </Suspense>
}

async function SidebarUserSuspense(){
    const { userID } = await auth()

    return <SidebarUserButtonClient user=({emai})
}