import { render, screen } from "@testing-library/react";
import { useSignin } from "@/src/api/useSignin";
import Page from "@/app/(auth)/signin/page";
import userEvent from "@testing-library/user-event";

jest.mock('@/src/api/useSignin')

jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>
})

const mockUseSignin = useSignin as jest.Mock;

describe('Signin', () => {
  test('Should allow typing email and password', async () => {
    const setEmail = jest.fn();
    const setPassword = jest.fn();

    mockUseSignin.mockReturnValue({
      email: '',
      setEmail,
      password: '',
      setPassword,
      errors: {},
      loading: false,
      handleSubmit: jest.fn((e) => e.preventDefault()),
    })

    render(<Page />)

    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText(/email/i),
      'teste@email.com'
    )

    expect(setEmail).toHaveBeenCalled()
  })
})