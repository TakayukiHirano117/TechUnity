import { Button } from '@/components/ui/button'
import { SampleButtonProps } from '@/types/types'
import React from 'react'

const SampleButton = ({children, className}: SampleButtonProps) => {
  return (
    <Button className={className}>{children}</Button>
  )
}

export default SampleButton