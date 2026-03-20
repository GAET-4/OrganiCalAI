import { createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router'
import { Layout } from '@/ui/components/Layout'
import { PrivateRoute } from '@/ui/components/PrivateRoute'
import { LoginPage } from '@/ui/pages/LoginPage'
import { DesignSystemPage } from '@/ui/pages/design-system/DesignSystemPage'
import { HomePage } from '@/ui/pages/HomePage'
import { ContactsPage } from '@/ui/pages/ContactsPage'
import { ContactFormPage } from '@/ui/pages/ContactFormPage'
import { ContactDetailPage } from '@/ui/pages/ContactDetailPage'
import { GroupsPage } from '@/ui/pages/GroupsPage'
import { GroupDetailPage } from '@/ui/pages/GroupDetailPage'

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
})

const designSystemRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/design-system',
  component: DesignSystemPage,
})

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'layout',
  component: Layout,
})

const privateRoute = createRoute({
  getParentRoute: () => layoutRoute,
  id: 'private',
  component: PrivateRoute,
})

const indexRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: '/',
  component: HomePage,
})

const contactsRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: '/contacts',
  component: ContactsPage,
})

const contactNewRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: '/contacts/new',
  component: () => <ContactFormPage mode="create" />,
})

const contactDetailRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: '/contacts/$id',
  component: function ContactDetailRoute() {
    const { id } = contactDetailRoute.useParams()
    return <ContactDetailPage contactId={id} />
  },
})

const contactEditRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: '/contacts/$id/edit',
  component: function ContactEditRoute() {
    const { id } = contactEditRoute.useParams()
    return <ContactFormPage mode="edit" contactId={id} />
  },
})

const groupsRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: '/groups',
  component: GroupsPage,
})

const groupDetailRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: '/groups/$id',
  component: function GroupDetailRoute() {
    const { id } = groupDetailRoute.useParams()
    return <GroupDetailPage groupId={id} />
  },
})

const routeTree = rootRoute.addChildren([
  loginRoute,
  designSystemRoute,
  layoutRoute.addChildren([
    privateRoute.addChildren([
      indexRoute,
      contactsRoute,
      contactNewRoute,
      contactDetailRoute,
      contactEditRoute,
      groupsRoute,
      groupDetailRoute,
    ]),
  ]),
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
