import { render, screen } from "@testing-library/react"
import { AboutCard } from "../aboutCard"
import { NotebookPen } from "lucide-react"

describe('AboutCard', () => {
  test('Should render data in about card', () => {
    const mockData = {
      id: 1,
      title: 'Organize',
      description: 'Crie seus estudos e tarefas organizando seus aprendizados',
      icon: NotebookPen
    }

    render(<AboutCard data={mockData} Icon={mockData.icon} />)

    expect(screen.getByRole('aboutTitle'))
    expect(screen.getByText('Organize')).toBeInTheDocument()
    expect(screen
      .getByText('Crie seus estudos e tarefas organizando seus aprendizados')
    ).toBeInTheDocument()
    
  })
})