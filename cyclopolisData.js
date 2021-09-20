import data from './cyclopolisData.csv'

export const simplifyNames = (name) =>
  name
    .replace('Communauté de communes', 'CC')
    .replace('agglomération', 'agglo')
    .replace('Métropole', 'Métro')
    .replace("communauté d'agglo", 'CA')
    .replace("Communauté d'agglo", 'CA')

const filtered = data.filter(
  (el) => !el['Validé par le Club ?'].toLowerCase().includes('rajouter')
)

export default filtered
