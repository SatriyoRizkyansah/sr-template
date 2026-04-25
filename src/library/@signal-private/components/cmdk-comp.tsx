import { Box, IconButton, Tooltip, Typography, useTheme } from '@mui/material'
import { Command, CommandDialog } from 'cmdk'
import { getAuthorizedMenuItems, RouteConfig } from 'src/routes/routes'
import React from 'react'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { cmdk_init } from '@Signal/use-signal/cmdk-init'
import { getCurrentUserRole } from 'src/common/rbac-utils'
import { useSignal } from '@Signal/hooks'

export default function CommandMenu() {
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0)
  const [search, setSearch] = useSignal('')

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        cmdk_init.value = !cmdk_init.value
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  React.useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate()
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const handleOpenChange = (open: boolean) => {
    console.log('CMDK handleOpenChange:', open)
    cmdk_init.value = open
    if (!open) {
      setSearch('')
    }
  }

  const flattenMenuItems = (
    items: RouteConfig[]
  ): Array<{
    label: string
    path: string
    icon: React.ReactNode
    category: string
  }> => {
    const flattened: Array<{
      label: string
      path: string
      icon: React.ReactNode
      category: string
    }> = []

    items.forEach((item) => {
      // Only show items that have menu.show = true
      if (item.menu?.show && item.path && !item.children) {
        // Item with direct path (no children)
        const Icon = item.menu?.icon
        flattened.push({
          label: item.title,
          path: item.path,
          icon: Icon ? <Icon size={16} /> : null,
          category: item.category || 'Lainnya',
        })
      }

      if (item.children) {
        // Item with children - include authorized children only
        item.children.forEach((child) => {
          if (child.path && child.menu?.show) {
            const ChildIcon = child.menu?.icon
            flattened.push({
              label: child.title,
              path: child.path,
              icon: ChildIcon ? <ChildIcon size={16} /> : null,
              category: child.category || item.category || item.title,
            })
          }
        })
      }
    })

    return flattened
  }

  // Watch for auth changes to rerender with updated permissions
  const currentRole = getCurrentUserRole()

  // Get all menu items from routes with RBAC filtering
  const mainMenuItems = getAuthorizedMenuItems('main', currentRole)
  const bottomMenuItems = getAuthorizedMenuItems('bottom', currentRole)
  const allMenuItems = [...mainMenuItems, ...bottomMenuItems]

  const flatMenu = flattenMenuItems(allMenuItems)

  const groupedMenu = Object.entries(
    flatMenu.reduce(
      (acc, item) => {
        const category = item.category
        if (!acc[category]) {
          acc[category] = []
        }
        acc[category].push(item)
        return acc
      },
      {} as Record<string, typeof flatMenu>
    )
  ).filter(([_, items]) => items.length > 0)

  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <>
      <style>
        {`
          /* Reset background untuk semua items */
          [cmdk-item] {
            background-color: transparent !important;
            transition: background-color 0.2s ease;
          }
          
          /* Hover state hanya saat di-hover */
          .command-item:hover {
            background-color: ${theme.palette.action.hover} !important;
          }
          [cmdk-item]:hover {
            background-color: ${theme.palette.action.hover} !important;
          }
          
          /* Selected state hanya saat benar-benar selected */
          .command-item[data-selected="true"] {
            background-color: ${theme.palette.action.hover} !important;
          }
          [cmdk-item][data-selected="true"] {
            background-color: ${theme.palette.action.hover} !important;
          }
        `}
      </style>
      {cmdk_init.value && (
        <div
          onClick={() => handleOpenChange(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backdropFilter: 'blur(4px)',
            backgroundColor: 'rgba(0,0,0,0.3)', // opsional biar lebih gelap
            zIndex: 9997,
          }}
        />
      )}
      <CommandDialog
        open={cmdk_init.value}
        onOpenChange={handleOpenChange}
        style={{
          position: 'fixed',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9998,
          width: '90%',
          maxWidth: '900px',
          maxHeight: '500px',
          overflow: 'auto',
          backgroundColor: theme.palette.background.paper,
          // boxShadow: theme.shadows[24],
          padding: '16px',
          borderRadius: '8px',
        }}
      >
        {/* "--cmdk-selected-bg": theme.palette.action.hover, */}
        <DialogTitle style={{ display: 'none' }}>Command Menu</DialogTitle>
        <DialogDescription style={{ display: 'none' }}>Cari menu dengan cepat</DialogDescription>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'transparent',
            width: '100%',
          }}
        >
          <Search size={14} />
          <Command.Input
            placeholder="Ketik nama menu (mis: gedung, ruangan, lokasi)..."
            autoFocus
            value={search}
            onValueChange={setSearch}
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: theme.palette.text.primary,
              fontSize: '14px',
            }}
          />
          <Typography variant="caption">[esc]</Typography>
          <Tooltip title="Tutup" placement="bottom">
            <IconButton onClick={() => handleOpenChange(false)} sx={{ color: theme.palette.text.primary }} size="small">
              <X size={18} />
            </IconButton>
          </Tooltip>
        </Box>
        <Command.List
          className="scrollable"
          style={{
            maxHeight: 360,
            overflowY: 'auto',
            marginTop: 8,
          }}
        >
          <Command.Empty>Menu tidak ditemukan</Command.Empty>

          {groupedMenu.map(([category, items]) => (
            <Command.Group
              key={category}
              heading={category}
              style={{
                width: '100%',
                fontWeight: 'bold',
                padding: '0 0 0 4px',
              }}
            >
              {items.map((item) => (
                <Command.Item
                  key={item.path}
                  onSelect={() => {
                    navigate(item.path)
                    handleOpenChange(false)
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    gap: '8px',
                    marginTop: '6px',
                    padding: '8px 6px',
                    borderRadius: '6px',
                    transition: 'background-color 0.2s',
                    fontSize: '14px',
                    width: '100%',
                  }}
                  className="command-item"
                >
                  <Box
                    sx={{
                      minWidth: '16px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="body2" sx={{ fontSize: '13px', lineHeight: 1.2 }}>
                    {item.label}
                  </Typography>
                </Command.Item>
              ))}
            </Command.Group>
          ))}
        </Command.List>
      </CommandDialog>
    </>
  )
}
