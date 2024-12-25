import { Button } from '@/components/ui/button'
import { SampleButtonProps } from '@/types/types'
import React from 'react'

const SampleButton = ({text, className}: SampleButtonProps) => {
  return (
    <Button className={className}>{text}</Button>
  )
}

export default SampleButton