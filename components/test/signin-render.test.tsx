import { render, screen } from "@testing-library/react";
import { useSignin } from "@/src/api/useSignin";
import Page from "@/app/(auth)/signin/page";

jest.mock('@/src/api/useSignin')

jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>
})

const mockUseSignin = useSignin as jest.Mock;

describe('Button', () => {
  test('should render signin page texts', () => {
    mockUseSignin.mockReturnValue({
      email: '',
      setEmail: jest.fn(),
      password: '',
      setPassword: jest.fn(),
      errors: {},
      loading: false,
      handleSubmit: jest.fn((e) => e.preventDefault()),
    })

    render(<Page />)

    expect(
      screen.getByText(/faça login/i)
    ).toBeInTheDocument()

    expect(
      screen.getByText(/preencha o formulário abaixo/i)
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /entrar/i })
    ).toBeInTheDocument()
  })
})