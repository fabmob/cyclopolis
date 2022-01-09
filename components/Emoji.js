import { Openmoji } from '@svgmoji/openmoji'
import data from 'svgmoji/emoji.json'
import Image from 'next/image'

const openmoji = new Openmoji({ data, type: 'all' })

const Emoji = ({ e, color = false, sizeRem = 2 }) =>
  e == undefined || e == '' ? null : (
    <Image
      css={`
        width: ${sizeRem}rem !important;
        height: ${sizeRem}rem !important;
        vertical-align: middle !important;
        display: inline-block;
        ${!color
          ? 'filter: invert(13%) sepia(47%) saturate(6805%) hue-rotate(346deg) brightness(92%) contrast(106%);'
          : ''}
      `}
      src={`https://openmoji.org/data/${color ? 'color' : 'black'}/svg/${
        openmoji.find(e).hexcode
      }.svg`}
      alt={e}
    />
  )

  export default Emoji;
