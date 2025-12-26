import { render, screen } from "@testing-library/react"
import { AsideDashboard } from "../layout/aside"

jest.mock('next/navigation', () => ({
  usePathname: () => '/dashboard'
}))

describe('AsideDashboard', () => {
  test("Should render correctly", () => {
    render(<AsideDashboard />)

    expect(screen.getByText('DevOrganiza')).toBeInTheDocument()
  })
})