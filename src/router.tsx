import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router'
import { Layout } from '@/ui/components/Layout'
import { HomePage } from '@/ui/pages/HomePage'
import { ContactsPage } from '@/ui/pages/ContactsPage'
import { ContactFormPage } from '@/ui/pages/ContactFormPage'
import { ContactDetailPage } from '@/ui/pages/ContactDetailPage'
import { GroupsPage } from '@/ui/pages/GroupsPage'
import { GroupDetailPage } from '@/ui/pages/GroupDetailPage'

const rootRoute = createRootRoute({
  component: Layout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const contactsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contacts',
  component: ContactsPage,
})

const contactNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contacts/new',
  component: () => <ContactFormPage mode="create" />,
})

const contactDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contacts/$id',
  component: function ContactDetailRoute() {
    const { id } = contactDetailRoute.useParams()
    return <ContactDetailPage contactId={id} />
  },
})

const contactEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contacts/$id/edit',
  component: function ContactEditRoute() {
    const { id } = contactEditRoute.useParams()
    return <ContactFormPage mode="edit" contactId={id} />
  },
})

const groupsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/groups',
  component: GroupsPage,
})

const groupDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/groups/$id',
  component: function GroupDetailRoute() {
    const { id } = groupDetailRoute.useParams()
    return <GroupDetailPage groupId={id} />
  },
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  contactsRoute,
  contactNewRoute,
  contactDetailRoute,
  contactEditRoute,
  groupsRoute,
  groupDetailRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
