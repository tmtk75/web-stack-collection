import {} from 'hono'
import '@hono/react-renderer'

declare module 'hono' {
  interface ContextRenderer {
    (content: string | Promise<string>, props?: { title?: string }): Response
  }
}


declare module '@hono/react-renderer' {
  interface Props {
    title?: string
  }
}