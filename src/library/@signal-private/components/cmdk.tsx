import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import { IconButton, Typography } from '@mui/material'
import { Command, Search } from 'lucide-react'

interface SearchCmdkProps {
  onOpenCmdk: () => void
}

export default function SearchCmdk({ onOpenCmdk }: SearchCmdkProps) {
  const handleOpen = () => {
    console.log('SearchCmdk clicked - opening CMDK')
    onOpenCmdk()
  }

  return (
    <FormControl sx={{ width: { xs: '100%', md: '35ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Cari"
        readOnly
        onClick={handleOpen}
        onFocus={handleOpen}
        sx={{ cursor: 'pointer' }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <Search size={14} />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end" sx={{ color: 'text.primary', mr: -1.3 }}>
            <IconButton sx={{ fontSize: '15px', width: '100%' }} onClick={handleOpen} aria-label="Buka pencarian dengan Command+K">
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                <Command size={14} />K
              </Typography>
            </IconButton>
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  )
}
