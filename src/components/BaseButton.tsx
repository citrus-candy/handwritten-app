import { Button } from '@mui/material'

type BaseButtonProps = {
  text: string
  func: () => void
}

function BaseButton(props: BaseButtonProps) {
  const { text, func } = props

  return (
    <Button variant="contained" onClick={func} style={{ width: 'fit-content' }}>
      {text}
    </Button>
  )
}

export default BaseButton
