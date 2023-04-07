import { Button, Text, TextInput } from '@ignite-ui/react'
import { ConfirmForm, FormActions, FormHeader } from './styles'
import { CalendarBlank, Clock } from 'phosphor-react'

export const ConfirmStep = () => {
  const handleConfirmScheduling = () => {}

  return (
    <ConfirmForm as="form" onSubmit={handleConfirmScheduling}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          22 de Setembro de 2022
        </Text>
        <Text>
          <Clock />
          10:00h
        </Text>
      </FormHeader>
      <label>
        <Text size="sm">Nome Completo</Text>
        <TextInput placeholder="Sem nome" />
      </label>
      <label>
        <Text size="sm">Endereço de email</Text>
        <TextInput type="email" placeholder="jhondoe@example.com" />
      </label>
      <label>
        <Text size="sm">Observações</Text>
        <TextInput />
      </label>
      <FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit">Confirmar</Button>
      </FormActions>
    </ConfirmForm>
  )
}
