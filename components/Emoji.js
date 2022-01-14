import { Openmoji } from '@svgmoji/openmoji'
import data from 'svgmoji/emoji.json'
import Image from 'next/image'

const openmoji = new Openmoji({ data, type: 'all' })

const Emoji = ({ e, color = false, sizeRem = 2 }) =>
  e == undefined || e == '' ? null : (
    <Image
      width={18 * sizeRem}
      height={18 * sizeRem}
      className={!color ? 'default-emoji emoji-image' : 'emoji-image'}
      src={`https://openmoji.org/data/${color ? 'color' : 'black'}/svg/${
        openmoji.find(e).hexcode
      }.svg`}
      alt={e}
    />
  )

export default Emoji
