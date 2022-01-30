import Link from 'next/link'

function className(page, link) {
  if (page === link) return 'active-page'
  else return ''
}

const Menu = ({ page }) => {
  return (
    <div className="menu">
      <div className={className(page, 'territoires')}>
        <Link href="/">Territoires</Link>
        <div></div>
      </div>
      <div className={className(page, 'indicateurs')}>
        <Link href="/indicateurs/vitesse">Indicateurs</Link>
        <div></div>
      </div>
      <div className={className(page, 'a-propos')}>
        <Link href="/a-propos">À propos</Link>
        <div></div>
      </div>
    </div>
  )
}

export default Menu
