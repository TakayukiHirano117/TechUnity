import { SearchIconProps } from '@/types/types'
import React from 'react'
import { IoSearch } from 'react-icons/io5'



const SearchIcon = ({className}: SearchIconProps) => {
  return (
    <IoSearch className={className} />
  )
}

export default SearchIcon