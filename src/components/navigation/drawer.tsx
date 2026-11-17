import type { ComponentProps } from 'react'
import * as DrawerPrimitive from '@radix-ui/react-dialog'

import { mergeClasses } from '@/lib/utils'

const Drawer = DrawerPrimitive.Root
const DrawerTrigger = DrawerPrimitive.Trigger
const DrawerClose = DrawerPrimitive.Close

const DrawerContent = ({
  className,
  children,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Content>) => (
  <DrawerPrimitive.Portal>
    <DrawerPrimitive.Overlay
      className={mergeClasses(
        'fixed inset-0 z-40 bg-gray-950/30 backdrop-blur-sm',
        'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out',
      )}
    />
    <DrawerPrimitive.Content
      className={mergeClasses(
        'fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-xs flex-col border-l border-line bg-canvas shadow-2xl',
        'data-[state=open]:animate-drawer-in data-[state=closed]:animate-drawer-out',
        className,
      )}
      {...props}
    >
      {/* Radix requires a labelled dialog; the visible header is the logo row. */}
      <DrawerPrimitive.Title className="sr-only">
        Navigation menu
      </DrawerPrimitive.Title>
      <DrawerPrimitive.Description className="sr-only">
        Jump to a section of the page.
      </DrawerPrimitive.Description>
      {children}
    </DrawerPrimitive.Content>
  </DrawerPrimitive.Portal>
)

export { Drawer, DrawerTrigger, DrawerClose, DrawerContent }
