import data from './cyclopolisData.csv'

export const simplifyNames = (name) =>
  name
    .replace('Communauté de communes', 'CC')
    .replace('agglomération', 'agglo')
    .replace("communauté d'agglo", 'CA')
    .replace("Communauté d'agglo", 'CA')

const filtered = data.filter((el) =>
  el['Validé par le Club ?'].toLowerCase().includes('oui')
)

export default filtered
