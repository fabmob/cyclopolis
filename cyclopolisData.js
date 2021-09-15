import data from './cyclopolisData.csv'

const filtered = data.filter((el) =>
  el['Validé par le Club ?'].toLowerCase().includes('oui')
)

export default filtered
