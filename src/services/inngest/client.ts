import { DeletedObjectJSON, UserJSON } from "@clerk/nextjs/server"
import { EventSchemas, Inngest } from "inngest"

type ClerkWebhookData<T> = {
  data: {
    data: T
    raw: string
    headers: Record<string, string>
  }
}

type Events = {
  "clerk/user.created": ClerkWebhookData<UserJSON>
  "clerk/user.updated": ClerkWebhookData<UserJSON>
  "clerk/user.deleted": ClerkWebhookData<DeletedObjectJSON>
}

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "websites-by-bob",
  schemas: new EventSchemas().fromRecord<Events>(),
})
