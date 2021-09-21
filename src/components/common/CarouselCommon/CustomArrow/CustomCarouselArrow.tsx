import classNames from 'classnames'
import React from 'react'
import ArrowLeft from 'src/components/icons/ArrowLeft'
import ArrowRight from 'src/components/icons/ArrowRight'
import './CustomCarouselArrow.module.scss'
import { ArrowProps } from 'react-multi-carousel/lib/types'
interface CustomCarouselArrowProps extends ArrowProps {
  side: 'left' | 'right'
  isDisabled?: Boolean
}

export const CustomCarouselArrow = ({
  side,
  isDisabled,
  onClick,
}: CustomCarouselArrowProps) => {
  const handleClick = () => {
    onClick && onClick()
  }
  return (
    <button
      onClick={handleClick}
      className={classNames('customArrow', {
        [`${side}Arrow`]: side,
        isDisabledArrow: isDisabled,
      })}
    >
      {side === 'left' ? <ArrowLeft /> : <ArrowRight />}
    </button>
  )
}
