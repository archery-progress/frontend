import { useDefineBreadcrumb } from '@/commons/components/layouts/default/hooks.ts'
import { LastedCountedShots } from '@/pages/archery/components/ui/charts/lasted-counted-shots.tsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/commons/components/ui/card.tsx'
import { useNumberFormater } from '@/commons/utils'
import AsideCompetitionList from '@/pages/archery/components/ui/aside-competition-list.tsx'
import { Fragment } from 'react'

export default function PageOverview() {
  useDefineBreadcrumb([{label: 'Dashboard', url: '/archery/dashboard'}])
  const format = useNumberFormater()

  const chartData = [
    {month: '10/03/2025', score: 186},
    {month: '12/03/2025', score: 305},
    {month: '14/03/2025', score: 237},
    {month: '15/03/2025', score: 73},
    {month: '18/03/2025', score: 209},
    {month: '20/03/2025', score: 214}
  ]

  return (
    <Fragment>
      <div className="flex flex-col md:flex-row w-full">
        <div className="flex flex-col space-y-4 flex-1">
          <div className="px-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <p className="text-6xl">203</p>
                <CardTitle>Exercices réalisés</CardTitle>
                <CardDescription>Overview of your last counted shots</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <p className="text-6xl">203</p>
                <CardTitle>Exercices réalisés</CardTitle>
                <CardDescription>Overview of your last counted shots</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <p className="text-6xl">{format(1500254)}</p>
                <CardTitle>Flèches tirées</CardTitle>
                <CardDescription>Overview of your last counted shots</CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="pt-5 px-5">
            <h2 className="text-2xl">Statistiques</h2>
          </div>
          <div className="px-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <LastedCountedShots data={chartData}/>
            </div>
            <div className="col-span-1">
              <LastedCountedShots data={chartData}/>
            </div>
          </div>
        </div>

        <div className="max-w-sm w-full px-4">
          <Card>
            <CardHeader>
              <CardTitle>Compétitions</CardTitle>
              <CardDescription>Liste des compétitions toute catégorie confondue</CardDescription>
            </CardHeader>
            <CardContent>
              <AsideCompetitionList data={[
                ...Array.from({length: 10}, (_, i) => (
                  {
                    type: 'A',
                    label: 'Animation tir à l\'arc au féminin',
                    date: {start: '2024-09-01 00:00:00', end: '2024-09-01 00:00:00'},
                    structure: {name: 'ASSO. SPORTIVE TIR À L\'ARC GAZELEC PARIS ST DENIS'}
                  }
                ))
              ]}/>
            </CardContent>
          </Card>
        </div>
      </div>
    </Fragment>
  )
}
