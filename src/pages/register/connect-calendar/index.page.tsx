import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { Container, Header } from '../styles'
import { ArrowRight, Check } from 'phosphor-react'
import { useSearchParams, useRouter } from 'next/navigation'
import { AuthError, ConnectBox, ConnectionItem } from './styles'
import { signIn, useSession } from 'next-auth/react'

export default function ConnectCalendar() {
  const session = useSession()
  const searchParams = useSearchParams()
  const router = useRouter()

  const hasAuthError = !!searchParams.get('error')
  const isSignedIn = session.status === 'authenticated'

  const handleConnectCalendar = async () => {
    await signIn('google')
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>
        <MultiStep size={4} currentStep={2} />
      </Header>
      <ConnectBox>
        <ConnectionItem>
          <Text>Google Calendar</Text>
          {isSignedIn ? (
            <Button size="sm" disabled>
              Conectado
              <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendar}
            >
              Conectar <ArrowRight />
            </Button>
          )}
        </ConnectionItem>
        {hasAuthError && (
          <AuthError size="sm">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar
          </AuthError>
        )}
        <Button
          type="submit"
          disabled={!isSignedIn}
          onClick={() => router.push('/register/time-intervals')}
        >
          Próximo passo <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
