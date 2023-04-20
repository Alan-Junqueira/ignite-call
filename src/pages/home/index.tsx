import { Heading, Text } from '@ignite-ui/react'
import { Container, Hero, Preview } from './styles'
import Image from 'next/image'

import previewImage from '../../assets/images/calendar.png'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'
import { NextSeo } from 'next-seo'

export default function Home() {
  return (
    <>
      <NextSeo
        title="Descomplique sua agenda"
        description=" Conecte seu calendário e permita que as pessoas marquem agendamentos
        no seu tempo livre.."
      />
      <Container>
        <Hero>
          <Heading as="h1" size="4xl">
            Agendamento descomplicado
          </Heading>
          <Text size="xl">
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre.
          </Text>
          <ClaimUsernameForm />
        </Hero>
        <Preview>
          <Image
            alt="Calendário simbolizando aplicação em funcoinamento"
            src={previewImage}
            height={400}
            priority
            quality={100}
            draggable={false}
          />
        </Preview>
      </Container>
    </>
  )
}
