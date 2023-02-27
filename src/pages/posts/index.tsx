import Head from 'next/head'

import styles from './styles.module.scss'

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Jr.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a>
            <time>26 de fevereiro de 2023</time>
            <strong>Construindo um Whitelabel com React Native e Expo</strong>
            <p>
              White-labeling é um processo de personalização de uma aplicação de software para se adequar à identidade visual de uma marca. Em outras palavras, é uma forma de "vestir" uma aplicação com a identidade visual de uma empresa, de forma a torná-la mais reconhecível e identificável pelos usuários. No caso de aplicativos móveis, o whitelabeling é um processo comum, já que as empresas desejam que seus aplicativos móveis tenham uma aparência e sensação única, que reflita sua marca e seus valores.
            </p>
          </a>

          <a>
            <time>26 de fevereiro de 2023</time>
            <strong>Construindo um Whitelabel com React Native e Expo</strong>
            <p>
              White-labeling é um processo de personalização de uma aplicação de software para se adequar à identidade visual de uma marca. Em outras palavras, é uma forma de "vestir" uma aplicação com a identidade visual de uma empresa, de forma a torná-la mais reconhecível e identificável pelos usuários. No caso de aplicativos móveis, o whitelabeling é um processo comum, já que as empresas desejam que seus aplicativos móveis tenham uma aparência e sensação única, que reflita sua marca e seus valores.
            </p>
          </a>

          <a>
            <time>26 de fevereiro de 2023</time>
            <strong>Construindo um Whitelabel com React Native e Expo</strong>
            <p>
              White-labeling é um processo de personalização de uma aplicação de software para se adequar à identidade visual de uma marca. Em outras palavras, é uma forma de "vestir" uma aplicação com a identidade visual de uma empresa, de forma a torná-la mais reconhecível e identificável pelos usuários. No caso de aplicativos móveis, o whitelabeling é um processo comum, já que as empresas desejam que seus aplicativos móveis tenham uma aparência e sensação única, que reflita sua marca e seus valores.
            </p>
          </a>
        </div>
      </main>
    </>
  )
}
