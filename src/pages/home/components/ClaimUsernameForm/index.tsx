import React from 'react'
import { Form } from './styles'
import { Button, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const claimUsernameFormSchema = z.object({
  username: z.string(),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export const ClaimUsernameForm = () => {
  const { handleSubmit, register } = useForm<ClaimUsernameFormData>({
    // resolver:
  })

  const handleClaimUsername = (data: ClaimUsernameFormData) => {
    console.log(data)
  }
  return (
    <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
      <TextInput
        size="sm"
        prefix="ignite.com/"
        placeholder="seu-usuario"
        {...register('username')}
      />
      <Button>
        Reservar <ArrowRight />
      </Button>
    </Form>
  )
}
