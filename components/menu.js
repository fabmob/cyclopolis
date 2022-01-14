import Link from 'next/link'

function className(page, link) {
  if (page === link) return 'tab-button active-page'
  else return 'tab-button'
}

const Menu = ({ page }) => {
  return (
    <div className="menu">
      <button className={className(page, 'territoires')}>
        <Link href="/">Territoires</Link>
      </button>
      <button className={className(page, 'indicateurs')}>
        <Link href="/indicateurs/vitesse">Indicateurs</Link>
      </button>
      <button className={className(page, 'a-propos')}>
        <Link href="/a-propos">À propos</Link>
      </button>
    </div>
  )
}

export default Menu
