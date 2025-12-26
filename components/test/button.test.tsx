import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { Button } from '../button';

describe('Button', () => {
  test('Should call onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<Button onClick={onClick}>Texto qualquer</Button>)

    const button = screen.getByRole('button');

    await user.click(button)

    expect(onClick).toHaveBeenCalledTimes(1);
  })
})