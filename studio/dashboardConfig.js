export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '60202ead095b32376c9e354f',
                  title: 'Sanity Studio',
                  name: 'roseline-studio',
                  apiId: '49e31041-8532-4f4b-85f1-0bf78c8bb8ef'
                },
                {
                  buildHookId: '60202eadb9896f2aac4c41a0',
                  title: 'Portfolio Website',
                  name: 'roseline-web',
                  apiId: '2eeb2ecc-bf10-43c3-8764-13de700b103f'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/Didier-Idealcom/roseline',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://roseline-web.netlify.app',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['sampleProject']},
      layout: {width: 'medium'}
    }
  ]
}
